---
title: Frequently Asked Questions
---

# Frequently Asked Questions

Answers to common questions about RockTerm.

## Table of Contents

- [General](#general)
- [Installation and Setup](#installation-and-setup)
- [SSH Connections](#ssh-connections)
- [Serial Connections](#serial-connections)
- [Terminal Usage](#terminal-usage)
- [Session Management](#session-management)
- [File Transfer](#file-transfer)
- [Scripting and Automation](#scripting-and-automation)
- [AI Assistant](#ai-assistant)
- [Security and Privacy](#security-and-privacy)
- [Network Tools](#network-tools)
- [Performance and Troubleshooting](#performance-and-troubleshooting)
- [Licensing and Support](#licensing-and-support)

---

## General

### 1. What is RockTerm?

RockTerm is a professional terminal emulator for Windows designed for network engineers, system administrators, and IT professionals. It supports SSH, Telnet, Serial, Raw TCP, and Local Shell connections with advanced session management, automation, and built-in network tools.

### 2. What operating systems does RockTerm support?

RockTerm runs on Windows 10 and later (64-bit). It is a Windows-native application.

### 3. How does RockTerm compare to PuTTY or SecureCRT?

RockTerm combines the simplicity of PuTTY with professional features similar to SecureCRT: tabbed/MDI windows, session management with folders, expect scripting, trigger automation, built-in network calculators, SFTP browsing, and an AI assistant. It is purpose-built for network and systems professionals.

### 4. Does RockTerm require an internet connection?

No. RockTerm works entirely offline for local shell, serial, and LAN connections. Internet is only needed for SSH/Telnet connections to remote hosts and for the optional AI assistant feature.

### 5. Does RockTerm collect any telemetry or usage data?

No. RockTerm does not collect, transmit, or store any telemetry, analytics, or usage data. See the [Privacy](privacy.md) page for full details.

---

## Installation and Setup

### 6. Where does RockTerm store its configuration?

Configuration is stored in `%APPDATA%\RockTerm\`. This includes sessions, settings, encrypted credentials, themes, and highlight rules.

### 7. Can I run RockTerm as a portable application?

RockTerm stores settings in the user's AppData directory. For portable use, you can copy the configuration directory to another machine after installation.

### 8. How do I reset RockTerm to default settings?

Delete or rename the `%APPDATA%\RockTerm\` directory. RockTerm will recreate it with defaults on next launch, showing the First Run Wizard again.

### 9. How do I change the application theme?

Go to **View > Theme** and select Dark, Light, or System. The System option automatically matches your Windows color scheme.

### 10. Can I change the default terminal font?

Yes. Go to **Edit > Preferences** and change the terminal font. Monospace fonts are recommended (Consolas, Cascadia Code, JetBrains Mono, etc.).

---

## SSH Connections

### 11. What SSH key types does RockTerm support?

RockTerm supports RSA (2048+ bits), ED25519, and ECDSA (P-256, P-384, P-521) key types in PEM and OpenSSH formats.

### 12. How do I use an SSH key for authentication?

In the SSH connection dialog, click **Browse** next to the Key File field and select your private key file. If it has a passphrase, you will be prompted at connection time.

### 13. Where does RockTerm store known host keys?

Host keys are stored in `%USERPROFILE%\.ssh\known_hosts` in standard OpenSSH format, compatible with other SSH clients.

### 14. How do I connect through a bastion/jump host?

Edit your SSH session and enable the **Jump Host** section. Enter the jump host's hostname, port, username, and optionally a key file. See [SSH Jump Hosts](ssh-jump-hosts.md).

### 15. Can I use an HTTP proxy for SSH connections?

Yes. Enable the **HTTP CONNECT Proxy** section in the SSH session editor. Enter the proxy host, port, and optional credentials.

### 16. Does RockTerm support SSH agent forwarding?

Yes. Enable Agent Forwarding in the SSH connection dialog. Your local SSH agent keys will be available on the remote host.

### 17. How do I set up port forwarding?

Go to **Network > Port Forwarding** or use the Port Forwarding Wizard. You can configure local (-L), remote (-R), and dynamic (-D) forwarding. See [Port Forwarding](port-forwarding.md).

### 18. Can RockTerm handle keyboard-interactive authentication (MFA/2FA)?

Yes. RockTerm supports keyboard-interactive authentication and will prompt you for each challenge the server presents.

### 19. How do I generate SSH keys in RockTerm?

Go to **Network > SSH Key Manager** and click Generate. Choose your key type (ED25519 recommended), set a passphrase, and save the key pair.

### 20. My SSH connection keeps dropping. How do I fix it?

Enable keep-alive in **Edit > Preferences**. Set an interval (e.g., 30 seconds) to send periodic messages that prevent idle disconnection.

---

## Serial Connections

### 21. What baud rates does RockTerm support?

RockTerm supports standard baud rates from 300 to 921,600, plus custom baud rate entry for non-standard devices.

### 22. How do I find the correct serial settings for my device?

Use RockTerm's **Auto-Detect** feature, which tests 120+ setting combinations to find what works. Alternatively, check your device's documentation (most network equipment uses 9600 8N1).

### 23. My serial port doesn't appear in the list. What should I do?

Check Device Manager for the port. If it's missing, install the driver for your USB-to-serial adapter (FTDI, Prolific, CH340, or CP210x). See [Troubleshooting: Serial](troubleshooting-serial.md).

### 24. How do I send a break signal for Cisco password recovery?

Press **Ctrl+Break** or go to **Session > Send Break**. This sends the break signal needed to enter ROMMON mode during device boot.

### 25. Can I use RockTerm with a Cisco USB console cable?

Yes. Cisco USB console cables (with FTDI chipset) are automatically detected. Install the FTDI driver if not already present, and the cable will appear as a COM port.

### 26. I'm getting garbled output on my serial connection. How do I fix it?

Garbled output almost always means a baud rate mismatch. Try 9600 (Cisco default) or 115200 (Linux default). Use Auto-Detect if unsure.

---

## Terminal Usage

### 27. How do I split the terminal into multiple panes?

Press **Ctrl+Shift+H** for a horizontal split or **Ctrl+Shift+E** for a vertical split. You can nest splits to any depth.

### 28. Can I copy text with colors from the terminal?

Yes. Use **Edit > Copy with Colors** to copy selected text with ANSI color formatting preserved as HTML. Useful for pasting into documents or emails.

### 29. How do I search in the terminal output?

Press **Ctrl+F** to open the Find dialog. It searches the current display and scrollback history (case-insensitive).

### 30. How do I increase the scrollback buffer?

Go to **Edit > Preferences** and increase the **Scrollback Lines** setting. The default is 10,000 lines. Higher values use more memory.

### 31. Can I use RockTerm in fullscreen mode?

Yes. Press **F11** to toggle fullscreen. The menu bar, toolbar, and status bar are hidden for maximum terminal area.

### 32. How do I tile or cascade my terminal windows?

Go to **Window > Tile** or **Window > Cascade**. You can also use the toolbar buttons. Toggle tabbed mode with **Window > Tabify**.

### 33. What does the Hex View do?

Hex View (**Ctrl+Alt+X**) shows raw bytes in hexadecimal and ASCII format. Useful for debugging protocol issues, escape sequences, or binary data.

### 34. How do I highlight specific patterns in terminal output?

Use the **Highlight** input in the toolbar for quick ad-hoc highlighting. For persistent rules, go to the Highlight Editor (**View > Pattern Highlighting**) to create regex-based color rules.

### 35. Can I click URLs in the terminal?

Yes. Hold **Ctrl** and click a detected URL to open it in your default browser. URLs are highlighted in blue when Ctrl is held.

### 36. How do I change the cursor style?

Right-click in the terminal and select a style from the **Cursor Style** submenu (Block, Underline, or Bar). Or set it in Preferences.

---

## Session Management

### 37. How do I save a connection for quick access?

After connecting, press **Ctrl+Shift+S** or right-click the session in Active Connections and select **Save to Sessions**. Assign a name and folder.

### 38. Can I organize sessions into folders?

Yes. The Session Manager supports folder organization. Click **New Folder** to create folders, and drag-and-drop sessions between them.

### 39. How do I duplicate a session?

Right-click the session and select **Duplicate**, or press **Ctrl+Shift+D** for the active session. All settings are copied.

### 40. Can I import sessions from another terminal emulator?

RockTerm supports CSV/TSV import (**File > Import from CSV/TSV**) with a wizard to map columns. Export your sessions from the other application to CSV first.

### 41. How do I back up my sessions?

Go to **File > Export Sessions** to save all sessions to a JSON file. Also back up `%APPDATA%\RockTerm\` for complete configuration backup.

### 42. What are Credential Profiles?

Credential Profiles store reusable username/password/key combinations encrypted in RockTerm's vault. Assign them to sessions to avoid re-entering credentials. Manage via **Network > Credential Profiles**.

### 43. Can I edit multiple sessions at once?

Yes. Select multiple sessions in the Session Manager, right-click, and choose **Batch Edit**. You can change folder, username, port, credential profile, and more across all selected sessions.

---

## File Transfer

### 44. How do I transfer files using ZMODEM?

To send: **Session > File Transfer > Zmodem Send** (Ctrl+Alt+S) and select files. To receive: **Session > File Transfer > Zmodem Receive** (Ctrl+Alt+R). Incoming ZMODEM transfers are auto-detected.

### 45. How do I browse remote files over SFTP?

Open the SFTP Browser (**View > SFTP Browser**) while connected to an SSH session. It reuses your SSH connection — no additional authentication needed.

### 46. How do I set up the built-in TFTP server?

Open the TFTP Server panel (**View > TFTP Server**). Set the root directory, port, and bind address. Click Start. Use for firmware upgrades and configuration backups on network devices.

### 47. Does RockTerm support XMODEM and YMODEM?

Yes. Both are available under **Session > File Transfer**. XMODEM supports single files; YMODEM supports batch transfers.

---

## Scripting and Automation

### 48. What scripting does RockTerm support?

RockTerm supports expect-style scripts (with commands like expect, send, sleep, goto, if) and Python scripts with terminal API bindings. Access via **Tools > Script Manager** (F5).

### 49. Are there pre-built script templates?

Yes. RockTerm includes 20+ templates for Cisco IOS, Juniper JunOS, Palo Alto, Arista EOS, Linux administration, SSH key deployment, and file transfer scenarios.

### 50. Can I run a script automatically when connecting?

Yes. In the Script Editor, enable the **Run on Connect** option and optionally set a connection filter (regex) to limit which sessions trigger the script.

### 51. What are Triggers?

Triggers are pattern-action rules that fire when specific text appears in terminal output. For example, auto-respond to password prompts, highlight errors, or play a sound when a pattern matches. Manage via **Tools > Trigger Manager** (F6).

### 52. Can I send a command to all open terminals at once?

Yes. Press **Ctrl+Shift+A** or go to **Tools > Send to All** to send the same command to all or selected open terminals. Great for mass configuration changes.

### 53. How do I record a terminal session as a script?

Go to **Tools > Record Script** (Ctrl+Shift+R) to start recording. Interact with the terminal normally. Stop recording to generate a replayable script capturing your send/receive sequences.

### 54. What is the Command Manager?

The Command Manager (**View > Command Manager**) is a hierarchical organizer for commands. Store commands in folders, assign shortcuts, and double-click to send. Supports Send Text, Send Text+Enter, and Run Script actions.

### 55. What is the Button Bar?

The Button Bar (**View > Button Bar**) provides customizable one-click buttons at the bottom of the window. Buttons can send text, send text with Enter, or send an encrypted password. Useful for frequent commands.

---

## AI Assistant

### 56. Is the AI Assistant required?

No. The AI Assistant is completely optional and disabled by default. It requires your own API key from Anthropic or OpenAI.

### 57. What can the AI Assistant do?

It can analyze terminal output, explain errors, suggest commands, troubleshoot issues, and provide context-aware assistance. It sees your recent terminal output and answers questions about it.

### 58. Does the AI Assistant send my data to RockTerm?

No. Queries go directly from RockTerm to your chosen AI provider (Anthropic or OpenAI) using your API key. RockTerm has no servers involved.

### 59. How much terminal context does the AI see?

By default, the last 200 lines of terminal output. You can adjust this in Preferences. You can also select specific text to include as focused context.

### 60. Can the AI Assistant execute commands?

The AI generates suggestions that you can paste to the terminal using the "Paste to Terminal" button. It cannot execute commands directly — you always review and confirm.

---

## Security and Privacy

### 61. How are passwords stored?

Passwords are encrypted using Fernet (AES-128-CBC + HMAC-SHA256) with a key derived from your master password via PBKDF2 (100,000 iterations). The encrypted vault is stored locally.

### 62. What happens if I forget my master password?

Stored credentials cannot be recovered without the master password. You will need to delete the vault file and re-enter your credentials.

### 63. Does RockTerm store my SSH private keys?

No. RockTerm stores only the file path to your private key. The key contents are read at connection time and held in memory only during authentication.

### 64. Is Telnet traffic encrypted?

No. Telnet transmits everything in cleartext, including passwords. Use SSH whenever possible. Only use Telnet on trusted, isolated networks.

### 65. Can I lock a session to prevent accidental disconnection?

Yes. Use **Session > Lock Session** (Ctrl+Alt+L) to prevent the session from being disconnected until you explicitly unlock it.

---

## Network Tools

### 66. What network tools are built into RockTerm?

Subnet Calculator, Subnet Splitter, Wildcard Converter, Route Summarization, CIDR Reference, IPv6 Prefix Splitter, EUI-64 Helper, Prefix-List Generator, Regex Lab, and Log Extractor.

### 67. Can the Prefix-List Generator output for different vendors?

Yes. It generates prefix lists in Cisco IOS, Cisco IOS-XR, and Juniper JunOS formats.

### 68. What is the Regex Lab?

The Regex Lab (**Network > Regex Lab**) provides live regex testing with match highlighting. Type a pattern and test text, and matches are highlighted in real-time. AI assist is available for building complex patterns.

### 69. What is the Log Extractor?

The Log Extractor (**Network > Log Extractor**) parses log files with built-in parsers for syslog, BGP state changes, and OSPF events. AI-assisted analysis is available.

---

## Performance and Troubleshooting

### 70. How many sessions can RockTerm handle simultaneously?

There is no hard limit. Practical limits depend on your system resources. Most users comfortably run 10-30 simultaneous sessions. Each session uses approximately 2-20 MB depending on scrollback.

### 71. RockTerm is using a lot of memory. What can I do?

Reduce scrollback lines in Preferences (default 10,000). Clear scrollback on long-running sessions (Ctrl+Shift+K). Close unused sessions. See [Troubleshooting: Performance](troubleshooting-performance.md).

### 72. The terminal seems slow after running a large command. Why?

Large output floods (thousands of lines) require rendering and scrollback storage. The terminal catches up quickly. For very large outputs, pipe to `less` or redirect to a file to avoid flooding the terminal.

### 73. My window layout got messed up. How do I restore it?

Use **Window > Tile** to reorganize, or restore from a saved workspace snapshot. You can also switch between tabbed and free-form modes.

### 74. How do I report a bug?

See the [Support](support.md) page for bug reporting instructions. Include your RockTerm version, Windows version, steps to reproduce, and any error messages.

---

## Licensing and Support

### 75. How do I get help with RockTerm?

Press **F1** in the application for built-in help. Visit the [Support](support.md) page for contact information. Check this FAQ and the troubleshooting guides.

---

## Related Links

- [Getting Started](getting-started.md)
- [Support](support.md)
- [Troubleshooting: Authentication](troubleshooting-authentication.md)
- [Troubleshooting: Serial](troubleshooting-serial.md)
- [Troubleshooting: Performance](troubleshooting-performance.md)
- [Troubleshooting: Port Forwarding](troubleshooting-port-forwarding.md)
