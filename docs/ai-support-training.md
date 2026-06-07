---
title: AI Support Training Knowledge Base
---

# AI Support Training Knowledge Base

This document provides structured knowledge for AI-powered support systems handling RockTerm customer inquiries.

## Table of Contents

- [Common User Intents](#common-user-intents)
- [Common Support Requests](#common-support-requests)
- [Troubleshooting Workflows](#troubleshooting-workflows)
- [Decision Trees](#decision-trees)
- [Escalation Criteria](#escalation-criteria)
- [Suggested Support Responses](#suggested-support-responses)
- [Information Required Before Escalation](#information-required-before-escalation)
- [Prohibited Information Requests](#prohibited-information-requests)

---

## Common User Intents

### Connection Intents

| Intent | Indicators | Resolution Path |
|--------|-----------|-----------------|
| Want to connect via SSH | "SSH", "connect to server", "remote login" | Guide to SSH connection dialog |
| Want to connect via serial | "serial", "console", "COM port", "baud" | Guide to serial connection setup |
| Want to set up jump host | "bastion", "jump", "proxy", "through" | Guide to jump host configuration |
| Want port forwarding | "tunnel", "forward port", "access remote service" | Guide to port forwarding |
| Connection failing | "can't connect", "refused", "timeout", "failed" | Troubleshooting workflow |

### Configuration Intents

| Intent | Indicators | Resolution Path |
|--------|-----------|-----------------|
| Change appearance | "theme", "dark mode", "font", "colors" | Preferences guidance |
| Manage sessions | "save", "organize", "folder", "import" | Session management guidance |
| Set up automation | "script", "automate", "trigger", "expect" | Scripting guidance |
| Configure security | "password", "credential", "encrypt", "key" | Security guidance |

### Troubleshooting Intents

| Intent | Indicators | Resolution Path |
|--------|-----------|-----------------|
| Authentication failure | "wrong password", "key rejected", "denied" | Auth troubleshooting |
| Serial not working | "garbled", "no output", "port not found" | Serial troubleshooting |
| Performance issue | "slow", "lag", "memory", "unresponsive" | Performance troubleshooting |
| Feature not found | "where is", "how do I", "can't find" | Feature location guidance |

---

## Common Support Requests

### Tier 1 (Self-Service)

These requests should be resolved with documentation references:

1. **"How do I connect to X?"** → [Getting Started](getting-started.md), connection-specific docs
2. **"Where is setting Y?"** → [Terminal Features](terminal-features.md), Preferences
3. **"What baud rate for device Z?"** → [Serial Connections](serial-connections.md)
4. **"How do I transfer files?"** → [Terminal Features](terminal-features.md#file-transfer)
5. **"How do I save my sessions?"** → [Session Management](session-management.md)
6. **"Can RockTerm do X?"** → [FAQ](faq.md), feature documentation
7. **"How do I change the theme?"** → View > Theme menu
8. **"What keyboard shortcuts?"** → [Terminal Features](terminal-features.md#keyboard-shortcuts)
9. **"How do I use the AI?"** → [AI Assistant](ai-assistant.md)
10. **"How do I export sessions?"** → [Import & Export](import-export.md)

### Tier 2 (Guided Troubleshooting)

These require interactive diagnosis:

1. **SSH authentication failures** → [Troubleshooting: Authentication](troubleshooting-authentication.md)
2. **Serial port not detected** → [Troubleshooting: Serial](troubleshooting-serial.md)
3. **Port forwarding not working** → [Troubleshooting: Port Forwarding](troubleshooting-port-forwarding.md)
4. **Performance degradation** → [Troubleshooting: Performance](troubleshooting-performance.md)
5. **Host key mismatch warnings** → Host key management guidance
6. **Credential vault locked** → Master password recovery path
7. **Import/export failures** → File format validation
8. **Script execution errors** → Script syntax and variable issues

### Tier 3 (Escalation Required)

These require human support:

1. Application crashes
2. Data corruption
3. Security vulnerabilities
4. Licensing issues
5. Feature requests
6. Bugs confirmed after troubleshooting

---

## Troubleshooting Workflows

### Workflow: SSH Connection Failure

```
1. Can you ping the host?
   ├── No → Network/firewall issue (not RockTerm-specific)
   └── Yes → Continue

2. Is port 22 (or custom port) open?
   ├── No → SSH service not running or firewall blocking
   └── Yes → Continue

3. What authentication method?
   ├── Password → Verify credentials, check PasswordAuthentication on server
   ├── Key → Verify key path, format, server authorized_keys, permissions
   └── Interactive → Check MFA configuration on server

4. Does another SSH client work?
   ├── Yes → RockTerm-specific issue (collect version, settings, escalate)
   └── No → Server-side or network issue

5. Check server logs: /var/log/auth.log or /var/log/secure
```

### Workflow: Serial Connection Problem

```
1. Is the port listed in RockTerm?
   ├── No → Check Device Manager, install driver, try different USB port
   └── Yes → Continue

2. Does the port open without error?
   ├── No → Port busy (close other apps) or permission denied
   └── Yes → Continue

3. Is there any output?
   ├── No → Press Enter, check cable, check device power, try Send Break
   └── Garbled → Baud rate mismatch (try 9600, then 115200, then Auto-Detect)
   └── Clean → Connection working, assist with device interaction

4. After adjusting baud rate, still garbled?
   ├── Yes → Try different data bits/parity (8N1 vs 7E1), check cable
   └── No → Resolved
```

### Workflow: Port Forwarding Not Working

```
1. Is the SSH connection active?
   ├── No → Establish SSH first, then configure forwarding
   └── Yes → Continue

2. Is the local port already in use?
   ├── Yes → Choose different port or stop conflicting service
   └── No → Continue

3. Can SSH server reach the target?
   ├── No → Firewall/routing issue on server side
   └── Yes → Continue

4. Is AllowTcpForwarding enabled on server?
   ├── No → Enable in sshd_config, restart sshd
   └── Yes → Continue

5. Can you connect to localhost:forward_port?
   ├── No → Windows Firewall may be blocking; add RockTerm exception
   └── Yes → Tunnel working, issue is with the application using the tunnel
```

### Workflow: Performance Issue

```
1. How many sessions are open?
   ├── > 20 → Close unused sessions, reduce scrollback
   ├── 5-20 → Check scrollback setting and individual session activity
   └── < 5 → Continue (likely not session count)

2. What is the scrollback setting?
   ├── > 50,000 → Reduce to 10,000 or less
   └── ≤ 10,000 → Continue

3. Is pattern highlighting active?
   ├── Yes → Try disabling (Ctrl+Alt+H), check if performance improves
   └── No → Continue

4. Is the issue with one session or all?
   ├── One → That session may have unusual output patterns
   └── All → System resources may be constrained; check Task Manager

5. How long has RockTerm been running?
   ├── Days/weeks → Restart RockTerm to reclaim memory
   └── Recently started → Escalate as potential bug
```

---

## Decision Trees

### Connection Type Selection

```
User needs to connect to a device:

What type of connection?
├── Remote server over network
│   ├── Requires encryption → SSH
│   ├── Legacy device, no SSH → Telnet (warn about security)
│   └── Custom protocol → Raw TCP
├── Physical device via cable
│   └── Serial console → Serial (determine baud rate)
├── Local machine
│   └── Local shell → PowerShell/cmd
└── Remote desktop
    └── RDP (external client)
```

### Authentication Method Selection

```
User needs to authenticate via SSH:

How do you normally log in?
├── Username and password → Password auth
├── SSH key file → Public key auth
│   ├── Key has passphrase → Prompted at connect time
│   └── Key without passphrase → Automatic
├── Certificate → Certificate auth
├── MFA/2FA required → Keyboard-interactive
└── Don't know → Try password first, suggest keys for security
```

### Serial Troubleshooting Path

```
User has serial connection issue:

What's happening?
├── No port in dropdown → Driver issue
│   ├── Adapter in Device Manager? → Install correct driver
│   └── Not in Device Manager → Try different USB port/cable
├── Port opens, no output → Communication issue
│   ├── Device powered? → Verify power
│   └── Powered → Try Enter, Send Break, check cable
├── Garbled characters → Settings mismatch
│   ├── Try 9600 8N1 → Most network devices
│   ├── Try 115200 8N1 → Linux, modern devices
│   └── Unknown → Use Auto-Detect
└── Intermittent disconnections → Hardware issue
    └── Try different cable, USB port, adapter
```

---

## Escalation Criteria

### Escalate Immediately If

- Application crashes (include crash details and steps to reproduce)
- Data loss reported (sessions deleted, credentials corrupted)
- Security vulnerability discovered
- Licensing or purchase issues
- Issue persists after all troubleshooting steps exhausted

### Escalate After Tier 1 Exhausted

- Connection issue reproducible only in RockTerm (works in other clients)
- Feature not behaving as documented
- UI rendering issues or visual glitches
- Import/export producing corrupted data
- Script engine errors not caused by script syntax

### Do NOT Escalate

- General "how do I" questions (provide documentation)
- Issues caused by server-side configuration
- Network/firewall issues outside RockTerm's control
- Third-party driver problems (USB adapters)
- AI provider issues (API key, rate limiting, service outages)

---

## Suggested Support Responses

### Greeting

> Thank you for contacting RockTerm support. I'd be happy to help you with [issue summary]. Let me gather some information to assist you.

### Requesting Information

> To help diagnose this issue, could you please provide:
> - Your RockTerm version (Help > About)
> - Your Windows version
> - The exact error message (if any)
> - Steps you took before the issue occurred

### Connection Issue Response

> Based on what you've described, this appears to be [a network connectivity / an authentication / a configuration] issue. Here are the steps to resolve it:
>
> 1. [First step]
> 2. [Second step]
> 3. [Third step]
>
> If these steps don't resolve the issue, please let me know and I'll investigate further.

### Feature Location Response

> The feature you're looking for is located at [Menu > Submenu > Item] or you can use the keyboard shortcut [Ctrl+X]. Here's a quick guide:
>
> [Brief instructions]
>
> For more details, see our documentation: [link to relevant doc page]

### Escalation Response

> I've investigated this issue and it requires attention from our development team. I'm escalating this to our engineering support tier. Here's what I've gathered:
>
> - Issue: [summary]
> - Environment: [version, OS]
> - Steps to reproduce: [steps]
> - Troubleshooting attempted: [what was tried]
>
> You'll receive a follow-up within [timeframe].

---

## Information Required Before Escalation

Before escalating to Tier 3, ensure the following is collected:

### Minimum Required

- [ ] RockTerm version number
- [ ] Windows version and build
- [ ] Clear problem description
- [ ] Steps to reproduce (or confirmation it's intermittent)
- [ ] Error messages (exact text, not paraphrased)
- [ ] Whether the issue occurs with default settings

### Connection Issues

- [ ] Connection type (SSH/Telnet/Serial/Local)
- [ ] Target host/port (sanitized if needed)
- [ ] Authentication method
- [ ] Whether other SSH/terminal clients work
- [ ] Network path (direct, VPN, proxy, jump host)

### Serial Issues

- [ ] USB adapter model and chipset
- [ ] Driver version
- [ ] COM port number
- [ ] Device type being connected to
- [ ] Cable type used

### Performance Issues

- [ ] Number of open sessions
- [ ] Scrollback setting
- [ ] Duration RockTerm has been running
- [ ] System specs (CPU, RAM)
- [ ] Which specific operation is slow

---

## Prohibited Information Requests

### NEVER Request From Users

The following information must NEVER be requested from users under any circumstances:

| Prohibited Request | Reason |
|-------------------|--------|
| **Passwords** | Security risk; never needed for support |
| **Private SSH keys** | Security risk; never needed for support |
| **API keys** (Anthropic, OpenAI) | Security risk; billing fraud potential |
| **Authentication tokens** | Security risk; unauthorized access potential |
| **Session contents** (terminal output with sensitive data) | May contain confidential customer data |
| **Master password** for the vault | Would compromise all stored credentials |
| **Credential profile contents** | Contains encrypted secrets |
| **Certificate private keys** | Security risk |
| **Proxy credentials** | Security risk |
| **Screenshots of passwords** | Security risk |

### What to Request Instead

| Need | Safe Alternative |
|------|-----------------|
| Verify auth works | "Can you log in with another SSH client?" |
| Check key format | "What is the file extension? Does it start with -----BEGIN?" |
| Verify API connectivity | "Do you see an error message when the AI tries to respond?" |
| Check credentials | "Have you verified your credentials work outside RockTerm?" |
| Debug connection | "What error message appears?" (not the credentials themselves) |

### If a User Offers Sensitive Information

> I appreciate you trying to help, but for your security I cannot accept passwords, private keys, or other credentials. Let me help you in a different way — [alternative approach].

### Handling Accidental Disclosure

If a user accidentally shares sensitive information:

1. Do not acknowledge or repeat the sensitive data.
2. Advise the user to change the compromised credential immediately.
3. Note that the conversation may need to be purged for compliance.
4. Continue troubleshooting using safe diagnostic approaches.

---

## Product Knowledge Quick Reference

### Connection Defaults

| Type | Default Port | Terminal Type |
|------|-------------|--------------|
| SSH | 22 | xterm-256color |
| Telnet | 23 | xterm-256color |
| Serial | N/A | 9600 8N1 |
| Raw TCP | (none) | xterm-256color |
| RDP | 3389 | N/A (external) |
| Local Shell | N/A | xterm-256color |

### Key Paths

| Item | Windows Path |
|------|-------------|
| Configuration | %APPDATA%\RockTerm\ |
| SSH Keys | %USERPROFILE%\.ssh\ |
| Known Hosts | %USERPROFILE%\.ssh\known_hosts |
| Sessions File | %APPDATA%\RockTerm\sessions.json |
| Encrypted Vault | %APPDATA%\RockTerm\secrets.enc |

### Common Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| New SSH | Ctrl+T |
| Quick Connect | Ctrl+Q |
| Copy | Ctrl+Shift+C |
| Paste | Ctrl+Shift+V |
| Find | Ctrl+F |
| Session Manager | Ctrl+B |
| Preferences | Ctrl+, |
| Script Manager | F5 |
| Trigger Manager | F6 |
| AI Assist | Ctrl+Shift+I |
| Fullscreen | F11 |
| Help | F1 |

---

## Related Links

- [FAQ](faq.md)
- [Support](support.md)
- [Troubleshooting: Authentication](troubleshooting-authentication.md)
- [Troubleshooting: Serial](troubleshooting-serial.md)
- [Troubleshooting: Performance](troubleshooting-performance.md)
- [Troubleshooting: Port Forwarding](troubleshooting-port-forwarding.md)
- [Security](security.md)
- [Privacy](privacy.md)
