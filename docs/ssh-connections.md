---
title: SSH Connections
---

# SSH Connections

RockTerm provides full-featured SSH connectivity with support for multiple authentication methods, jump hosts, port forwarding, and advanced options.

## Table of Contents

- [Overview](#overview)
- [Creating an SSH Connection](#creating-an-ssh-connection)
- [Authentication Methods](#authentication-methods)
- [SSH Key Management](#ssh-key-management)
- [Known Hosts](#known-hosts)
- [Advanced Options](#advanced-options)
- [Remote Commands](#remote-commands)
- [SSH Agent Forwarding](#ssh-agent-forwarding)
- [Troubleshooting](#troubleshooting)
- [Related Links](#related-links)

---

## Overview

RockTerm's SSH implementation supports:

- SSH-2 protocol
- Password, public key, certificate, and keyboard-interactive authentication
- RSA, ED25519, and ECDSA key types
- Jump host / bastion / ProxyJump connections
- HTTP CONNECT and SOCKS proxy support
- Local, remote, and dynamic port forwarding
- Agent forwarding
- Compression
- Keep-alive intervals
- xterm-256color terminal type with truecolor support

---

## Creating an SSH Connection

### From the Menu

1. Go to **Session > New SSH** or press **Ctrl+T**.
2. Fill in the connection details:
   - **Host** — Hostname or IP address (IPv4 or IPv6).
   - **Port** — TCP port (default: 22).
   - **Username** — Your login username.
3. Choose your authentication method (see below).
4. Click **Connect**.

### From Quick Connect

Type in the toolbar Quick Connect field:

```
username@hostname:port
```

Press **Enter** to connect via SSH. Examples:

```
admin@10.0.0.1
root@server.example.com:2222
deploy@[2001:db8::1]:22
```

### Using the SSH Wizard

Go to **Session > SSH Wizard** for a guided step-by-step connection setup that walks through host, authentication, and options.

---

## Authentication Methods

### Password Authentication

1. Enter your password in the SSH connection dialog.
2. RockTerm sends the password securely over the encrypted SSH channel.

To store passwords for reuse, create a [Credential Profile](session-management.md#credential-profiles).

### Public Key Authentication

1. In the SSH connection dialog, click **Browse** next to the Key File field.
2. Select your private key file (PEM format).
3. If the key is passphrase-protected, RockTerm prompts for the passphrase at connection time.

Supported key types:

| Type | File Extension | Notes |
|------|---------------|-------|
| RSA | id_rsa | 2048-bit or higher recommended |
| ED25519 | id_ed25519 | Recommended for new keys |
| ECDSA | id_ecdsa | NIST P-256, P-384, or P-521 |

### Passphrase-Protected Keys

When connecting with a passphrase-protected key:

1. RockTerm prompts for the passphrase.
2. Enter the passphrase to unlock the key.
3. The key is used for authentication.

Passphrases are never stored unless you explicitly save them in a Credential Profile.

### Certificate Authentication

1. In the SSH connection dialog, browse to your certificate file.
2. The certificate is presented to the server alongside your key.

### Keyboard-Interactive Authentication

Some servers use keyboard-interactive authentication for:

- Multi-factor authentication (MFA/2FA)
- One-time passwords (OTP)
- Challenge-response systems

RockTerm prompts you for each challenge presented by the server.

---

## SSH Key Management

Access the SSH Key Manager via **Network > SSH Key Manager**.

### Generate a New Key Pair

1. Open the SSH Key Manager.
2. Click **Generate**.
3. Choose key type (RSA, ED25519, ECDSA).
4. Set key size (for RSA: 2048, 3072, or 4096 bits).
5. Optionally set a passphrase.
6. Choose save location.
7. Click **Generate**.

### Import Keys

Import existing key files into the manager for easy access when configuring sessions.

### Key Utilities

- View key fingerprints
- Copy public key to clipboard (for adding to `authorized_keys`)
- Export public keys

---

## Known Hosts

RockTerm implements Trust-On-First-Use (TOFU) for host key verification.

### First Connection

When connecting to a new host for the first time:

1. RockTerm displays the server's host key fingerprint.
2. If you accept, the key is saved to the known hosts database.
3. Future connections verify the server presents the same key.

### Host Key Changes

If a server's host key changes (potential man-in-the-middle attack):

1. RockTerm displays a warning with the old and new key fingerprints.
2. The connection is rejected to protect you.
3. You must manually remove the old key if the change is legitimate.

### Managing Known Hosts

Access via **Network > Host Key Manager**:

- View all stored host keys with fingerprints.
- Remove individual host keys.
- Trust new keys for servers that have been reinstalled.

Host keys are stored in `~/.ssh/known_hosts` in standard OpenSSH format.

---

## Advanced Options

### Compression

Enable SSH compression to reduce bandwidth usage on slow links. Available in the SSH connection dialog under advanced options.

### Algorithm Control

Disable specific algorithms if needed for compatibility or security:

1. Open the SSH connection dialog.
2. Navigate to advanced options.
3. Select algorithms to disable.

### Keep-Alive

Configure periodic keep-alive messages to prevent idle disconnections:

1. Go to **Edit > Preferences**.
2. Set the keep-alive interval (seconds).
3. RockTerm sends a NUL byte at the configured interval.

Set to 0 to disable keep-alive.

---

## Remote Commands

Execute commands automatically after connecting:

1. Edit the session or connection dialog.
2. Enable the **Remote Command** section.
3. Enter commands (one per line). Examples:
   ```
   terminal length 0
   enable
   ```
4. Set a delay (0-30 seconds) before commands are sent.

This is useful for:

- Setting terminal length on network devices (`term len 0`)
- Entering enable mode on Cisco devices
- Running initial setup commands on Linux servers
- Sourcing environment files

---

## SSH Agent Forwarding

Forward your local SSH agent to remote hosts for key-based authentication to further servers:

1. Enable **Agent Forwarding** in the SSH connection dialog.
2. Connect to the remote host.
3. From the remote host, SSH to additional servers using your local keys.

**Security note:** Only enable agent forwarding to trusted hosts. A compromised remote host could potentially use your forwarded agent.

---

## Troubleshooting

### Connection Refused

- Verify the host is reachable (ping or traceroute).
- Confirm SSH is running on the specified port.
- Check firewall rules on both ends.

### Authentication Failed

- Verify username and password are correct.
- For key auth, ensure the public key is in the server's `authorized_keys`.
- Check key file permissions (private key should be readable only by you).
- Verify the key type is accepted by the server.

### Host Key Verification Failed

- If the server was reinstalled, remove the old key from Host Key Manager.
- If unexpected, investigate a potential MITM attack.
- Compare fingerprints with the server administrator.

### Connection Drops

- Enable keep-alive in Preferences.
- Check network stability.
- Verify server-side timeout settings.

### Slow Connection

- Enable compression for high-latency or low-bandwidth links.
- Check for DNS resolution delays (try IP address directly).
- Verify there are no proxy misconfigurations.

See [Troubleshooting: Authentication](troubleshooting-authentication.md) for detailed solutions.

---

## Related Links

- [SSH Jump Hosts](ssh-jump-hosts.md)
- [Port Forwarding](port-forwarding.md)
- [Session Management](session-management.md)
- [Security](security.md)
- [Troubleshooting: Authentication](troubleshooting-authentication.md)
