---
title: Troubleshooting Performance
---

# Troubleshooting Performance

This guide addresses performance issues including slow rendering, high memory usage, and terminal responsiveness problems.

## Table of Contents

- [Slow Rendering](#slow-rendering)
- [Large Scrollback Buffers](#large-scrollback-buffers)
- [High Memory Usage](#high-memory-usage)
- [Terminal Responsiveness](#terminal-responsiveness)
- [Connection Performance](#connection-performance)
- [UI Performance](#ui-performance)
- [Diagnostic Steps](#diagnostic-steps)
- [Related Links](#related-links)

---

## Slow Rendering

### Symptoms

- Terminal output appears sluggish.
- Scrolling through history is jerky.
- Fast-moving output (e.g., `cat large_file`) causes visual lag.

### Solutions

**Reduce font complexity:**
- Use standard monospace fonts (Consolas, Courier New, Lucida Console).
- Avoid ligature fonts or fonts with complex glyph substitution.
- Ensure the font size is reasonable (9-14pt recommended).

**Disable cursor blinking:**
- Cursor blink animation requires periodic repaints.
- Disable in Preferences (terminal/cursorBlink).

**Reduce visible windows:**
- Each visible terminal consumes rendering resources.
- Use tabbed mode instead of tiled/cascaded when not actively comparing outputs.
- Minimize windows you are not actively using.

**Disable pattern highlighting temporarily:**
- Complex regex patterns are evaluated for every line of output.
- Toggle off: **View > Pattern Highlighting** or **Ctrl+Alt+H**.
- If performance improves, simplify your highlight rules.

**Check DEC modes:**
- Double-width/double-height lines require extra rendering.
- These are rarely used; if you see them frequently, check the sending application.

---

## Large Scrollback Buffers

### Symptoms

- Memory usage grows over time.
- Searching (Ctrl+F) is slow.
- Application becomes sluggish after extended sessions.

### Solutions

**Reduce scrollback lines:**
1. Go to **Edit > Preferences**.
2. Find **Scrollback Lines** setting.
3. Reduce from 10,000 to a lower value (e.g., 5,000 or 2,000).
4. This limits memory per terminal session.

**Clear scrollback periodically:**
- Press **Ctrl+Shift+K** to clear history.
- This frees memory immediately.

**Use session logging instead:**
- If you need a complete record, enable session logging.
- Then reduce scrollback to a smaller working buffer.
- Logs are written to disk and don't consume memory.

**Impact of scrollback size:**

| Scrollback Lines | Approximate Memory per Terminal |
|------------------|---------------------------------|
| 1,000 | ~2 MB |
| 5,000 | ~10 MB |
| 10,000 | ~20 MB |
| 50,000 | ~100 MB |
| 100,000 | ~200 MB |

These are approximate; actual usage depends on line width and content.

---

## High Memory Usage

### Identifying the Cause

1. **Check number of open sessions:**
   - Each terminal session uses memory for its scrollback buffer, screen state, and connection.
   - 20+ open sessions can use significant memory.

2. **Check scrollback per session:**
   - Long-running sessions accumulate scrollback.
   - Sessions receiving constant output (log tails, monitoring) grow fastest.

3. **Check for memory leaks:**
   - If memory grows without new sessions being opened, this may be a bug.
   - Note the current memory usage, wait 30 minutes with stable sessions, and check again.

### Solutions

**Close unused sessions:**
- Sessions you are not actively using still consume resources.
- Disconnect or close sessions you don't need.

**Reduce scrollback globally:**
- Lower the default scrollback in Preferences.
- Consider 2,000-5,000 lines for most use cases.

**Restart RockTerm periodically:**
- For very long sessions (days/weeks), periodic restart clears accumulated memory.
- Save your workspace snapshot first, then restart and restore.

**Disable heavy features on idle sessions:**
- Turn off pattern highlighting for sessions with high output volume.
- Disable hex view when not actively debugging.

---

## Terminal Responsiveness

### Input Lag

**Symptoms:**
- Typed characters appear with a delay.
- Commands feel sluggish to enter.

**Solutions:**

1. **Check network latency (SSH/Telnet):**
   - High network latency causes unavoidable input delay.
   - Run ping to the host from your local machine.
   - Consider using a jump host closer to the target for high-latency links.

2. **Disable unnecessary processing:**
   - Turn off pattern highlighting.
   - Disable triggers with complex regex patterns.
   - Close the AI panel if it's capturing context.

3. **Check system resources:**
   - Open Task Manager and check CPU usage.
   - If RockTerm is using high CPU, reduce open sessions or disable features.

### Output Flood

**Symptoms:**
- Terminal becomes unresponsive during large output (e.g., `cat /dev/urandom`).
- RockTerm freezes or becomes very slow.

**Solutions:**

- Press **Ctrl+C** to stop the command (may take a moment to process).
- Wait for the output to finish rendering.
- Clear the buffer afterward: **Ctrl+L** or **Ctrl+Shift+K**.
- For intentionally large outputs, pipe to `less` or redirect to file:
  ```bash
  cat large_file | less
  cat large_file > output.txt
  ```

### Resize Lag

**Symptoms:**
- Window resizing causes the terminal to flicker or duplicate prompts.
- Brief visual artifacts during resize.

**Solutions:**
- RockTerm uses debounced resize (300ms) to prevent excessive PTY signals.
- Rapid window resizing may briefly show artifacts; they clear automatically.
- If prompt duplication persists after resize, press Enter to get a fresh prompt.

---

## Connection Performance

### SSH Performance

**Slow SSH connections:**

1. **Enable compression:**
   - Helps on high-latency or low-bandwidth links.
   - Configure in the SSH connection dialog.
   - Note: compression uses CPU; may not help on fast local networks.

2. **Check keep-alive:**
   - Enable keep-alive to prevent idle disconnections.
   - Set an appropriate interval (30-60 seconds recommended).

3. **DNS resolution:**
   - If connection takes a long time to establish, DNS lookup may be slow.
   - Try connecting by IP address to bypass DNS.
   - On the server, set `UseDNS no` in sshd_config.

4. **Algorithm negotiation:**
   - If connection establishment is slow, there may be algorithm negotiation delays.
   - The server and client must agree on encryption, MAC, and compression algorithms.

### Serial Performance

**Slow serial output:**

- Serial connections are limited by baud rate.
- At 9600 baud, maximum throughput is ~960 characters/second.
- For faster output, increase the baud rate if the device supports it:
  ```
  line console 0
  speed 115200
  ```
- Use `terminal length 0` to avoid paging delays.

---

## UI Performance

### Panel Layout

**Too many panels open:**
- Each dockable panel consumes resources.
- Close panels you are not actively using:
  - Network Tools
  - SFTP Browser
  - TFTP Server
  - AI Assistant
  - Command Manager
  - Hex View

### Window Layout

**Tiled mode with many windows:**
- Many small tiled windows each maintain their own rendering state.
- Use tabbed mode for better performance with many sessions.
- Tile only the 2-4 windows you are actively comparing.

### Theme Performance

- Light and dark themes have similar performance.
- Custom themes with extreme color values should not cause issues.
- If rendering seems slow, try switching themes to rule out theme-specific issues.

---

## Diagnostic Steps

### Performance Baseline

1. **Count open sessions:**
   - Check Active Connections in the Session Manager.
   - Note the total number of open terminals.

2. **Check system resources:**
   - Task Manager > Details > rockterm.exe
   - Note CPU percentage and Memory usage.

3. **Identify the heaviest session:**
   - Sessions with constant output (log tails, monitoring) use more resources.
   - Disconnect or close these first to see if performance improves.

### Isolation Testing

1. **Close all sessions except one:**
   - If performance is fine with one session, the issue scales with session count.
   - Solution: reduce concurrent sessions or increase scrollback management.

2. **Disable all features:**
   - Turn off: highlighting, triggers, AI panel, hex view, TFTP server.
   - If performance improves, re-enable one at a time to find the cause.

3. **Test with default settings:**
   - Reset Preferences to defaults.
   - If performance improves, a specific setting is the cause.

### When to Report a Bug

Report a performance bug if:
- A single session with default settings is slow.
- Memory grows continuously without new sessions.
- CPU usage is high with no active output.
- The application freezes or becomes completely unresponsive.

Include in your report:
- Number of open sessions.
- Scrollback setting.
- Enabled features.
- System specs (CPU, RAM).
- Steps to reproduce.

---

## Related Links

- [Terminal Features](terminal-features.md)
- [Session Management](session-management.md)
- [Support](support.md)
- [FAQ](faq.md)
