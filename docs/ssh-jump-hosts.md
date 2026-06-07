---
title: SSH Jump Hosts
---

# SSH Jump Hosts

RockTerm supports SSH jump hosts (also known as bastion hosts or ProxyJump) to reach servers that are not directly accessible from your network.

## Table of Contents

- [Overview](#overview)
- [How Jump Hosts Work](#how-jump-hosts-work)
- [Configuring a Jump Host](#configuring-a-jump-host)
- [Authentication on Jump Hosts](#authentication-on-jump-hosts)
- [Multi-Hop Connections](#multi-hop-connections)
- [HTTP CONNECT Proxy](#http-connect-proxy)
- [SOCKS Proxy](#socks-proxy)
- [Firewall Profiles](#firewall-profiles)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Related Links](#related-links)

---

## Overview

A jump host (bastion host) is an intermediary server used to reach target systems in private networks. This is equivalent to OpenSSH's `ProxyJump` or `-J` option.

Common scenarios:

- Accessing servers in a private VPC through a public bastion.
- Reaching lab equipment behind a corporate firewall.
- Connecting to production systems through a hardened gateway.

---

## How Jump Hosts Work

```
┌──────────┐     SSH      ┌───────────┐     SSH      ┌──────────────┐
│ RockTerm │ ──────────── │ Jump Host │ ──────────── │ Target Host  │
│ (Client) │   Tunnel     │ (Bastion) │   Direct     │ (Destination)│
└──────────┘              └───────────┘              └──────────────┘
```

1. RockTerm establishes an SSH connection to the jump host.
2. Through that connection, a TCP tunnel is opened to the target host.
3. The final SSH session to the target runs through this tunnel.
4. Your terminal interacts with the target host as if directly connected.

---

## Configuring a Jump Host

### In the Session Editor

1. Create or edit an SSH session.
2. Locate the **Jump Host** section.
3. Enable the jump host checkbox.
4. Enter:
   - **Host** — Jump host hostname or IP.
   - **Port** — Jump host SSH port (default: 22).
   - **Username** — Username for the jump host (defaults to the main session username if left blank).
   - **Key File** — Private key for jump host authentication (optional).

### In the SSH Connection Dialog

1. Open **Session > New SSH** or press **Ctrl+T**.
2. Fill in the target host details as normal.
3. Expand the **Jump Host** section.
4. Configure the jump host parameters.
5. Click **Connect**.

---

## Authentication on Jump Hosts

The jump host supports the same authentication methods as the target:

| Method | Configuration |
|--------|--------------|
| Password | Prompted at connection time |
| Public Key | Specify key file in the jump host section |
| Agent | Uses SSH agent if available |

If no key file is specified for the jump host, RockTerm attempts:

1. The key file specified in the jump host configuration.
2. Default key locations (`~/.ssh/id_rsa`, `~/.ssh/id_ed25519`).
3. Password prompt as fallback.

---

## Multi-Hop Connections

For environments requiring multiple hops (e.g., Internet > DMZ > Internal > Target), RockTerm supports chaining through a single jump host configuration.

For complex multi-hop scenarios:

1. Save intermediate connections as separate sessions.
2. Use port forwarding on the first hop to tunnel to the next.
3. Connect to the final target through the forwarded port.

Example topology:

```
Client → Bastion (public) → App Server (DMZ) → Database (internal)
```

Configuration approach:

1. Create a session to the Bastion with port forwarding.
2. Forward local port 2222 to App Server port 22.
3. Create a second session connecting to localhost:2222 with a jump host configured for the Database.

---

## HTTP CONNECT Proxy

For environments where SSH is only reachable through an HTTP proxy:

1. Edit the SSH session.
2. Enable the **HTTP CONNECT Proxy** section.
3. Configure:
   - **Proxy Host** — HTTP proxy hostname.
   - **Proxy Port** — HTTP proxy port (default: 8080).
   - **Username** — Proxy authentication username (optional).
   - **Password** — Proxy authentication password (optional, encrypted).

RockTerm sends an HTTP CONNECT request to the proxy, then tunnels the SSH connection through the resulting TCP stream.

---

## SOCKS Proxy

Configure a local SOCKS proxy (equivalent to `ssh -D`):

1. Edit the SSH session.
2. Enable the **SOCKS Proxy** section.
3. Set the **Local Port** (default: 1080).

When connected, RockTerm creates a SOCKS5 proxy on the specified local port. Applications configured to use this proxy will route traffic through the SSH connection.

---

## Firewall Profiles

For frequently used proxy configurations, create reusable firewall profiles:

1. Go to **Network > Credential Profiles** or click **Manage...** in the session editor.
2. Create a named profile with proxy type, host, port, and credentials.
3. Select the profile in any session editor.

Supported profile types:

| Type | Use Case |
|------|----------|
| HTTP CONNECT | Corporate web proxies, Squid |
| SOCKS5 | SSH tunnels, Tor, generic SOCKS |
| SOCKS4 | Legacy SOCKS proxy servers |

When a firewall profile is selected, RockTerm automatically applies the proxy settings and adjusts default ports based on type.

---

## Examples

### Corporate Bastion Access

Scenario: Access a Linux server at 10.1.2.100 through a bastion at bastion.corp.com.

| Setting | Value |
|---------|-------|
| Target Host | 10.1.2.100 |
| Target Port | 22 |
| Target Username | deploy |
| Jump Host | bastion.corp.com |
| Jump Port | 22 |
| Jump Username | admin |
| Jump Key File | C:\Users\you\.ssh\bastion_key |

### Lab Access Through Proxy

Scenario: Reach a lab switch at 172.16.0.1 through an HTTP proxy at proxy.corp.com:3128.

| Setting | Value |
|---------|-------|
| Target Host | 172.16.0.1 |
| Target Port | 22 |
| Target Username | admin |
| HTTP Proxy Host | proxy.corp.com |
| HTTP Proxy Port | 3128 |
| HTTP Proxy Username | jsmith |
| HTTP Proxy Password | (stored encrypted) |

### Cloud VPC Access

Scenario: Access an EC2 instance at 10.0.1.50 through a public bastion at 54.x.x.x.

| Setting | Value |
|---------|-------|
| Target Host | 10.0.1.50 |
| Target Port | 22 |
| Target Username | ec2-user |
| Target Key File | C:\Users\you\.ssh\app_key.pem |
| Jump Host | 54.x.x.x |
| Jump Port | 22 |
| Jump Username | ec2-user |
| Jump Key File | C:\Users\you\.ssh\bastion_key.pem |

---

## Troubleshooting

### Jump Host Connection Refused

- Verify the jump host is reachable from your network.
- Confirm SSH is running on the specified port.
- Check that your credentials are correct for the jump host.
- Ensure the jump host allows TCP forwarding (`AllowTcpForwarding yes` in sshd_config).

### Target Unreachable Through Jump Host

- Verify the target is reachable from the jump host.
- Check that the jump host can resolve the target hostname.
- Confirm no firewall rules block the jump host from reaching the target.
- Try using an IP address instead of hostname for the target.

### Authentication Failures on Jump Host

- Verify the jump host username is correct.
- Ensure the specified key file exists and is readable.
- Check that the public key is in the jump host's `authorized_keys`.
- If using password auth, ensure keyboard-interactive is enabled on the jump host.

### Proxy Connection Failures

- Verify proxy host and port are correct.
- Confirm the proxy allows CONNECT to the target host:port.
- Check proxy authentication credentials.
- Some proxies only allow CONNECT to port 443; verify SSH port is permitted.

### Timeout During Multi-Hop

- Increase the connection timeout in Preferences.
- Each hop adds latency; ensure timeouts account for the full chain.
- Verify no intermediate firewalls have short idle timeouts.

---

## Related Links

- [SSH Connections](ssh-connections.md)
- [Port Forwarding](port-forwarding.md)
- [Session Management](session-management.md)
- [Security](security.md)
- [Troubleshooting: Authentication](troubleshooting-authentication.md)
