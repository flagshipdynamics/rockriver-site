---
title: Import & Export
---

# Import & Export

RockTerm supports importing and exporting sessions for backup, migration, and team sharing.

## Table of Contents

- [Session Export](#session-export)
- [Session Import](#session-import)
- [CSV/TSV Import](#csvtsv-import)
- [Other Exportable Data](#other-exportable-data)
- [Backup Recommendations](#backup-recommendations)
- [Troubleshooting](#troubleshooting)
- [Related Links](#related-links)

---

## Session Export

Export all saved sessions to a JSON file for backup or migration.

### How to Export

1. Go to **File > Export Sessions**.
2. Choose a destination file path.
3. Click **Save**.

All sessions (including folder structure) are exported to a single JSON file.

### Export Format

The export file contains:

```json
{
  "sessions": [
    {
      "name": "Production Server",
      "type": "ssh",
      "host": "prod.example.com",
      "port": 22,
      "username": "deploy",
      "folder": "Production"
    }
  ],
  "folders": ["Production", "Lab", "Home"]
}
```

### What is Exported

| Data | Included |
|------|----------|
| Session names | Yes |
| Connection details (host, port, username) | Yes |
| Folder structure | Yes |
| Serial port settings | Yes |
| Jump host configuration | Yes |
| Remote commands | Yes |
| Highlight rule assignments | Yes |
| Keymap assignments | Yes |
| Passwords | No (security) |
| Credential profile passwords | No (security) |
| API keys | No (security) |

### What is NOT Exported

For security, sensitive data is excluded:

- Passwords and passphrases
- Private key file contents (paths are included)
- API keys
- Encrypted vault contents
- Credential profile secrets

---

## Session Import

Import sessions from a previously exported JSON file.

### How to Import

1. Go to **File > Import Sessions**.
2. Select the JSON file to import.
3. Sessions are merged with your existing sessions.

### Merge Behavior

- New sessions are added to your session list.
- Folders are created if they don't already exist.
- Duplicate sessions (same name and folder) are skipped.
- Existing sessions are not overwritten.

---

## CSV/TSV Import

Import sessions in bulk from a spreadsheet or CSV/TSV file.

### How to Import CSV/TSV

1. Go to **File > Import from CSV/TSV**.
2. Select your CSV or TSV file.
3. The **Import Wizard** opens with a multi-step process:
   - **Step 1:** Preview the data and select delimiter (comma, tab, etc.).
   - **Step 2:** Map CSV columns to session properties (host, port, username, type, etc.).
   - **Step 3:** Review and confirm the import.
4. Click **Finish** to import.

### CSV Format Example

```csv
Name,Type,Host,Port,Username,Folder
Web Server 1,ssh,10.0.1.10,22,admin,Production
Web Server 2,ssh,10.0.1.11,22,admin,Production
Switch Core,telnet,192.168.1.1,23,,Network
Console Port,serial,COM3,9600,,Lab
```

### Supported Columns

| Column | Maps To | Required |
|--------|---------|----------|
| Name | Session name | Yes |
| Type | ssh, telnet, serial, raw, rdp | Yes |
| Host | Hostname or IP | Yes (network types) |
| Port | TCP port or baud rate | No (uses defaults) |
| Username | Login username | No |
| Folder | Organization folder | No |

---

## Other Exportable Data

### Port Forwarding Configuration

Port forwarding rules can be imported and exported for sharing tunnel configurations.

### Trigger Configurations

Export and import trigger rule sets via **Tools > Trigger Manager**:

1. Open the Trigger Manager.
2. Use **Export** to save triggers to JSON.
3. Use **Import** to load triggers from a file.

### Keymaps

Export and import custom keyboard mappings via **Tools > Key Map Manager**:

1. Open the Keymap Manager.
2. Select a keymap profile.
3. Use **Export** to save or **Import** to load.

### Scripts

Export and import expect/Python scripts via **Tools > Script Manager**:

1. Open the Script Manager.
2. Select a script.
3. Use the export/import options to save or load script files.

---

## Backup Recommendations

### What to Back Up

| Item | Location | Frequency |
|------|----------|-----------|
| Sessions | Export via File > Export Sessions | After changes |
| Configuration | `%APPDATA%\RockTerm\` | Weekly |
| SSH Keys | `%USERPROFILE%\.ssh\` | After key generation |
| Scripts | Script Manager export | After changes |
| Triggers | Trigger Manager export | After changes |
| Keymaps | Keymap Manager export | After changes |

### Full Backup Strategy

1. **Export sessions** to a JSON file.
2. **Copy the configuration directory** (`%APPDATA%\RockTerm\`).
3. **Export scripts, triggers, and keymaps** individually.
4. Store backups in a secure location (encrypted drive, password manager, etc.).

### Automated Backup

Create a batch script to automate RockTerm backups:

```batch
@echo off
set BACKUP_DIR=D:\Backups\RockTerm\%date:~-4%-%date:~4,2%-%date:~7,2%
mkdir "%BACKUP_DIR%" 2>nul
xcopy "%APPDATA%\RockTerm" "%BACKUP_DIR%\config" /E /I /Q
echo Backup complete: %BACKUP_DIR%
```

### Migration Between Machines

1. Export sessions on the source machine.
2. Copy the export file to the destination machine.
3. Install RockTerm on the destination.
4. Import sessions on the destination.
5. Manually re-enter passwords (not included in exports for security).
6. Verify key file paths exist on the destination (update paths if needed).

---

## Troubleshooting

### Import Fails

- Verify the file is valid JSON (use a JSON validator).
- Ensure the file was exported from RockTerm (correct format).
- Check file permissions (readable by your user).

### CSV Import Column Mismatch

- Verify the CSV uses the correct delimiter (comma vs. tab).
- Check for quoted fields containing the delimiter character.
- Ensure required columns (Name, Type, Host) are present.
- Preview the data in Step 1 to verify parsing.

### Sessions Missing After Import

- Check if sessions were placed in a different folder.
- Search using the filter in the Session Manager.
- Verify the import completed without errors.

### Passwords Not Imported

This is by design. Passwords and secrets are excluded from exports for security. Re-enter passwords after importing sessions or use Credential Profiles.

---

## Related Links

- [Session Management](session-management.md)
- [Security](security.md)
- [Getting Started](getting-started.md)
