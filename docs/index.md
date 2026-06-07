---
title: RockTerm Documentation
---

# RockTerm Documentation

RockTerm is a professional terminal emulator designed for network engineers, system administrators, DevOps engineers, and IT professionals. It provides secure SSH, Telnet, Serial, and Raw TCP connectivity with advanced session management, automation, and network tooling.

## Table of Contents

- [Getting Started](getting-started.md)
- [Session Management](session-management.md)
- [SSH Connections](ssh-connections.md)
- [SSH Jump Hosts](ssh-jump-hosts.md)
- [Port Forwarding](port-forwarding.md)
- [Telnet Connections](telnet-connections.md)
- [Serial Connections](serial-connections.md)
- [Local Shell](local-shell.md)
- [Terminal Features](terminal-features.md)
- [AI Assistant](ai-assistant.md)
- [Session Logging](session-logging.md)
- [Import & Export](import-export.md)
- [Security](security.md)
- [Privacy](privacy.md)
- [Troubleshooting: Authentication](troubleshooting-authentication.md)
- [Troubleshooting: Port Forwarding](troubleshooting-port-forwarding.md)
- [Troubleshooting: Serial](troubleshooting-serial.md)
- [Troubleshooting: Performance](troubleshooting-performance.md)
- [FAQ](faq.md)
- [Support](support.md)
- [Release Notes](release-notes.md)

---

## Feature Summary

### Connectivity

| Protocol | Description |
|----------|-------------|
| SSH | Secure shell with key auth, jump hosts, port forwarding, agent forwarding |
| Telnet | Classic telnet with IAC negotiation |
| Serial | COM/TTY console with auto-detection of baud rate and settings |
| Raw TCP | Plain socket connections for custom protocols |
| RDP | Launch external Remote Desktop client |
| Local Shell | Native PowerShell or Command Prompt terminal |

### Terminal Emulation

- Full xterm-256color / VT100 emulation
- 24-bit truecolor support
- Configurable scrollback (default 10,000 lines)
- Split panes (horizontal and vertical, unlimited nesting)
- MDI windows with tile, cascade, and tabbed layouts
- Copy/paste with ANSI color preservation
- Block (rectangular) selection
- URL detection with Ctrl+click opening
- Find in terminal and scrollback
- Zoom in/out/reset
- Fullscreen mode (F11)
- Hex view mode
- Cursor styles (block, underline, bar) with optional blinking

### Session Management

- Saved sessions organized in folders
- Drag-and-drop session organization
- Credential profiles with encrypted storage
- Firewall/proxy profiles (HTTP CONNECT, SOCKS4, SOCKS5)
- Session duplication and batch editing
- Import/export sessions (JSON and CSV/TSV)
- Quick Connect with autocomplete from history
- Workspace snapshots (save/restore window layouts)

### Automation & Scripting

- Expect-style scripting with 20+ device templates
- Python script execution with terminal API
- Trigger system (regex pattern matching with 9 action types)
- Command Manager with folder organization
- Command Window for multi-line dispatch
- Button Bar with encrypted password buttons
- Script recording and playback
- Send to All/Selected terminals

### Network Tools

- Subnet Calculator
- Subnet Splitter
- Wildcard Converter
- Route Summarization
- CIDR Reference
- IPv6 Prefix Splitter
- EUI-64 Helper
- Prefix-List Generator (IOS, IOS-XR, JunOS)
- Regex Lab (with AI assist)
- Log Extractor (syslog, BGP, OSPF parsers)

### File Transfer

- ZMODEM send/receive with auto-detection
- YMODEM send/receive
- XMODEM send/receive
- SFTP browser (piggybacks active SSH sessions)
- TFTP server (built-in, RFC 1350 compliant)
- Send ASCII file

### Security

- Encrypted credential vault (AES-128/Fernet with PBKDF2)
- Master password protection
- SSH key management (generate, import, export)
- Host key management with Trust-On-First-Use
- Session locking
- No telemetry or data collection

### AI Assistant

- Optional AI-powered terminal analysis
- Supports Anthropic Claude and OpenAI
- Context-aware command suggestions
- Custom quick prompts
- Paste-to-terminal integration
- Privacy-first design (opt-in only, user-provided API keys)

### Customization

- Theme system with 19-color palettes
- Theme editor with live preview
- Pattern highlighting with regex rules
- Custom keymaps with visual keyboard editor
- Color scheme management
- Wallpaper backgrounds for MDI area

---

## Quick Links

| Task | Where to Go |
|------|-------------|
| Install RockTerm | [Getting Started](getting-started.md) |
| Connect to a server via SSH | [SSH Connections](ssh-connections.md) |
| Set up a jump host | [SSH Jump Hosts](ssh-jump-hosts.md) |
| Configure port forwarding | [Port Forwarding](port-forwarding.md) |
| Connect to a network device console | [Serial Connections](serial-connections.md) |
| Use the AI assistant | [AI Assistant](ai-assistant.md) |
| Automate tasks with scripts | [Terminal Features](terminal-features.md#scripting) |
| Transfer files | [Terminal Features](terminal-features.md#file-transfer) |
| Troubleshoot SSH auth | [Troubleshooting: Authentication](troubleshooting-authentication.md) |
| Export sessions for backup | [Import & Export](import-export.md) |

---

## System Requirements

- **Operating System:** Windows 10 or later (64-bit)
- **Memory:** 4 GB RAM minimum, 8 GB recommended
- **Disk Space:** 200 MB for installation
- **Network:** TCP/IP connectivity for SSH, Telnet, and Raw connections
- **Serial:** USB-to-serial adapter or built-in COM port for serial connections

---

## Getting Help

- Press **F1** in the application for built-in documentation
- Visit [Support](support.md) for contact information
- Check the [FAQ](faq.md) for common questions
- Review [Troubleshooting](troubleshooting-authentication.md) guides for specific issues
