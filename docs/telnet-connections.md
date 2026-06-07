---
title: Telnet Connections
---

# Telnet Connections

RockTerm supports Telnet connections for accessing legacy network devices, lab equipment, and systems that require unencrypted terminal access.

## Table of Contents

- [Overview](#overview)
- [Creating a Telnet Connection](#creating-a-telnet-connection)
- [Connection Settings](#connection-settings)
- [Remote Commands](#remote-commands)
- [Security Considerations](#security-considerations)
- [Common Use Cases](#common-use-cases)
- [Troubleshooting](#troubleshooting)
- [Related Links](#related-links)

---

## Overview

Telnet provides unencrypted terminal access over TCP. RockTerm's Telnet implementation includes:

- Full Telnet protocol with IAC command handling
- Telnet option negotiation
- Configurable port (default: 23)
- Remote command execution post-connect
- Pattern highlighting support
- Session logging with ANSI stripping

**Security Warning:** Telnet transmits data (including passwords) in cleartext. Use SSH whenever possible. Telnet is appropriate only for:

- Isolated lab networks
- Console server access
- Legacy devices that do not support SSH
- Initial device provisioning before SSH is configured

---

## Creating a Telnet Connection

### From the Menu

1. Go to **Session > New Telnet**.
2. Enter the **Host** (hostname or IP address).
3. Enter the **Port** (default: 23).
4. Click **Connect**.

### From Quick Connect

Type in the toolbar Quick Connect field and RockTerm will detect non-standard ports:

```
switch.lab.local
192.168.1.1:2323
```

For Telnet specifically (versus SSH default), use the Session menu or save a Telnet session.

### From the Session Manager

1. Click **New Session** in the Session Manager.
2. Select **Telnet** as the protocol type.
3. Enter host and port.
4. Click **OK** to save.
5. Double-click the session to connect.

---

## Connection Settings

| Setting | Description | Default |
|---------|-------------|---------|
| Host | Hostname or IP address of the target | (required) |
| Port | TCP port number | 23 |
| Remote Command | Commands to send after connect | (none) |
| Highlight Rules | Pattern highlighting files to apply | (none) |

---

## Remote Commands

Automatically execute commands after the Telnet connection is established:

1. Edit the Telnet session.
2. Enable the **Remote Command** section.
3. Enter commands (one per line):
   ```
   terminal length 0
   enable
   show version
   ```
4. Set a **Delay** (0-30 seconds) before commands are sent.

The delay allows the remote device to present its login prompt and reach a ready state before RockTerm sends commands.

---

## Security Considerations

### Data in Transit

All Telnet traffic is unencrypted:

- Passwords are visible to network sniffers.
- Session content can be intercepted.
- Commands and responses are transmitted in cleartext.

### Recommendations

- Use Telnet only on isolated or trusted networks.
- Prefer SSH for any production or internet-facing connections.
- Use Telnet for initial device setup only, then switch to SSH.
- Consider VPN or SSH tunnel if Telnet must traverse untrusted networks.
- Never use Telnet with production credentials.

---

## Common Use Cases

### Network Device Initial Setup

Many network devices ship with Telnet enabled by default for initial configuration before SSH is activated:

```
Router> enable
Router# configure terminal
Router(config)# hostname R1
R1(config)# crypto key generate rsa modulus 2048
R1(config)# ip ssh version 2
R1(config)# line vty 0 4
R1(config-line)# transport input ssh
```

### Console Server Access

Console servers (terminal servers) often provide Telnet access to serial ports:

```
telnet console-server.lab 2001    # Port 2001 = Serial port 1
telnet console-server.lab 2002    # Port 2002 = Serial port 2
```

### Lab Equipment

Isolated lab environments where security is not a concern:

- Switches in training racks
- Virtualized network devices (GNS3, EVE-NG, CML)
- Development test fixtures

---

## Troubleshooting

### Connection Refused

- Verify the host is reachable (try pinging it).
- Confirm Telnet service is running on the specified port.
- Check that VTY lines are available on network devices:
  ```
  show line
  show users
  ```
- Verify no ACL is blocking your source IP.

### Connection Timeout

- Check network connectivity and routing.
- Verify no firewall is blocking port 23 (or custom port).
- Try an alternative port if the device uses non-standard Telnet.

### Garbled Output

- The remote device may be sending unexpected escape sequences.
- Try clearing the terminal (**Ctrl+L** or **Edit > Clear Buffer**).
- Check if the device expects a different terminal type.

### Session Disconnects Immediately

- VTY lines may be exhausted on the device.
- An access-class ACL may be rejecting your connection.
- The device may require authentication that is not being sent.

### No Login Prompt

- The device may require pressing Enter first.
- Wait a few seconds; some devices have slow boot sequences.
- The port may not be a Telnet service (try Raw TCP instead).

---

## Related Links

- [SSH Connections](ssh-connections.md) — Preferred secure alternative
- [Serial Connections](serial-connections.md) — Direct console access
- [Session Management](session-management.md)
- [Terminal Features](terminal-features.md)
