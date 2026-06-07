---
title: Serial Connections
---

# Serial Connections

RockTerm provides comprehensive serial console access for managing network devices, embedded systems, and other equipment via RS-232/USB serial interfaces.

## Table of Contents

- [Overview](#overview)
- [Supported Hardware](#supported-hardware)
- [Creating a Serial Connection](#creating-a-serial-connection)
- [Serial Port Settings](#serial-port-settings)
- [Auto-Detection](#auto-detection)
- [Cisco Console Examples](#cisco-console-examples)
- [Other Network Devices](#other-network-devices)
- [Send Break](#send-break)
- [Troubleshooting](#troubleshooting)
- [Related Links](#related-links)

---

## Overview

Serial connections enable direct console access to:

- Cisco routers and switches
- Juniper, Arista, and other network devices
- Embedded Linux systems
- Microcontrollers and IoT devices
- UPS systems and PDUs
- Legacy mainframe terminals

RockTerm communicates via COM ports on Windows (e.g., COM1, COM3, COM5).

---

## Supported Hardware

### USB-to-Serial Adapters

RockTerm automatically detects connected USB-to-serial adapters:

| Chipset | Common Brands |
|---------|---------------|
| FTDI FT232 | StarTech, Plugable, TRENDnet |
| Prolific PL2303 | Various generic adapters |
| Silicon Labs CP210x | Arista, some Cisco cables |
| CH340/CH341 | Generic low-cost adapters |

### Native COM Ports

Built-in RS-232 ports are supported where available.

### Cisco Console Cables

- Standard Cisco console cable (RJ45 to DB9) with USB adapter
- Cisco USB console cable (direct USB, uses FTDI chipset)
- USB Mini-B console cables (newer Cisco devices)

---

## Creating a Serial Connection

### From the Menu

1. Go to **Session > New Serial**.
2. Select the **Port** from the dropdown (auto-detected from system).
3. Configure serial parameters (or use defaults).
4. Click **Connect**.

### Using the Serial Wizard

1. Go to **Session > Serial Wizard**.
2. The wizard guides you through:
   - Port selection (with device descriptions)
   - Baud rate selection
   - Data bits, stop bits, parity configuration
   - Flow control settings
3. Click **Finish** to connect.

### From Quick Connect

Serial sessions can be saved and accessed from the Session Manager for quick reconnection.

---

## Serial Port Settings

### Baud Rate

| Rate | Common Use |
|------|-----------|
| 9600 | Cisco devices (default), most network equipment |
| 19200 | Some older equipment |
| 38400 | Certain industrial devices |
| 57600 | Some modern devices |
| 115200 | Linux serial consoles, modern network devices |
| 230400 | High-speed embedded devices |
| 460800 | Debug consoles |
| 921600 | Maximum standard rate |

Custom baud rates are also supported via manual entry.

### Data Bits

| Setting | Use |
|---------|-----|
| 8 | Standard (most common) |
| 7 | Legacy systems, some industrial protocols |
| 6 | Rare legacy use |
| 5 | Baudot/teletype |

### Parity

| Setting | Description |
|---------|-------------|
| None | No parity bit (most common) |
| Even | Even parity check |
| Odd | Odd parity check |
| Mark | Parity bit always 1 |
| Space | Parity bit always 0 |

### Stop Bits

| Setting | Use |
|---------|-----|
| 1 | Standard (most common) |
| 1.5 | Rare, some older equipment |
| 2 | High-noise environments |

### Flow Control

| Setting | Description | Use Case |
|---------|-------------|----------|
| None | No flow control | Most modern devices |
| RTS/CTS | Hardware flow control | High-speed transfers |
| XON/XOFF | Software flow control | Legacy terminals |
| DSR/DTR | Data set ready / Data terminal ready | Modems, some industrial |

---

## Auto-Detection

RockTerm includes an automatic serial port configuration detection feature that determines the correct settings for an unknown device.

### How It Works

1. Open **Session > New Serial** or use the Serial Wizard.
2. Select your port.
3. Click **Auto-Detect** (or use the SerialAutoDetectDialog).
4. RockTerm probes the device with common configurations:
   - Tests 120+ setting combinations in prioritized tiers.
   - Sends CR/LF probes to trigger device responses.
   - Scores responses based on:
     - Printable ASCII character percentage
     - Consecutive readable text sequences
     - Keyword detection (login, password, hostname, router, switch, etc.)
     - Prompt character detection (>, $, #, %)
   - Reports the best-matching configuration.

### Priority Order

Auto-detection tests the most common configurations first:

1. **9600/8N1** — Standard Cisco/network equipment default
2. **115200/8N1** — Modern Linux and device consoles
3. **19200/8N1, 38400/8N1, 57600/8N1** — Other common rates
4. Remaining combinations in descending likelihood

The detector exits early when confidence is high (75+ score with 85%+ printable characters), typically finding the correct settings within seconds.

---

## Cisco Console Examples

### Standard Cisco Setup

Most Cisco routers and switches use these default console settings:

| Setting | Value |
|---------|-------|
| Baud Rate | 9600 |
| Data Bits | 8 |
| Parity | None |
| Stop Bits | 1 |
| Flow Control | None |

### Connecting to a Cisco Device

1. Connect your console cable (RJ45 to USB adapter).
2. Create a new serial connection in RockTerm.
3. Select the COM port for your adapter.
4. Use 9600 8N1 settings (default).
5. Press **Enter** after connecting to get a prompt.

### Entering ROMMON (Send Break)

To enter ROMMON mode during boot for password recovery:

1. Connect to the device via serial.
2. Power cycle or reload the device.
3. During the boot sequence (within the first 60 seconds), press **Ctrl+Break** or use **Session > Send Break**.
4. The device enters ROMMON mode.

### Common Cisco Tasks

```
! Initial setup
Router> enable
Router# configure terminal

! Set hostname
Router(config)# hostname R1

! Configure console settings
R1(config)# line console 0
R1(config-line)# speed 115200
R1(config-line)# logging synchronous
R1(config-line)# exec-timeout 30 0
```

---

## Other Network Devices

### Juniper

| Setting | Value |
|---------|-------|
| Baud Rate | 9600 |
| Data Bits | 8 |
| Parity | None |
| Stop Bits | 1 |
| Flow Control | None |

### Arista

| Setting | Value |
|---------|-------|
| Baud Rate | 9600 |
| Data Bits | 8 |
| Parity | None |
| Stop Bits | 1 |
| Flow Control | None |

### MikroTik

| Setting | Value |
|---------|-------|
| Baud Rate | 115200 |
| Data Bits | 8 |
| Parity | None |
| Stop Bits | 1 |
| Flow Control | None |

### Linux Serial Console

| Setting | Value |
|---------|-------|
| Baud Rate | 115200 |
| Data Bits | 8 |
| Parity | None |
| Stop Bits | 1 |
| Flow Control | None |

---

## Send Break

The Send Break function (**Session > Send Break** or **Ctrl+Break**) transmits a serial break signal. This is essential for:

- Cisco password recovery (entering ROMMON)
- Interrupting boot sequences
- Triggering debug modes on embedded systems
- Sun/Oracle SPARC systems (entering OpenBoot/OBP)

---

## Troubleshooting

### Port Not Found

- Verify the USB adapter is plugged in and recognized by Windows.
- Open Device Manager and check under "Ports (COM & LPT)".
- Install the correct driver for your adapter chipset.
- Try a different USB port.
- Unplug and replug the adapter.

### Permission Denied

On Windows:
- Ensure no other application is using the COM port (PuTTY, HyperTerminal, etc.).
- Close any other terminal programs.
- Check Device Manager for conflicts.

On remote Linux systems:
- Add your user to the `dialout` group: `sudo usermod -aG dialout $USER`
- Log out and back in for group changes to take effect.

### Garbled Output (Wrong Baud Rate)

If you see random characters or gibberish:

1. Disconnect the serial session.
2. Try a different baud rate (most commonly 9600 or 115200).
3. Use Auto-Detect to find the correct settings.
4. Ensure data bits, parity, and stop bits match the device configuration.

### No Output at All

- Press **Enter** several times to trigger a prompt.
- Verify the cable is fully seated at both ends.
- Try a different cable (console cables can fail).
- Confirm the device is powered on.
- Check if the device uses RJ45, USB Mini-B, or USB-C for console.
- Some devices require specific flow control settings.

### USB Adapter Not Detected

- Install the manufacturer's driver package.
- For FTDI: Download from ftdichip.com.
- For Prolific: Beware of counterfeit chip detection in newer drivers.
- For CH340: Download from the manufacturer's website.
- Try running Device Manager as administrator.

### Flow Control Issues

If data appears truncated or connection hangs:

- Try setting flow control to **None**.
- If the device requires hardware flow control, ensure your cable supports RTS/CTS lines.
- USB adapters with minimal wiring may not support hardware flow control.

---

## Related Links

- [Getting Started](getting-started.md)
- [Session Management](session-management.md)
- [Terminal Features](terminal-features.md)
- [Troubleshooting: Serial](troubleshooting-serial.md)
