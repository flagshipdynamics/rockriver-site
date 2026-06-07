---
title: Security
---

# Security

RockTerm is designed with security as a priority. This document covers how RockTerm handles credentials, keys, and sensitive data.

## Table of Contents

- [Security Overview](#security-overview)
- [Credential Handling](#credential-handling)
- [Encrypted Vault](#encrypted-vault)
- [SSH Key Storage](#ssh-key-storage)
- [Host Key Verification](#host-key-verification)
- [Session Security](#session-security)
- [Local Data Storage](#local-data-storage)
- [Authentication Best Practices](#authentication-best-practices)
- [Network Security](#network-security)
- [Related Links](#related-links)

---

## Security Overview

### Design Principles

- **Local-only storage** — All credentials and configuration remain on your machine.
- **No telemetry** — RockTerm does not phone home or send usage data.
- **No cloud sync** — Session data is never uploaded to external servers.
- **Encryption at rest** — Stored passwords use AES encryption with a master password.
- **Opt-in features** — Features like AI assistant require explicit user action to enable.
- **Minimal permissions** — RockTerm requests only the access it needs.

### What RockTerm Does NOT Do

- Send data to RockTerm servers (there are none)
- Collect analytics or telemetry
- Store credentials in plaintext
- Sync data to the cloud
- Require an internet connection to function (except for SSH/Telnet/AI features)
- Access files outside its configuration directory without user action

---

## Credential Handling

### Password Input

- Passwords entered in connection dialogs are transmitted directly to the remote host via the encrypted SSH channel.
- Passwords are held in memory only for the duration of the connection.
- Password fields use masked input (dots/asterisks).

### Credential Profiles

Named credential profiles can store:

- Username
- Password (encrypted)
- Key file path
- Description

Passwords in credential profiles are encrypted before storage. See [Encrypted Vault](#encrypted-vault).

### Firewall/Proxy Profiles

Proxy credentials (username/password) are encrypted using the same vault system as credential profiles.

---

## Encrypted Vault

RockTerm includes a SecretManager for encrypted credential storage.

### Encryption Method

| Component | Implementation |
|-----------|---------------|
| Cipher | Fernet (AES-128-CBC + HMAC-SHA256) |
| Key Derivation | PBKDF2 with 100,000 iterations |
| Salt | Random per-vault (stored alongside encrypted data) |
| Master Key | Derived from your master password |

### How It Works

1. You set a **master password** when first storing a credential.
2. The master password is used with PBKDF2 to derive an encryption key.
3. Secrets are encrypted with Fernet (AES-128-CBC + HMAC-SHA256).
4. Encrypted data is stored in `secrets.enc` in the configuration directory.
5. The master password is never stored — only used temporarily for key derivation.

### Vault Operations

- **Unlock** — Enter master password to decrypt credentials in memory.
- **Lock** — Clear decrypted data from memory.
- **Store** — Add a new encrypted secret.
- **Retrieve** — Get a decrypted secret (requires unlocked vault).
- **Delete** — Remove a secret from the vault.
- **Change master password** — Re-encrypt all secrets with a new key.

### Security Properties

- Without the master password, stored credentials cannot be decrypted.
- The vault file is useless without the master password.
- Brute-force resistance: 100,000 PBKDF2 iterations significantly slows attacks.
- Each vault has a unique random salt, preventing rainbow table attacks.

---

## SSH Key Storage

### Key File Handling

- RockTerm stores only the **path** to your private key files.
- Key file contents are read at connection time and held in memory only during authentication.
- Key passphrases are prompted at connection time (not stored by default).

### SSH Key Manager

The built-in SSH Key Manager (**Network > SSH Key Manager**) provides:

- Key pair generation (RSA, ED25519, ECDSA)
- Key fingerprint viewing
- Public key export (for adding to `authorized_keys`)
- Secure key file handling

### Recommendations

- Use ED25519 keys for new deployments (faster, smaller, secure).
- Use passphrases on all private keys.
- Set restrictive file permissions on key files.
- Store keys in `%USERPROFILE%\.ssh\` (standard location).
- Never share private keys.

---

## Host Key Verification

RockTerm implements Trust-On-First-Use (TOFU):

### First Connection

1. The remote server's host key is presented.
2. If this is the first connection, the key is saved to known hosts.
3. A record of the key type and fingerprint is stored.

### Subsequent Connections

1. The server's host key is compared to the stored key.
2. If the keys match, the connection proceeds.
3. If the keys differ, the connection is **rejected** with a warning.

### Host Key Change Detection

A changed host key may indicate:

- **Legitimate:** Server reinstalled, key rotated, or IP address reassigned.
- **Attack:** Man-in-the-middle (MITM) interception attempt.

When a change is detected:

1. RockTerm displays a warning explaining the mismatch.
2. The connection is not established.
3. You must manually remove the old key from the Host Key Manager if the change is expected.

### Known Hosts File

Host keys are stored in standard OpenSSH format at `~/.ssh/known_hosts`, maintaining compatibility with other SSH clients.

---

## Session Security

### Session Locking

Lock critical sessions to prevent accidental disconnection:

- **Session > Lock Session** or **Ctrl+Alt+L**.
- Locked sessions display a lock indicator.
- Must be explicitly unlocked before disconnection.

### EULA and Licensing

- RockTerm tracks EULA acceptance version to ensure users review updated terms.
- No personal data is associated with license validation.

---

## Local Data Storage

### Configuration Directory

```
%APPDATA%\RockTerm\
├── sessions.json          (saved sessions - no passwords)
├── snapshots.json         (workspace layouts)
├── secrets.enc            (encrypted credential vault)
├── commands.json          (command manager entries)
├── settings (QSettings)   (preferences)
├── themes/                (custom terminal color themes)
└── highlighting/          (custom highlight rules)
```

### Data Categories

| Data | Storage | Protection |
|------|---------|------------|
| Session configurations | sessions.json (plaintext) | No passwords included |
| Stored passwords | secrets.enc | AES encryption + master password |
| API keys (AI) | QSettings | Local storage only |
| SSH host keys | ~/.ssh/known_hosts | Standard OpenSSH format |
| SSH private keys | User-specified path | User-managed permissions |
| Session logs | User-specified path | User-managed |

### Backup Files

RockTerm creates `.bak` backup files when corruption is detected in configuration files. These may contain session metadata but never contain passwords.

---

## Authentication Best Practices

### For SSH

1. **Prefer key authentication** over passwords.
2. **Use ED25519 keys** for new deployments.
3. **Set key passphrases** to protect against key theft.
4. **Use jump hosts** for accessing private networks.
5. **Rotate keys** periodically (at least annually).
6. **Disable password auth** on servers where key auth is configured.

### For Credentials

1. **Set a strong master password** for the encrypted vault.
2. **Don't reuse passwords** across different systems.
3. **Use credential profiles** to avoid re-typing passwords.
4. **Limit stored credentials** to what you actively use.
5. **Change the master password** if you suspect compromise.

### For Network Security

1. **Avoid Telnet** for any connection carrying sensitive data.
2. **Use port forwarding** instead of exposing services directly.
3. **Verify host keys** on first connection to critical systems.
4. **Enable compression** only on trusted networks (compression oracle attacks).
5. **Use firewalls profiles** for connections through corporate proxies.

---

## Network Security

### Encrypted Connections

| Protocol | Encryption |
|----------|------------|
| SSH | Full channel encryption (AES, ChaCha20) |
| Telnet | None (cleartext) |
| Serial | N/A (direct physical connection) |
| Raw TCP | None (application-layer encryption depends on protocol) |

### Port Forwarding Security

- All forwarded traffic is encrypted within the SSH tunnel.
- Local forwarding exposes ports only on localhost by default.
- Dynamic forwarding (SOCKS5) encrypts all proxied traffic.

### AI Assistant

When AI features are enabled:

- API calls use HTTPS (TLS encrypted).
- Only terminal output you explicitly include is sent.
- No data goes to RockTerm — only to your chosen AI provider.
- See [Privacy](privacy.md) for full details.

---

## Related Links

- [Privacy](privacy.md)
- [SSH Connections](ssh-connections.md)
- [Session Management](session-management.md)
- [Troubleshooting: Authentication](troubleshooting-authentication.md)
