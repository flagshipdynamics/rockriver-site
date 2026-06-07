---
title: Local Shell
---

# Local Shell

RockTerm can launch local terminal sessions using PowerShell or Command Prompt without connecting to a remote host.

## Table of Contents

- [Overview](#overview)
- [Launching a Local Shell](#launching-a-local-shell)
- [Shell Selection](#shell-selection)
- [Terminal Integration](#terminal-integration)
- [Use Cases](#use-cases)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Related Links](#related-links)

---

## Overview

Local shell sessions provide a full terminal emulator experience for running commands on your local Windows machine. RockTerm uses Windows ConPTY (Console Pseudo Terminal) for native terminal emulation with full xterm-256color support.

Features available in local shell sessions:

- Full color support (256-color and truecolor)
- Interactive application support (PowerShell, cmd, Python REPL, etc.)
- Copy/paste with color preservation
- Scrollback history
- Find in terminal
- Session logging
- Script recording
- Pattern highlighting
- All terminal features (zoom, split panes, etc.)

---

## Launching a Local Shell

### From the Menu

Go to **Session > New Local Shell**.

### From the Command Line

Launch RockTerm with no connection arguments to start with a local shell, or use:

```
rockterm.exe --local
```

### From the Session Manager

Save a local shell configuration as a session for quick access from the Session Manager panel.

---

## Shell Selection

### Default Shell

RockTerm uses your system's default shell. On Windows, this is typically PowerShell.

### Changing the Shell

1. Go to **Edit > Preferences**.
2. Under the Terminal section, find the Shell setting.
3. Select or enter the shell path:
   - `powershell.exe` — Windows PowerShell
   - `pwsh.exe` — PowerShell 7+ (if installed)
   - `cmd.exe` — Command Prompt
   - Custom shell path

### Environment Variables

RockTerm sets these environment variables for local shell sessions:

| Variable | Value |
|----------|-------|
| TERM | xterm-256color |
| COLORTERM | truecolor |

This enables full color support in applications that check these variables (ls, grep, vim, etc. via WSL or Git Bash).

---

## Terminal Integration

Local shell sessions have access to all RockTerm terminal features:

### Scripting

Record and replay local shell commands:

1. Start recording (**Tools > Record Script** or **Ctrl+Shift+R**).
2. Execute your commands.
3. Stop recording.
4. The recorded script can be replayed later.

### Send to All

Use **Tools > Send to All** (**Ctrl+Shift+A**) to send the same command to multiple local shells simultaneously.

### Command Snippets

Access your command snippets library (**Ctrl+M**) to quickly insert frequently used commands.

### Pattern Highlighting

Apply highlighting rules to colorize command output patterns (IP addresses, errors, warnings, etc.).

---

## Use Cases

### System Administration

Run local administrative tasks alongside remote sessions:

- File management
- Service monitoring
- Log analysis
- Script development and testing

### Development Workflows

- Git operations
- Build commands
- Package management (npm, pip, cargo)
- Docker commands

### Side-by-Side Remote and Local

Split panes or tile windows to work with both local and remote terminals simultaneously:

1. Open an SSH session to a server.
2. Open a local shell.
3. Tile windows (**Window > Tile**) or split panes (**Ctrl+Shift+H**).
4. Compare or transfer information between local and remote.

---

## Configuration

### Preferences

| Setting | Description | Default |
|---------|-------------|---------|
| Shell | Path to shell executable | powershell.exe |
| Font | Terminal font family and size | Consolas 11pt |
| Scrollback | Lines of history to retain | 10,000 |
| Cursor Style | Block, underline, or bar | Block |
| Cursor Blink | Animate cursor | Enabled |

### Keep-Alive

Keep-alive is not applicable to local shell sessions (no network connection to maintain).

---

## Troubleshooting

### Shell Not Starting

- Verify the shell path is correct in Preferences.
- Ensure the shell executable is in your system PATH.
- For PowerShell 7+, confirm `pwsh.exe` is installed.
- Try `cmd.exe` as a fallback.

### Colors Not Working

- Verify your shell supports ANSI colors.
- For PowerShell, enable virtual terminal processing:
  ```powershell
  Set-PSReadlineOption -Colors @{Command = 'Green'}
  ```
- Check that TERM is set to `xterm-256color`.

### Slow Performance

- Large scrollback buffers consume memory. Reduce scrollback lines if needed.
- Disable cursor blinking if rendering is slow.
- Close unused split panes.

### Terminal Size Issues

- The terminal reports size correctly to the shell via ConPTY.
- If applications display incorrectly, try resizing the window.
- Check that the application respects the reported terminal dimensions.

---

## Related Links

- [Terminal Features](terminal-features.md)
- [Getting Started](getting-started.md)
- [Session Management](session-management.md)
