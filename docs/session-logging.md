---
title: Session Logging
---

# Session Logging

RockTerm can record terminal session output to log files for audit trails, troubleshooting, and documentation.

## Table of Contents

- [Overview](#overview)
- [Starting a Log](#starting-a-log)
- [Log File Format](#log-file-format)
- [Log Rotation](#log-rotation)
- [Custom Log Strings](#custom-log-strings)
- [Log File Locations](#log-file-locations)
- [Log Extractor Tool](#log-extractor-tool)
- [Troubleshooting](#troubleshooting)
- [Related Links](#related-links)

---

## Overview

Session logging captures all terminal output to a text file. Features include:

- ANSI escape sequence stripping (clean, readable text)
- Control character removal (except newlines and tabs)
- Session header with timestamp and connection details
- Log rotation by size and/or daily schedule
- Custom connect/disconnect messages with template variables
- Status bar indicator when logging is active

---

## Starting a Log

### Manual Logging

1. Go to **Session > Log Session**.
2. Choose a file path for the log.
3. Logging begins immediately.
4. The status bar shows a green "● LOG" indicator.

To stop logging, go to **Session > Log Session** again (toggle off).

### Checking Log Status

- The status bar displays "● LOG" when logging is active.
- Use the session's `is_logging()` state to check programmatically.

---

## Log File Format

Log files are plain UTF-8 text with:

### Session Header

Each log begins with a header containing:

```
=== RockTerm Session Log ===
Type: SSH
Host: server.example.com
Port: 22
User: admin
Started: 2026-06-07 14:30:00
===========================

```

### Content

- All visible terminal output is captured.
- ANSI escape sequences (colors, cursor movement) are stripped.
- Control characters (except `\n` and `\t`) are removed.
- The result is clean, readable text suitable for review or searching.

### Disconnect Message

When the session ends, a footer is appended with the disconnect timestamp.

---

## Log Rotation

Configure automatic log rotation to prevent files from growing indefinitely.

### Size-Based Rotation

- Set a maximum log file size (in KB).
- When the limit is reached, the current log is archived with a timestamp.
- A new log file is started.

### Daily Rotation

- Enable daily rotation to start a new log file each day.
- The previous day's log is archived with a date stamp.
- Useful for compliance and audit requirements.

### Configuration

Set log rotation via the session or Preferences:

| Setting | Description |
|---------|-------------|
| Max Size (KB) | Rotate when file reaches this size |
| Daily Rotation | Start a new file each day |

---

## Custom Log Strings

Customize the messages written at connection and disconnection events.

### Template Variables

| Variable | Replaced With |
|----------|---------------|
| `{type}` | Connection type (SSH, Telnet, Serial, etc.) |
| `{host}` | Remote hostname or IP |
| `{port}` | Port number |
| `{user}` | Username |
| `{date}` | Current date |
| `{time}` | Current time |
| `{datetime}` | Full date and time |

### Examples

**Custom connect message:**
```
--- Session started: {type} to {user}@{host}:{port} at {datetime} ---
```

**Custom disconnect message:**
```
--- Session ended at {datetime} ---
```

---

## Log File Locations

### Default Location

Log files are saved to the location you specify when starting a log. There is no mandatory default directory.

### Recommended Organization

```
C:\Users\<you>\Documents\RockTerm Logs\
├── 2026-06-07_server1.log
├── 2026-06-07_switch1.log
├── 2026-06-08_server1.log
└── ...
```

### Configuration Directory

RockTerm's application data is stored at:

```
%APPDATA%\RockTerm\
```

This contains sessions, settings, and encrypted credentials — not session logs (which you control).

---

## Log Extractor Tool

RockTerm includes a built-in Log Extractor tool (**Network > Log Extractor**) for analyzing log files:

### Built-in Parsers

| Parser | Purpose |
|--------|---------|
| Syslog | Extract timestamps, severity, facility, message |
| BGP | Parse BGP neighbor state changes and events |
| OSPF | Extract OSPF adjacency and routing events |

### Features

- Load log files and apply parsers.
- Filter by severity, timestamp range, or keyword.
- AI-assisted analysis (with AI feature enabled).
- Export parsed results.

---

## Troubleshooting

### Log File Empty

- Verify logging is active (check status bar for "● LOG" indicator).
- Ensure the log file path is writable.
- Check disk space availability.
- Some output may be buffered; wait for more data or disconnect.

### Log Contains Escape Sequences

- This should not happen (ANSI stripping is automatic).
- If you see escape codes, the output may use non-standard sequences.
- Report this as a bug with a sample of the affected output.

### Log File Locked

- Only one process should write to a log file at a time.
- Ensure no other application has the file open exclusively.
- If the file is opened in a text editor, use one that doesn't lock files (Notepad++, VS Code).

### Large Log Files

- Enable log rotation to prevent unbounded growth.
- Use daily rotation for long-running sessions.
- Archive old logs to compressed storage.

### Permission Denied

- Verify write access to the chosen directory.
- Avoid writing to system directories (Program Files, Windows, etc.).
- Use your Documents folder or a dedicated logs directory.

---

## Related Links

- [Terminal Features](terminal-features.md)
- [Session Management](session-management.md)
- [Import & Export](import-export.md)
- [Troubleshooting: Performance](troubleshooting-performance.md)
