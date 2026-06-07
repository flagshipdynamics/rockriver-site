---
title: Session Management
---

# Session Management

RockTerm provides comprehensive session management for organizing, saving, and quickly accessing your connections.

## Table of Contents

- [Session Manager Panel](#session-manager-panel)
- [Creating Sessions](#creating-sessions)
- [Editing Sessions](#editing-sessions)
- [Folder Organization](#folder-organization)
- [Credential Profiles](#credential-profiles)
- [Firewall and Proxy Profiles](#firewall-and-proxy-profiles)
- [Duplicating Sessions](#duplicating-sessions)
- [Batch Editing](#batch-editing)
- [Connection History](#connection-history)
- [Workspace Snapshots](#workspace-snapshots)
- [Import and Export](#import-and-export)
- [Related Links](#related-links)

---

## Session Manager Panel

Toggle the Session Manager with **Ctrl+B** or **View > Session Manager**.

The panel contains two sections:

### Saved Sessions

A tree view of all saved sessions organized in folders. Features include:

- Double-click to connect
- Right-click context menu (Edit, Duplicate, Delete, Move)
- Drag-and-drop between folders
- Search/filter by name
- Expand/collapse folders with state memory

### Active Connections

A live list of currently open terminal sessions showing:

- Connection status (green = connected, red = disconnected)
- Session name and type
- Double-click to switch to that terminal
- Context menu: Switch, Save, Reconnect, Duplicate, Close
- Bulk disconnect options

---

## Creating Sessions

### From the Menu

1. Go to **Session > New SSH/Telnet/Serial/Raw TCP**.
2. Fill in connection parameters.
3. Click **Connect** to connect immediately, or configure and save.

### From Session Manager

1. Click the **New Session** button in the Session Manager panel.
2. Select a protocol type (SSH, Telnet, Serial, Raw, RDP).
3. Fill in the session details.
4. Assign a folder (optional).
5. Click **OK** to save.

### Using Wizards

RockTerm provides guided wizards for common scenarios:

- **Session > SSH Wizard** — Step-by-step SSH connection setup.
- **Session > Serial Wizard** — Guided serial port configuration.

### Saving Active Connections

To save a currently active connection as a session:

1. Right-click the session in Active Connections.
2. Select **Save to Sessions**.
3. Choose a name and folder.
4. Click **Save**.

Alternatively, press **Ctrl+Shift+S** to save the current session.

---

## Editing Sessions

1. Right-click a saved session in the Session Manager.
2. Select **Edit**.
3. Modify connection parameters.
4. Click **OK** to save changes.

### Session Properties

| Property | Protocols | Description |
|----------|-----------|-------------|
| Name | All | Display name for the session |
| Folder | All | Organization folder |
| Host | SSH, Telnet, Raw, RDP | Hostname or IP address |
| Port | SSH, Telnet, Raw, RDP | TCP port number |
| Username | SSH, RDP | Login username |
| Credential Profile | SSH, RDP | Named credential set |
| Certificate File | SSH | Path to certificate |
| Jump Host | SSH | Bastion/jump server configuration |
| HTTP Proxy | SSH | HTTP CONNECT proxy settings |
| SOCKS Proxy | SSH | Dynamic port forwarding (ssh -D) |
| Firewall Profile | SSH | Named proxy profile |
| Remote Command | SSH, Telnet | Commands to run post-connect |
| Key Map | SSH, Telnet, Raw | Custom keyboard mapping |
| Highlight Rules | All | Pattern highlighting rule files |
| Serial Port | Serial | COM port or device path |
| Baud Rate | Serial | Communication speed |
| Data Bits | Serial | 5, 6, 7, or 8 |
| Parity | Serial | None, Even, Odd, Mark, Space |
| Stop Bits | Serial | 1, 1.5, or 2 |
| Flow Control | Serial | None, XON/XOFF, RTS/CTS, DSR/DTR |

---

## Folder Organization

### Creating Folders

1. Click **New Folder** in the Session Manager.
2. Enter a folder name.
3. Click **OK**.

Or right-click in the session tree and select **New Folder**.

### Moving Sessions

- **Drag and drop** sessions between folders.
- **Right-click > Move** to select a destination folder.
- Use **Batch Edit** to move multiple sessions at once.

### Renaming Folders

Right-click a folder and select **Rename**. The reserved name "sessions" cannot be used.

### Deleting Folders

Right-click a folder and select **Delete**. A confirmation dialog shows the number of sessions that will be affected.

---

## Credential Profiles

Credential profiles store reusable authentication credentials for SSH and RDP sessions.

### Creating a Profile

1. Go to **Network > Credential Profiles**.
2. Click **New**.
3. Enter:
   - Profile name (required)
   - Username (required)
   - Password (encrypted)
   - Key file path (optional)
   - Description (optional)
4. Click **OK**.

### Using Profiles

When creating or editing a session, select a credential profile from the dropdown. The username is auto-filled from the selected profile.

### Security

Passwords in credential profiles are encrypted using the SecretManager vault with your master password. See [Security](security.md) for details.

---

## Firewall and Proxy Profiles

Named proxy configurations for sessions that connect through firewalls or jump proxies.

### Supported Proxy Types

| Type | Description |
|------|-------------|
| HTTP CONNECT | Standard HTTP proxy with CONNECT method |
| SOCKS5 | SOCKS version 5 proxy |
| SOCKS4 | SOCKS version 4 proxy |

### Creating a Profile

1. Go to **Network > Credential Profiles** or click **Manage...** in the session editor.
2. Click **New**.
3. Enter proxy type, host, port, and optional credentials.
4. Click **OK**.

### Using Profiles

Select a firewall profile in the session editor. RockTerm automatically configures the appropriate proxy settings based on the profile type.

---

## Duplicating Sessions

To create a copy of an existing session:

1. Right-click the session in the Session Manager.
2. Select **Duplicate**.

Or press **Ctrl+Shift+D** to duplicate the currently active session.

The duplicate is named "Original Name (copy)" and placed in the same folder. All properties are preserved.

---

## Batch Editing

Edit multiple sessions simultaneously:

1. Select multiple sessions (Ctrl+Click or Shift+Click).
2. Right-click and select **Batch Edit**.
3. Check the fields you want to modify:
   - Folder
   - Username
   - Port
   - Credential Profile
   - Firewall Profile
   - Keymap
   - Remote Command
4. Enter new values for checked fields.
5. Click **OK** to apply changes to all selected sessions.

### Batch Delete

Select multiple sessions and right-click > **Delete** to remove them with a single confirmation.

---

## Connection History

RockTerm maintains a history of recent connections:

- The Quick Connect autocompleter suggests recent SSH connections (host, username, port).
- Recent connections appear in the Quick Connect dialog.
- History is stored in application settings.

---

## Workspace Snapshots

Save and restore your entire window layout including all open sessions.

### Saving a Snapshot

1. Arrange your terminal windows as desired (tabs, tiles, splits).
2. Use the snapshot save feature to capture the current layout.

### Restoring a Snapshot

1. Select a previously saved snapshot.
2. RockTerm restores all windows with their positions, sizes, and session configurations.

Snapshots capture:

- Window positions and dimensions
- Layout mode (tabbed or free-form)
- Session configurations for each window
- Active connection states

---

## Import and Export

### Export Sessions

1. Go to **File > Export Sessions**.
2. Choose a destination file.
3. All sessions are exported to JSON format.

### Import Sessions

1. Go to **File > Import Sessions**.
2. Select a JSON file previously exported from RockTerm.
3. Sessions are merged with existing entries (duplicates are skipped).

### CSV/TSV Import

1. Go to **File > Import from CSV/TSV**.
2. Follow the multi-step import wizard.
3. Map CSV columns to session properties.
4. Preview and confirm the import.

See [Import & Export](import-export.md) for detailed instructions.

---

## Troubleshooting

### Sessions Not Saving

- Ensure the configuration directory is writable: `%APPDATA%\RockTerm\`
- Check for disk space issues.
- Verify the `sessions.json` file is not locked by another process.

### Drag-and-Drop Not Working

- Ensure you are dragging a session item (not a folder).
- Drop targets must be folder items or the root level.
- Source and destination folders must be different.

### Missing Sessions After Update

- Check for a `sessions.json.bak` backup file in the configuration directory.
- RockTerm creates backups when corruption is detected.

---

## Related Links

- [SSH Connections](ssh-connections.md)
- [Import & Export](import-export.md)
- [Security](security.md)
- [Getting Started](getting-started.md)
