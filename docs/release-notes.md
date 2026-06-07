---
title: Release Notes
---

# Release Notes

Version history and changelog for RockTerm.

## Table of Contents

- [Version History](#version-history)
- [Changelog Format](#changelog-format)
- [Current Release](#current-release)
- [Previous Releases](#previous-releases)
- [Related Links](#related-links)

---

## Version History

| Version | Date | Highlights |
|---------|------|------------|
| 1.0.0 | 2026 | Initial release |

---

## Changelog Format

Each release includes the following sections:

- **New Features** — Newly added functionality.
- **Improvements** — Enhancements to existing features.
- **Bug Fixes** — Resolved issues.
- **Security** — Security-related changes.
- **Breaking Changes** — Changes that may affect existing workflows (if any).

---

## Current Release

### Version 1.0.0

**Release Date:** 2026

#### New Features

- **SSH Connectivity** — Full SSH-2 support with password, key, certificate, and keyboard-interactive authentication.
- **Jump Host / ProxyJump** — Connect through bastion hosts to reach private networks.
- **HTTP CONNECT Proxy** — SSH through corporate HTTP proxies.
- **SOCKS Proxy** — Dynamic port forwarding (ssh -D equivalent).
- **Port Forwarding** — Local, remote, and dynamic SSH tunnels with management UI and wizard.
- **Telnet** — Classic telnet with IAC option negotiation.
- **Serial Console** — COM port access with auto-detection of 120+ setting combinations.
- **Raw TCP** — Plain socket connections for custom protocols.
- **RDP** — Launch external Remote Desktop client.
- **Local Shell** — Native PowerShell/cmd.exe terminal with ConPTY.
- **Terminal Emulation** — Full xterm-256color with truecolor, DEC modes, and wide character support.
- **MDI Interface** — Multiple document interface with tile, cascade, tabbed, and free-form layouts.
- **Split Panes** — Horizontal and vertical terminal panes with unlimited nesting.
- **Session Manager** — Folder-based session organization with drag-and-drop.
- **Credential Profiles** — Encrypted reusable credential sets.
- **Firewall Profiles** — Named proxy configurations (HTTP CONNECT, SOCKS4, SOCKS5).
- **Batch Session Editing** — Edit multiple sessions simultaneously.
- **Workspace Snapshots** — Save and restore window layouts.
- **Import/Export** — JSON and CSV/TSV session import/export.
- **ZMODEM/YMODEM/XMODEM** — File transfer with auto-detection.
- **SFTP Browser** — Browse and transfer files over SSH.
- **TFTP Server** — Built-in RFC 1350 TFTP server.
- **Expect Scripting** — Pattern-matching automation with 20+ device templates.
- **Python Scripting** — Full Python scripts with terminal API.
- **Trigger System** — 9 action types with regex pattern matching.
- **Command Manager** — Hierarchical command organization with shortcuts.
- **Command Window** — Multi-line command dispatch to terminals.
- **Button Bar** — Customizable command buttons with password support.
- **Send to All** — Broadcast commands to multiple terminals.
- **Script Recording** — Record and replay terminal interactions.
- **Pattern Highlighting** — Regex-based terminal output colorization.
- **Theme System** — 19-color terminal palettes with editor.
- **Custom Keymaps** — Visual keyboard editor with per-session profiles.
- **Network Tools** — Subnet Calculator, Splitter, Wildcard Converter, Route Summarization, CIDR Reference, IPv6 Splitter, EUI-64, Prefix-List Generator.
- **Regex Lab** — Live regex testing with AI assist.
- **Log Extractor** — Syslog, BGP, and OSPF log parsers.
- **AI Assistant** — Optional Anthropic Claude / OpenAI integration for terminal analysis.
- **SSH Key Manager** — Generate, import, and manage SSH key pairs.
- **Host Key Manager** — Trust-On-First-Use host key verification.
- **Password Manager** — AES-encrypted credential vault with master password.
- **Session Logging** — Output logging with rotation and custom templates.
- **Hex View** — Raw byte display mode.
- **Scratchpad** — Quick notes panel.
- **Session Locking** — Prevent accidental disconnection.
- **URL Detection** — Ctrl+click to open URLs.
- **Quick Connect** — Toolbar input with autocomplete.
- **Window Groups** — Organize terminals into named groups.
- **Fullscreen Mode** — F11 toggle.
- **Connection Wizards** — Guided SSH, Serial, and Script creation.
- **Built-in Documentation** — F1 help browser with 25+ sections.

#### Security

- AES-128/Fernet encryption for stored credentials.
- PBKDF2 key derivation (100,000 iterations).
- Trust-On-First-Use host key verification.
- No telemetry, analytics, or cloud connectivity.
- EULA version tracking.

---

## Previous Releases

No previous releases.

---

## Upcoming

Future releases will be documented here as they become available.

---

## Related Links

- [Getting Started](getting-started.md)
- [Support](support.md)
- [FAQ](faq.md)
