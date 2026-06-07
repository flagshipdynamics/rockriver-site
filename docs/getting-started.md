---
title: Getting Started with RockTerm
---

# Getting Started with RockTerm

This guide covers installation, first launch, and making your first connection with RockTerm.

## Table of Contents

- [Installation](#installation)
- [First Launch](#first-launch)
- [Creating Your First Connection](#creating-your-first-connection)
- [Quick Connect](#quick-connect)
- [Basic Terminal Usage](#basic-terminal-usage)
- [Interface Overview](#interface-overview)
- [Next Steps](#next-steps)

---

## Installation

### Download

Download the latest RockTerm installer from the official website.

### System Requirements

- Windows 10 or later (64-bit)
- 4 GB RAM minimum
- 200 MB available disk space
- Visual C++ Redistributable (bundled with installer)

### Install Steps

1. Run the RockTerm installer executable.
2. Follow the installation wizard prompts.
3. Choose your installation directory (default: `C:\Program Files\RockTerm`).
4. Complete the installation.
5. Launch RockTerm from the Start Menu or desktop shortcut.

### Silent Installation

For enterprise deployment:

```
RockTermSetup.exe /S /D=C:\Program Files\RockTerm
```

---

## First Launch

When you launch RockTerm for the first time, the **First Run Wizard** guides you through initial setup:

1. **Welcome** — Overview of RockTerm capabilities.
2. **End-User License Agreement** — Review and accept the EULA (version 1.2).
3. **Default Settings** — Configure initial preferences (theme, shell, etc.).

After completing the wizard, RockTerm opens with the main interface ready for connections.

### Choosing a Theme

RockTerm supports three theme modes:

| Theme | Description |
|-------|-------------|
| Dark | Dark background with light text (default) |
| Light | Light background with dark text |
| System | Automatically matches your Windows color scheme |

Change the theme at any time via **View > Theme** or in **Edit > Preferences**.

---

## Creating Your First Connection

### SSH Connection

1. Click **Session > New SSH** or press **Ctrl+T**.
2. Enter the hostname or IP address.
3. Enter the port (default: 22).
4. Enter your username.
5. Choose an authentication method:
   - **Password** — Enter your password directly.
   - **Key File** — Browse to your private key (RSA, ED25519, or ECDSA).
   - **Certificate** — Select a certificate file.
6. Click **Connect**.

### Telnet Connection

1. Click **Session > New Telnet**.
2. Enter the hostname or IP address.
3. Enter the port (default: 23).
4. Click **Connect**.

### Serial Connection

1. Click **Session > New Serial**.
2. Select the COM port from the dropdown (auto-detected).
3. Configure baud rate (default: 9600 for most network devices).
4. Set data bits, parity, stop bits, and flow control as needed.
5. Click **Connect**.

### Local Shell

1. Click **Session > New Local Shell**.
2. A new terminal opens with your default system shell (PowerShell or cmd.exe).

---

## Quick Connect

Quick Connect provides the fastest way to establish a connection without navigating menus.

### Using the Toolbar

The Quick Connect input is located in the main toolbar. Type a connection string and press **Enter**:

```
user@hostname:port
```

Examples:

```
admin@192.168.1.1
root@server.example.com:2222
[2001:db8::1]:22
```

The autocompleter suggests matches from saved sessions and recent connections.

### Using the Dialog

Press **Ctrl+Q** to open the Quick Connect dialog with:

- Recent connection history
- Saved session bookmarks
- Protocol selection

---

## Basic Terminal Usage

### Typing and Sending Commands

Type commands directly into the terminal. Press **Enter** to execute. The terminal emulates xterm-256color, so full color output and interactive applications (vim, htop, top) work correctly.

### Copy and Paste

| Action | Shortcut |
|--------|----------|
| Copy | Ctrl+Shift+C or Ctrl+Insert |
| Paste | Ctrl+Shift+V or Shift+Insert |
| Copy with Colors | Edit > Copy with Colors |

**Tip:** Enable **Copy on Select** in Preferences to automatically copy highlighted text.

### Scrollback

- Scroll up with the mouse wheel to view history.
- Default scrollback buffer is 10,000 lines.
- Press **Ctrl+Shift+K** to clear scrollback history.

### Find Text

Press **Ctrl+F** to search within the terminal display and scrollback buffer. Searches are case-insensitive.

### Zoom

| Action | Shortcut |
|--------|----------|
| Zoom In | Ctrl+= |
| Zoom Out | Ctrl+- |
| Reset Zoom | Ctrl+0 |

---

## Interface Overview

### Menu Bar

| Menu | Key Functions |
|------|---------------|
| File | New Window, Import/Export Sessions, Exit |
| Session | New connections, Reconnect, Disconnect, Logging, File Transfer |
| Edit | Copy, Paste, Find, Clear, Preferences |
| View | Panels, Zoom, Theme, Fullscreen, Window Groups |
| Network | Subnet tools, Port Forwarding, Key Manager, Credentials |
| Tools | Snippets, Scripts, Triggers, Keymaps, AI Assist |
| Window | Tile, Cascade, Tabify, Tab navigation |
| Help | Documentation, About |

### Toolbar

The toolbar provides one-click access to:

- Connection type buttons (SSH, Telnet, Serial, Raw, RDP)
- Quick Connect input with autocomplete
- Reconnect and Disconnect buttons
- Window management (New, Tile, Cascade, Tabify)
- Quick Connect dialog, Snippets, Send to All, Script Manager
- Ad-hoc highlight input

### Session Manager Panel

Toggle with **Ctrl+B**. The left sidebar displays:

- **Saved Sessions** — Organized in folders with drag-and-drop support.
- **Active Connections** — Live list of open terminals with status indicators.

### Status Bar

The bottom status bar shows:

- Connection status and type (color-coded)
- Host information
- Connection duration
- Logging indicator
- Character encoding
- Terminal dimensions (columns x rows)

---

## Next Steps

- [Session Management](session-management.md) — Organize and manage your connections.
- [SSH Connections](ssh-connections.md) — Detailed SSH configuration options.
- [Terminal Features](terminal-features.md) — Split panes, tabs, scripting, and more.
- [AI Assistant](ai-assistant.md) — Get AI-powered terminal assistance.

---

## Related Links

- [SSH Connections](ssh-connections.md)
- [Telnet Connections](telnet-connections.md)
- [Serial Connections](serial-connections.md)
- [Session Management](session-management.md)
- [FAQ](faq.md)
