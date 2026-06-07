---
title: Troubleshooting Port Forwarding
---

# Troubleshooting Port Forwarding

This guide covers common issues with SSH port forwarding (tunneling) in RockTerm.

## Table of Contents

- [Tunnel Establishment Failures](#tunnel-establishment-failures)
- [Port Conflicts](#port-conflicts)
- [Firewall Issues](#firewall-issues)
- [Connectivity Validation](#connectivity-validation)
- [Dynamic Forwarding Issues](#dynamic-forwarding-issues)
- [Remote Forwarding Issues](#remote-forwarding-issues)
- [Performance Issues](#performance-issues)
- [Related Links](#related-links)

---

## Tunnel Establishment Failures

### Tunnel Not Starting

**Symptoms:**
- Port forwarding configured but service unreachable through tunnel.
- No error message but tunnel not functional.

**Solutions:**

1. **Verify SSH connection is active:**
   - Port forwarding requires an active SSH session.
   - Check the status bar for "● SSH" (green indicator).
   - Reconnect if disconnected.

2. **Check server allows forwarding:**
   - The SSH server must permit TCP forwarding.
   - Server config (`/etc/ssh/sshd_config`):
     ```
     AllowTcpForwarding yes
     ```
   - Restart sshd after changes: `systemctl restart sshd`

3. **Verify tunnel configuration:**
   - Confirm local port, remote host, and remote port are correct.
   - For local forwarding: the remote host must be reachable from the SSH server.
   - For remote forwarding: the local host must be reachable from your machine.

### "Address already in use" Error

The local port is already bound by another process. See [Port Conflicts](#port-conflicts).

### "Permission denied" Error

- On Linux/macOS: Ports below 1024 require root privileges.
- Use a port above 1024 for local forwarding.
- Or run RockTerm with elevated privileges (not recommended).

---

## Port Conflicts

### Identifying Port Conflicts

**Windows:**
```cmd
netstat -ano | findstr :8080
tasklist /FI "PID eq <pid_number>"
```

**From an SSH session (Linux):**
```bash
ss -tlnp | grep :8080
lsof -i :8080
```

### Resolving Conflicts

1. **Choose a different local port:**
   - Change your tunnel to use an unused port (e.g., 8081, 9090, etc.).
   - Update your client application to use the new port.

2. **Stop the conflicting process:**
   - Identify what is using the port.
   - Stop or reconfigure the conflicting service.

3. **Common port conflicts:**
   | Port | Often Used By |
   |------|---------------|
   | 3306 | Local MySQL server |
   | 5432 | Local PostgreSQL |
   | 8080 | Web development servers |
   | 1080 | Other SOCKS proxies |
   | 3389 | Local RDP listener |

---

## Firewall Issues

### Windows Firewall

**Symptoms:**
- Tunnel starts but external applications cannot connect to the local port.
- Works with Windows Firewall disabled but not enabled.

**Solutions:**

1. **Allow RockTerm through Windows Firewall:**
   - Open Windows Defender Firewall > Allow an app through firewall.
   - Add RockTerm to the allowed list.
   - Ensure both Private and Public network are checked if needed.

2. **Create a specific inbound rule:**
   - Open Windows Defender Firewall > Advanced settings.
   - Inbound Rules > New Rule.
   - Select Port > TCP > Specific port (your tunnel port).
   - Allow the connection.

### Remote Firewall (SSH Server Side)

**Symptoms:**
- Tunnel established but remote service unreachable.
- Works when accessing the service directly from the SSH server.

**Solutions:**

1. **Check firewall on target host (not SSH server):**
   - The target service host may have its own firewall.
   - Verify the SSH server can reach the target: `telnet target_host target_port`

2. **Check network security groups (cloud):**
   - AWS Security Groups, Azure NSGs, or GCP firewall rules.
   - Ensure the SSH server can communicate with the target on the required port.

### Corporate Firewall / Proxy

**Symptoms:**
- SSH connection itself fails (not just the tunnel).
- Connection timeouts on port 22.

**Solutions:**
- Use an HTTP CONNECT proxy in the session configuration.
- Ask your network team if SSH is allowed through the corporate firewall.
- Some organizations only allow SSH on port 443; try that port.

---

## Connectivity Validation

### Testing Local Forwarding

After establishing a tunnel (e.g., local port 8080 → remote host:3306):

1. **Test from command line:**
   ```cmd
   telnet localhost 8080
   ```
   or
   ```powershell
   Test-NetConnection -ComputerName localhost -Port 8080
   ```

2. **Test the remote target from SSH server:**
   - Open a terminal to the SSH server.
   - Test: `telnet target_host target_port` or `nc -zv target_host target_port`

3. **Verify the service is listening:**
   - From the SSH server: `ss -tlnp | grep target_port`

### Testing Dynamic Forwarding (SOCKS)

1. **Configure browser for SOCKS5 proxy:**
   - Proxy: `localhost`
   - Port: your configured SOCKS port (e.g., 1080)
   - Type: SOCKS5

2. **Test with curl:**
   ```cmd
   curl --socks5 localhost:1080 http://example.com
   ```

3. **Verify SOCKS proxy is listening:**
   ```cmd
   netstat -an | findstr :1080
   ```

---

## Dynamic Forwarding Issues

### Browser Not Routing Through Proxy

**Symptoms:**
- SOCKS proxy configured but traffic still goes direct.
- IP checking sites show your real IP, not the SSH server's.

**Solutions:**

1. **Verify proxy settings:**
   - Check your browser's proxy configuration.
   - Ensure SOCKS5 is selected (not SOCKS4 or HTTP).
   - Confirm the port matches your RockTerm configuration.

2. **DNS leaks:**
   - Some browsers send DNS queries directly, bypassing the proxy.
   - In Firefox: set `network.proxy.socks_remote_dns` to `true`.
   - Use a browser extension that forces DNS through the proxy.

3. **System proxy vs. application proxy:**
   - Some applications ignore system proxy settings.
   - Configure the specific application's proxy settings.

### SOCKS Proxy Performance

- Dynamic forwarding adds latency (your traffic goes through the SSH server).
- Bandwidth is limited by the SSH connection speed.
- For high-bandwidth needs, consider direct connections or VPN instead.

---

## Remote Forwarding Issues

### Remote Port Not Accessible from Other Machines

**Symptoms:**
- Remote forwarding works from the SSH server (localhost) but not from other machines.

**Cause:**
- By default, remote forwarded ports bind to localhost only on the SSH server.

**Solution:**
- The SSH server must have `GatewayPorts yes` in sshd_config:
  ```
  GatewayPorts yes
  ```
- Or `GatewayPorts clientspecified` to allow per-connection control.
- Restart sshd after changing.

### Remote Port Already in Use

- Another service on the SSH server is using the requested port.
- Choose a different remote port.
- Check with: `ss -tlnp | grep :PORT` on the server.

### Remote Forwarding Rejected by Server

**Possible causes:**
- `AllowTcpForwarding` is `no` or `local` (only allows local forwarding).
- Set to `AllowTcpForwarding yes` or `AllowTcpForwarding remote` on the server.
- User may not have permission (check `Match` blocks in sshd_config).

---

## Performance Issues

### Slow Tunnel Performance

**Symptoms:**
- Data through the tunnel is significantly slower than direct access.
- High latency on tunneled connections.

**Solutions:**

1. **Enable SSH compression:**
   - If tunneling text-heavy protocols, enable compression in the session.
   - Note: compression adds CPU overhead; may not help on fast networks.

2. **Check network path:**
   - High latency to the SSH server affects all tunneled traffic.
   - Run ping/traceroute to identify bottlenecks.

3. **Tunnel overhead:**
   - Each packet has SSH encryption overhead.
   - For high-bandwidth needs, consider VPN or direct connection.

4. **Connection keep-alive:**
   - Enable keep-alive to prevent idle disconnections.
   - Set an appropriate interval in Preferences.

### Tunnel Drops Under Load

- The SSH connection may timeout under heavy load.
- Enable keep-alive messages.
- Check server-side timeout settings (`ClientAliveInterval`).
- Monitor the SSH connection status in the status bar.

---

## Related Links

- [Port Forwarding](port-forwarding.md)
- [SSH Connections](ssh-connections.md)
- [SSH Jump Hosts](ssh-jump-hosts.md)
- [Troubleshooting: Authentication](troubleshooting-authentication.md)
