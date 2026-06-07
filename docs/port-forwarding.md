---
title: Port Forwarding
---

# Port Forwarding

RockTerm supports SSH port forwarding (tunneling) to securely access services through encrypted connections.

## Table of Contents

- [Overview](#overview)
- [Local Forwarding](#local-forwarding)
- [Remote Forwarding](#remote-forwarding)
- [Dynamic Forwarding (SOCKS5)](#dynamic-forwarding-socks5)
- [Managing Tunnels](#managing-tunnels)
- [Port Forwarding Wizard](#port-forwarding-wizard)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Related Links](#related-links)

---

## Overview

SSH port forwarding creates encrypted tunnels between your local machine and remote services. RockTerm supports three types:

| Type | SSH Equivalent | Direction |
|------|---------------|-----------|
| Local | `ssh -L` | Forward local port to remote service |
| Remote | `ssh -R` | Forward remote port to local service |
| Dynamic | `ssh -D` | SOCKS5 proxy through SSH connection |

Access port forwarding via **Network > Port Forwarding** or use the **Port Forwarding Wizard** for guided setup.

---

## Local Forwarding

Local forwarding binds a port on your local machine and tunnels traffic to a destination through the SSH server.

```
┌──────────┐  Local Port   ┌────────────┐  Tunnel   ┌─────────────┐
│ Browser  │ ────────────► │  RockTerm  │ ────────► │ SSH Server  │ ──► Remote Service
│ localhost:8080            │            │           │             │     (e.g., DB:3306)
└──────────┘               └────────────┘           └─────────────┘
```

### Configuration

| Parameter | Description | Example |
|-----------|-------------|---------|
| Local Port | Port on your machine to listen on | 8080 |
| Remote Host | Destination host (from SSH server's perspective) | 10.0.1.50 |
| Remote Port | Destination port | 3306 |

### Use Cases

- Access a database behind a firewall through SSH.
- Reach a web admin panel only accessible from the server's network.
- Connect to services on private subnets through a bastion.

---

## Remote Forwarding

Remote forwarding binds a port on the SSH server and tunnels traffic back to your local machine or network.

```
┌──────────────┐  Remote Port  ┌────────────┐  Tunnel   ┌──────────┐
│ Remote User  │ ────────────► │ SSH Server │ ────────► │ RockTerm │ ──► Local Service
│ server:9090                  │            │           │          │     (e.g., localhost:80)
└──────────────┘               └────────────┘           └──────────┘
```

### Configuration

| Parameter | Description | Example |
|-----------|-------------|---------|
| Remote Port | Port on the SSH server to listen on | 9090 |
| Local Host | Destination host on your network | localhost |
| Local Port | Destination port on your network | 80 |

### Use Cases

- Expose a local development server to a remote colleague.
- Allow a remote server to access a local service.
- Create a reverse tunnel for remote access.

---

## Dynamic Forwarding (SOCKS5)

Dynamic forwarding creates a local SOCKS5 proxy that routes all traffic through the SSH connection. This is equivalent to `ssh -D`.

```
┌──────────┐   SOCKS5    ┌────────────┐  SSH Tunnel  ┌────────────┐
│ Browser  │ ──────────► │  RockTerm  │ ──────────► │ SSH Server │ ──► Any Destination
│ App      │  :1080      │            │             │            │
└──────────┘             └────────────┘             └────────────┘
```

### Configuration

| Parameter | Description | Example |
|-----------|-------------|---------|
| Local Port | SOCKS5 proxy port on your machine | 1080 |

### Setting Up

1. Edit the SSH session.
2. Enable the **SOCKS Proxy** section.
3. Set the local port (default: 1080).
4. Connect to the session.
5. Configure your browser or application to use SOCKS5 proxy at `localhost:1080`.

### Use Cases

- Browse the web as if from the SSH server's location.
- Route all traffic through an encrypted tunnel.
- Access multiple services without individual port forwards.
- Test geo-specific behavior.

---

## Managing Tunnels

### Port Forwarding Dialog

Access via **Network > Port Forwarding**:

- View all active and configured tunnels.
- Add new forwarding rules.
- Edit existing rules.
- Delete rules.
- Enable/disable individual tunnels.

### Per-Session Configuration

Port forwarding rules can be saved as part of a session configuration:

1. Edit a saved session.
2. Configure port forwarding rules.
3. Rules activate automatically when the session connects.

---

## Port Forwarding Wizard

For guided setup, use **Network > Port Forwarding Wizard**:

1. **Select Type** — Choose Local, Remote, or Dynamic forwarding.
2. **Configure Ports** — Set source and destination ports/hosts.
3. **Select Session** — Choose which SSH session to use for the tunnel.
4. **Review** — Confirm settings before activation.

The wizard explains each option and provides examples for common scenarios.

---

## Examples

### Access a Remote Database

Forward local port 3306 to a MySQL server at 10.0.1.50:3306 through your SSH connection:

| Setting | Value |
|---------|-------|
| Type | Local |
| Local Port | 3306 |
| Remote Host | 10.0.1.50 |
| Remote Port | 3306 |

Then connect your database client to `localhost:3306`.

### Access a Web Admin Panel

Forward local port 8443 to a router's HTTPS management at 192.168.1.1:443:

| Setting | Value |
|---------|-------|
| Type | Local |
| Local Port | 8443 |
| Remote Host | 192.168.1.1 |
| Remote Port | 443 |

Then browse to `https://localhost:8443`.

### Expose Local Dev Server

Make your local development server (port 3000) accessible on the remote server at port 8080:

| Setting | Value |
|---------|-------|
| Type | Remote |
| Remote Port | 8080 |
| Local Host | localhost |
| Local Port | 3000 |

### Full Network Proxy

Create a SOCKS5 proxy to route all traffic through the SSH tunnel:

| Setting | Value |
|---------|-------|
| Type | Dynamic |
| Local Port | 1080 |

Configure your browser's proxy settings to use SOCKS5 at `localhost:1080`.

---

## Troubleshooting

### Tunnel Not Working

- Verify the SSH connection is active.
- Check that the local port is not already in use (`netstat -an | find "LISTENING"`).
- Ensure the remote service is reachable from the SSH server.
- Confirm the SSH server allows TCP forwarding (`AllowTcpForwarding yes`).

### Port Already in Use

- Choose a different local port.
- Identify and stop the process using the port.
- On Windows: `netstat -ano | findstr :PORT` then `taskkill /PID <pid>`.

### Connection Refused on Tunneled Port

- The remote service may not be running.
- The remote service may only listen on localhost (try `127.0.0.1` as remote host).
- Firewall rules on the remote host may block the connection.

### Dynamic Proxy Not Routing Traffic

- Verify your application is configured for SOCKS5 (not SOCKS4 or HTTP proxy).
- Check the proxy port matches your configuration.
- Some applications require DNS resolution through the proxy (enable remote DNS in your app settings).

### Remote Forwarding Rejected

- The SSH server may disallow remote forwarding (`GatewayPorts no` in sshd_config).
- The remote port may already be in use.
- You may lack permission to bind privileged ports (< 1024) on the server.

### Tunnel Drops After Idle

- Enable keep-alive in RockTerm Preferences.
- The SSH server or a firewall may have short idle timeouts.
- Consider configuring `ServerAliveInterval` equivalent via keep-alive settings.

---

## Related Links

- [SSH Connections](ssh-connections.md)
- [SSH Jump Hosts](ssh-jump-hosts.md)
- [Security](security.md)
- [Troubleshooting: Port Forwarding](troubleshooting-port-forwarding.md)
