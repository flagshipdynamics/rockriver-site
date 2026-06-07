---
title: Terminal Features
---

# Terminal Features

RockTerm provides a full-featured terminal emulator with advanced capabilities for power users.

## Table of Contents

- [Terminal Emulation](#terminal-emulation)
- [Tabs and Windows](#tabs-and-windows)
- [Split Panes](#split-panes)
- [Copy and Paste](#copy-and-paste)
- [Find](#find)
- [Scrollback](#scrollback)
- [Zoom](#zoom)
- [Fullscreen](#fullscreen)
- [Hex View](#hex-view)
- [Pattern Highlighting](#pattern-highlighting)
- [Themes and Colors](#themes-and-colors)
- [Scripting and Automation](#scripting-and-automation)
- [Triggers](#triggers)
- [Command Snippets](#command-snippets)
- [Command Manager](#command-manager)
- [Command Window](#command-window)
- [Button Bar](#button-bar)
- [Send to All Terminals](#send-to-all-terminals)
- [File Transfer](#file-transfer)
- [Network Tools](#network-tools)
- [Custom Keymaps](#custom-keymaps)
- [Session Locking](#session-locking)
- [Scratchpad](#scratchpad)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Related Links](#related-links)

---

## Terminal Emulation

RockTerm emulates an **xterm-256color** terminal with the following capabilities:

- Full VT100/ANSI escape sequence support
- 256-color palette with 24-bit truecolor (16 million colors)
- Bold, underline, italic, and inverse text attributes
- DEC double-width and double-height line modes
- Alternate screen buffer (for vim, htop, less, etc.)
- Mouse tracking (for interactive TUI applications)
- Host-based printing (MC5/MC4 sequences)
- Wide character support (CJK characters)

### Cursor Styles

Three cursor styles are available via the right-click context menu or Preferences:

| Style | Description |
|-------|-------------|
| Block | Filled rectangle (default) |
| Underline | Horizontal line at bottom of cell |
| Bar | Thin vertical line at left of cell |

Cursor blinking can be enabled or disabled in Preferences.

---

## Tabs and Windows

### MDI Interface

RockTerm uses a Multiple Document Interface (MDI) with several layout modes:

| Mode | Description | Shortcut |
|------|-------------|----------|
| Tabbed | Tabs across the top (default) | Window > Tabify |
| Tiled | Windows arranged in a grid | Window > Tile |
| Cascaded | Overlapping windows | Window > Cascade |
| Free-form | Manually positioned windows | Drag title bars |

### Tab Navigation

| Action | Shortcut |
|--------|----------|
| Next Tab | Ctrl+Tab |
| Previous Tab | Ctrl+Shift+Tab |
| Close Tab | Ctrl+W |
| New Window | Ctrl+Shift+N |

### Window Groups

Organize terminals into named groups:

1. Go to **View > Window Groups > New Group**.
2. Name the group.
3. Assign windows via **View > Window Groups > Assign Active Window**.
4. Switch between groups to filter the view.

### Color-Coded Tabs

Tabs are color-coded by connection type:

| Type | Color |
|------|-------|
| SSH | Green |
| Telnet | Cyan |
| Serial | Magenta |
| Raw TCP | Orange |
| Local Shell | Blue |
| RDP | Blue |

---

## Split Panes

Divide a terminal window into multiple panes:

| Action | Shortcut |
|--------|----------|
| Split Horizontal | Ctrl+Shift+H |
| Split Vertical | Ctrl+Shift+E |

Panes can be nested to any depth. The focused pane has a blue border; unfocused panes have a grey border.

---

## Copy and Paste

### Selection Modes

| Mode | How to Select |
|------|---------------|
| Line selection | Click and drag |
| Block (rectangular) selection | Alt + Click and drag |
| Word selection | Double-click |
| Select all | Right-click > Select All |

### Copy Operations

| Action | Shortcut |
|--------|----------|
| Copy | Ctrl+Shift+C or Ctrl+Insert |
| Copy with Colors | Edit > Copy with Colors |
| Paste | Ctrl+Shift+V or Shift+Insert |

**Copy with Colors** preserves ANSI formatting as HTML, allowing you to paste colored terminal output into documents and emails.

### Auto-Copy Options

- **Copy on Select** — Automatically copy text to clipboard when selected (enable in Preferences).
- **Paste on Right-Click** — Right-click pastes clipboard content (enable in Preferences).
- **Paste on Middle-Click** — Middle mouse button pastes clipboard (enable in Preferences).

---

## Find

Press **Ctrl+F** to search within the terminal display and scrollback history.

- Searches are case-insensitive.
- Matches are highlighted and scrolled into view.
- Use **Find Next** to advance to subsequent matches.

---

## Scrollback

### Configuration

- Default scrollback: 10,000 lines.
- Configurable in **Edit > Preferences** (terminal/scrollbackLines).

### Navigation

- **Mouse wheel** — Scroll 3 lines per notch.
- **Page Up / Page Down** — Scroll by page.
- **Ctrl+L** — Clear current screen.
- **Ctrl+Shift+K** — Clear entire scrollback history.

---

## Zoom

| Action | Shortcut |
|--------|----------|
| Zoom In | Ctrl+= |
| Zoom Out | Ctrl+- |
| Reset Zoom | Ctrl+0 |

Zoom adjusts the terminal font size. The terminal dimensions (columns x rows) change accordingly and are reported to the remote shell.

---

## Fullscreen

Press **F11** to toggle fullscreen mode. The menu bar, toolbar, and status bar are hidden for maximum terminal area.

---

## Hex View

Toggle hex view via **View > Hex View** or **Ctrl+Alt+X**.

Hex view displays raw bytes in both hexadecimal and ASCII format, useful for:

- Debugging protocol issues
- Analyzing binary data
- Inspecting escape sequences
- Troubleshooting character encoding

---

## Pattern Highlighting

Apply regex-based color rules to terminal output for visual emphasis.

### Enabling Highlighting

- Toggle via **View > Pattern Highlighting** or **Ctrl+Alt+H**.
- Select rule files per session in the session editor.

### Ad-Hoc Highlighting

Use the **Highlight** input in the toolbar to quickly highlight a keyword in real-time. Clear the field to remove the highlight.

### Highlight Rules

Manage rule files via **Tools > Highlight Editor**:

- Create custom rule files with multiple rules.
- Each rule specifies: pattern (regex), foreground color, background color, bold, underline.
- Rules are applied in priority order (first match wins).
- Bundled templates include networking-focused rules.

### Bundled Rule Files

Pre-built highlighting templates for common scenarios:

- Network device output (interfaces, IP addresses, errors)
- Log file analysis (severity levels, timestamps)
- System output (warnings, errors, status codes)

Highlighting is automatically disabled when the alternate screen is active (vim, less, htop) to avoid interfering with application rendering.

---

## Themes and Colors

### Application Themes

Three modes: **Dark** (default), **Light**, and **System** (auto-detect).

Change via **View > Theme** menu.

### Terminal Color Schemes

RockTerm supports full terminal color scheme customization:

- 16 ANSI colors (with bright variants)
- Background, foreground, and cursor colors
- JSON-based theme files

### Theme Editor

Access via **Tools > Theme Editor**:

- Two-pane interface with theme list and color palette.
- Live preview showing how colors appear with typical terminal output.
- Create, duplicate, and delete themes.
- Restore bundled themes.

---

## Scripting and Automation

### Expect Scripts

RockTerm includes a powerful expect-style scripting engine for automating terminal interactions.

**Script Commands:**

| Command | Description |
|---------|-------------|
| `expect` | Wait for a pattern (regex) in output |
| `send` | Send text without newline |
| `sendln` | Send text with newline |
| `sleep` | Pause execution (seconds) |
| `log` | Log a message |
| `prompt` | Ask user for input |
| `set` | Set a variable |
| `label` | Define a jump target |
| `goto` | Jump to a label |
| `if` | Conditional execution |
| `clear` | Clear terminal |

**Features:**

- Variable substitution (`${VAR}`)
- Capture group access (`${MATCH0}`, `${MATCH1}`)
- Timeout handling with configurable actions (fail, continue, goto)
- Run-on-connect option for automatic execution
- Connection filter (apply only to specific sessions)

### Built-in Templates

20+ pre-built script templates for:

- Cisco IOS configuration
- Juniper JunOS management
- Palo Alto Networks devices
- Arista EOS
- Linux system administration
- SSH key deployment
- File transfers
- Multi-device configuration

### Python Scripts

Execute Python scripts with terminal API bindings for complex automation scenarios.

### Script Manager

Access via **Tools > Script Manager** or **F5**:

- Create, edit, delete, and organize scripts.
- Import and export scripts.
- Run scripts with variable prompts.
- Track execution progress.

### Script Recording

Record terminal interactions as replayable scripts:

1. Start recording: **Tools > Record Script** or **Ctrl+Shift+R**.
2. Interact with the terminal normally.
3. Stop recording.
4. The recorded script captures send/receive sequences with timing.

---

## Triggers

Triggers automatically execute actions when patterns appear in terminal output.

### Trigger Actions

| Action | Description |
|--------|-------------|
| Send Text | Send text to terminal (no newline) |
| Send Line | Send text with newline |
| Highlight | Apply color highlighting |
| Notify | Show desktop notification |
| Play Sound | Play an audio alert |
| Log | Write to log file |
| Run Script | Execute a script |
| Disconnect | Close the connection |
| Reconnect | Reconnect the session |

### Configuration

Access via **Tools > Trigger Manager** or **F6**:

- Define regex patterns with capture groups.
- Set action type and value (with capture group substitution).
- Configure delay before execution.
- Enable one-shot mode (fire only once per session).
- Case-insensitive matching option.

### Preset Triggers

Built-in presets for common scenarios:

- Password prompt auto-response
- Yes/No confirmation handling
- Connection refused alerts
- Error pattern highlighting
- IP address highlighting

---

## Command Snippets

Quick-access library of frequently used commands.

Access via **Tools > Command Snippets** or **Ctrl+M**:

- Organize snippets by category.
- Assign keyboard shortcuts (Ctrl+Shift+1 through 9).
- Double-click to send.
- Context-aware suggestions.

---

## Command Manager

A hierarchical command organizer panel (**View > Command Manager**):

- Folder-based organization.
- Three action types: Send Text, Send Text + Enter, Run Script.
- Custom keyboard shortcuts per command.
- Filter/search commands.
- Double-click to execute.

---

## Command Window

A multi-line command composition panel (**View > Command Window** or **Ctrl+Alt+C**):

- Multi-line command input.
- Send to: Active Terminal, All Terminals, or Selected Terminals.
- Configurable delay between lines (0-5000ms).
- Command history (up to 100 entries).
- Append Enter option.

---

## Button Bar

Customizable command buttons at the bottom of the window (**View > Button Bar**):

- Three action types: Send Text, Send Password, Send Text+Enter.
- Custom button colors.
- Encrypted password storage for password buttons.
- Flow layout (wraps to next row).
- Right-click to edit or delete.

---

## Send to All Terminals

Send the same command to multiple terminals simultaneously.

Access via **Tools > Send to All** or **Ctrl+Shift+A**:

- Send to all open terminals.
- Send to selected terminals only.
- Useful for mass configuration changes across devices.

---

## File Transfer

### ZMODEM

- **Send:** Session > File Transfer > Zmodem Send (**Ctrl+Alt+S**)
- **Receive:** Session > File Transfer > Zmodem Receive (**Ctrl+Alt+R**)
- Auto-detection of incoming ZMODEM transfers.
- Configurable download directory.

### YMODEM

- **Send:** Session > File Transfer > Ymodem Send
- **Receive:** Session > File Transfer > Ymodem Receive
- Batch file support.

### XMODEM

- **Send:** Session > File Transfer > Xmodem Send
- **Receive:** Session > File Transfer > Xmodem Receive
- Single file transfer.

### SFTP Browser

Toggle via **View > SFTP Browser**:

- Browse remote filesystem over active SSH connection.
- Download and upload files with progress tracking.
- Create directories, delete files.
- No additional authentication required (reuses SSH transport).

### TFTP Server

Toggle via **View > TFTP Server**:

- Built-in TFTP server (RFC 1350 compliant).
- Configurable root directory, port, and bind address.
- Read-only mode option.
- Active transfer monitoring.
- Maximum 10 concurrent transfers.
- Event logging with error diagnostics.

### Send ASCII File

Send a text file's contents directly to the terminal via **Session > Send ASCII File**.

---

## Network Tools

Access via **Network** menu or **View > Network Tools** panel:

| Tool | Description |
|------|-------------|
| Subnet Calculator | CIDR analysis, network/broadcast addresses |
| Subnet Splitter | Divide networks into equal sub-subnets |
| Wildcard Converter | Subnet mask ↔ wildcard mask conversion |
| Route Summarization | Compute summary routes from network lists |
| CIDR Reference | Quick-reference table for /0 through /32 |
| IPv6 Prefix Splitter | Split IPv6 prefixes into allocations |
| EUI-64 Helper | MAC to Modified EUI-64 conversion |
| Prefix-List Generator | Generate IOS, IOS-XR, JunOS prefix lists |
| Regex Lab | Live regex testing with AI assist |
| Log Extractor | Built-in parsers for syslog, BGP, OSPF |

---

## Custom Keymaps

Remap keyboard shortcuts for specific workflows.

Access via **Tools > Key Map Manager**:

- Visual keyboard showing mapped keys (green = mapped).
- Four action types: Send String, Send String (no CR), Run Script, Menu Action.
- Per-session keymap profiles.
- Import/export keymaps.
- Key capture input for easy binding.

---

## Session Locking

Lock a session to prevent accidental disconnection:

- **Lock:** Session > Lock Session (**Ctrl+Alt+L**)
- **Unlock:** Session > Unlock Session

Locked sessions display a lock indicator and cannot be disconnected without first unlocking.

---

## Scratchpad

A temporary notes panel (**View > Scratchpad**) for jotting down information while working in terminals.

---

## Keyboard Shortcuts

### Connections

| Action | Shortcut |
|--------|----------|
| New SSH | Ctrl+T |
| New Telnet | Alt+T |
| New Serial | Alt+S |
| Quick Connect | Ctrl+Q |
| Reconnect | Ctrl+R |
| Disconnect | Ctrl+Shift+R |
| Send Break | Ctrl+Break |
| Duplicate Session | Ctrl+Shift+D |
| Save Session | Ctrl+Shift+S |

### Terminal

| Action | Shortcut |
|--------|----------|
| Copy | Ctrl+Shift+C |
| Paste | Ctrl+Shift+V |
| Find | Ctrl+F |
| Clear Terminal | Ctrl+L |
| Clear Scrollback | Ctrl+Shift+K |
| Zoom In | Ctrl+= |
| Zoom Out | Ctrl+- |
| Reset Zoom | Ctrl+0 |
| Fullscreen | F11 |

### Windows and Panes

| Action | Shortcut |
|--------|----------|
| Next Tab | Ctrl+Tab |
| Previous Tab | Ctrl+Shift+Tab |
| Close Tab | Ctrl+W |
| New Window | Ctrl+Shift+N |
| Split Horizontal | Ctrl+Shift+H |
| Split Vertical | Ctrl+Shift+E |

### Tools

| Action | Shortcut |
|--------|----------|
| Session Manager | Ctrl+B |
| Command Snippets | Ctrl+M |
| Send to All | Ctrl+Shift+A |
| Script Manager | F5 |
| Trigger Manager | F6 |
| AI Assist | Ctrl+Shift+I |
| Command Window | Ctrl+Alt+C |
| Pattern Highlighting | Ctrl+Alt+H |
| Hex View | Ctrl+Alt+X |
| Lock Session | Ctrl+Alt+L |
| Preferences | Ctrl+, |
| Help | F1 |

### File Transfer

| Action | Shortcut |
|--------|----------|
| Zmodem Send | Ctrl+Alt+S |
| Zmodem Receive | Ctrl+Alt+R |

---

## Related Links

- [AI Assistant](ai-assistant.md)
- [Session Logging](session-logging.md)
- [Session Management](session-management.md)
- [Getting Started](getting-started.md)
