---
title: Troubleshooting Serial Connections
---

# Troubleshooting Serial Connections

This guide covers common issues when using serial console connections in RockTerm.

## Table of Contents

- [COM Port Issues](#com-port-issues)
- [USB Adapter Issues](#usb-adapter-issues)
- [Connection Problems](#connection-problems)
- [Garbled Output](#garbled-output)
- [Flow Control Issues](#flow-control-issues)
- [Permission Issues](#permission-issues)
- [Platform-Specific Issues](#platform-specific-issues)
- [Cable and Hardware Issues](#cable-and-hardware-issues)
- [Related Links](#related-links)

---

## COM Port Issues

### Port Not Listed in RockTerm

**Symptoms:**
- The serial port dropdown shows no ports or doesn't show your adapter.

**Solutions:**

1. **Check Device Manager:**
   - Open Device Manager (Win+X > Device Manager).
   - Expand "Ports (COM & LPT)".
   - Verify your adapter appears with a COM port number.

2. **Refresh the port list:**
   - Close and reopen the Serial Connection dialog.
   - RockTerm re-scans for ports when the dialog opens.

3. **Driver installation:**
   - If the adapter shows under "Other devices" with a warning icon, the driver is missing.
   - Install the correct driver for your adapter chipset (FTDI, Prolific, CH340, CP210x).

4. **Try a different USB port:**
   - Some USB ports may have issues. Try a different physical port.
   - Avoid USB hubs if possible; connect directly.

### Port Number Changed

USB adapters may be assigned different COM port numbers when plugged into different USB ports.

**Solution:**
- Use Device Manager to assign a consistent COM port:
  1. Right-click the adapter in Device Manager > Properties.
  2. Port Settings > Advanced.
  3. Set a fixed COM port number.

### Port Shows But Won't Open

**Symptoms:**
- Port is listed but connection fails with "access denied" or "port busy."

**Solutions:**
- Close any other application that might have the port open (PuTTY, HyperTerminal, Arduino IDE, etc.).
- Check Task Manager for background processes using the port.
- Unplug and replug the USB adapter.
- Restart your computer if the port remains locked.

---

## USB Adapter Issues

### FTDI Adapters

- **Driver:** Download from ftdichip.com.
- **Common issue:** Counterfeit FTDI chips may be bricked by official drivers.
- **Solution:** Use the driver version that works; avoid updates if using unofficial chips.

### Prolific PL2303 Adapters

- **Driver:** Download from prolific.com.tw.
- **Common issue:** Newer drivers (3.8+) reject older PL2303 revisions (HX Rev A).
- **Solution:** Use driver version 3.3.2.102 for older chips, or purchase a genuine adapter.
- **Symptoms:** "A device attached to the system is not functioning" in Device Manager.

### CH340/CH341 Adapters

- **Driver:** Download from the manufacturer (wch-ic.com).
- **Common issue:** Driver may not auto-install on newer Windows versions.
- **Solution:** Manually install the CH341SER driver package.

### Silicon Labs CP210x Adapters

- **Driver:** Download from silabs.com.
- **Common issue:** Multiple versions available; ensure you get the VCP (Virtual COM Port) driver.
- **Solution:** Download "CP210x Universal Windows Driver" from Silicon Labs.

### General USB Issues

- Try different USB cables (some are charge-only with no data lines).
- Avoid long USB extension cables.
- Unplug other USB devices to rule out power issues.
- Try both USB 2.0 and USB 3.0 ports.

---

## Connection Problems

### No Response After Connecting

**Symptoms:**
- Connected successfully (no error) but no output appears.
- Terminal is blank.

**Solutions:**

1. **Press Enter several times:**
   - Many devices don't produce output until they receive input.
   - Press Enter, Space, or Ctrl+C.

2. **Check if device is powered:**
   - The device connected via serial must be powered on.
   - Some devices have separate power from the console port.

3. **Verify correct port:**
   - If multiple adapters are connected, ensure you selected the right COM port.
   - Unplug and replug to identify which port disappears from Device Manager.

4. **Check cable connections:**
   - Console cables can be loose. Verify firm connection at both ends.
   - Some RJ45 console ports require specific cable types.

5. **Try Send Break:**
   - Press Ctrl+Break or Session > Send Break.
   - Some devices require a break signal to respond.

### Immediate Disconnection

**Symptoms:**
- Connection opens then immediately closes.

**Solutions:**
- The port may have been released by the driver.
- Check USB adapter connection stability.
- Verify no other software is fighting for the port.
- Check the adapter's Windows event log for driver errors.

---

## Garbled Output

### Random Characters or Symbols

**Cause:** Baud rate mismatch between RockTerm and the device.

**Solutions:**

1. **Try common baud rates:**
   - 9600 (Cisco, Juniper, most network devices)
   - 115200 (Linux consoles, modern devices)
   - 19200, 38400, 57600 (less common)

2. **Use Auto-Detect:**
   - RockTerm's auto-detect feature tests 120+ combinations.
   - It probes the device and scores readability.
   - Works best when the device is at a login prompt.

3. **Check device documentation:**
   - The correct baud rate is usually in the hardware manual.
   - Network devices: 9600 baud is the industry standard default.

### Partial Garbling (Some Characters Wrong)

**Cause:** Parity or data bits mismatch.

**Solutions:**
- Most modern devices use 8N1 (8 data bits, No parity, 1 stop bit).
- Try 7E1 (7 data bits, Even parity, 1 stop bit) for older equipment.
- Use Auto-Detect for unknown devices.

### Output Appearing Double-Spaced

**Cause:** The device is sending CR+LF but RockTerm is also converting CR to newline.

**Solution:**
- This is typically handled automatically by the terminal emulator.
- If persistent, check the device's terminal configuration.

---

## Flow Control Issues

### Output Appears Truncated

**Symptoms:**
- Long command output gets cut off.
- `show running-config` stops partway through.
- Data appears to be lost.

**Solutions:**

1. **Try different flow control settings:**
   - Set flow control to **None** (most common for console connections).
   - If that truncates, try **RTS/CTS** (hardware flow control).

2. **Set terminal length on the device:**
   ```
   terminal length 0
   ```
   This disables "More" paging and sends all output at once.

3. **Check cable supports flow control:**
   - Not all console cables wire the RTS/CTS lines.
   - Standard Cisco console cables support only 3-wire (TX, RX, GND).
   - USB adapters may not implement all serial control lines.

### Connection Hangs After a Few Lines

**Cause:** Hardware flow control is enabled in RockTerm but the cable doesn't support it.

**Solution:**
- Set flow control to **None**.
- Use XON/XOFF (software flow control) if the device supports it.

### XON/XOFF Freezing Terminal

**Symptoms:**
- Terminal appears frozen.
- No output, no response to input.

**Cause:** Accidentally sent XOFF (Ctrl+S) which pauses output.

**Solution:**
- Press **Ctrl+Q** to send XON and resume output.
- If using XON/XOFF flow control, be careful with Ctrl+S keyboard shortcuts.

---

## Permission Issues

### Windows

**"Access Denied" when opening port:**

1. Close other applications using the port.
2. Check if a background service is holding the port.
3. Run Device Manager and check for port conflicts.
4. Restart the USB adapter by unplugging and replugging.

**COM port appears but cannot be opened:**

1. Check Windows Event Viewer for driver errors.
2. Uninstall and reinstall the adapter driver.
3. Try a different USB port.

### Linux (Remote Systems)

When connecting to serial ports on remote Linux systems via SSH:

**Permission denied on /dev/ttyUSB0:**

```bash
# Add user to dialout group (Debian/Ubuntu)
sudo usermod -aG dialout $USER

# Add user to uucp group (Arch/Fedora)
sudo usermod -aG uucp $USER

# Log out and back in for changes to take effect
```

**Verify group membership:**
```bash
groups $USER
ls -la /dev/ttyUSB0
```

---

## Platform-Specific Issues

### Windows-Specific

- **Driver signing:** Windows may block unsigned drivers. Disable driver signature enforcement temporarily if needed.
- **COM port limits:** Windows supports COM1-COM255. If you're above COM9, some applications may need `\\.\COM10` format (RockTerm handles this automatically).
- **Selective USB suspend:** Windows power management may put USB ports to sleep. Disable in Power Options > USB settings.

### Device-Specific

**Cisco devices not responding:**
- Ensure using a rollover cable (not straight-through or crossover).
- Try the RJ45 console port AND the USB Mini-B console port (newer devices have both).
- Verify 9600 baud (default for Cisco).

**Juniper devices:**
- Default: 9600 baud, 8N1.
- Some EX switches use USB-C console.

**MikroTik devices:**
- Default: 115200 baud (not 9600).
- Use a straight-through serial cable (not a Cisco rollover).

---

## Cable and Hardware Issues

### Cable Types

| Cable Type | Use Case | Pin Configuration |
|------------|----------|-------------------|
| Cisco Rollover (Blue) | Cisco console RJ45 | Pins reversed (1-8 to 8-1) |
| Straight-through | Some non-Cisco devices | Pins 1:1 |
| Null modem | DTE-to-DTE connections | TX/RX crossed |

### Testing Cables

1. **Loopback test:**
   - Short TX to RX on the adapter (pin 2 to pin 3 on DB9).
   - Type characters in RockTerm — they should echo back.
   - If no echo, the adapter or cable may be faulty.

2. **LED indicators:**
   - Some adapters have TX/RX LEDs.
   - TX should blink when you type.
   - RX should blink when the device sends data.

3. **Try a known-good cable:**
   - If in doubt, swap the cable with one that is confirmed working.

### Adapter Quality

- Cheap adapters may have inconsistent behavior.
- For production use, invest in quality adapters (StarTech, Plugable).
- Keep spare adapters for troubleshooting.

---

## Related Links

- [Serial Connections](serial-connections.md)
- [Getting Started](getting-started.md)
- [FAQ](faq.md)
