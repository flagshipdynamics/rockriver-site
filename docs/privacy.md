---
title: Privacy Policy
---

# Privacy

RockTerm is designed with privacy as a core principle. This document explains what data RockTerm collects, stores, and transmits.

## Table of Contents

- [Privacy Summary](#privacy-summary)
- [Data Collection](#data-collection)
- [Local Data Storage](#local-data-storage)
- [Network Communications](#network-communications)
- [AI Assistant Privacy](#ai-assistant-privacy)
- [Diagnostic Bundles](#diagnostic-bundles)
- [Third-Party Services](#third-party-services)
- [Data Retention](#data-retention)
- [Your Rights](#your-rights)
- [Related Links](#related-links)

---

## Privacy Summary

**RockTerm does not collect, transmit, or store any user data on external servers.**

Key points:

- No analytics or telemetry.
- No usage tracking.
- No cloud synchronization.
- No account required.
- No internet connection required for core functionality.
- All configuration is stored locally on your machine.
- AI features are opt-in and use your own API keys.

---

## Data Collection

### What RockTerm Collects

**Nothing.** RockTerm does not:

- Send usage statistics.
- Track feature usage.
- Report errors to external services.
- Collect hardware or software information.
- Create user profiles or identifiers.
- Phone home for license verification.
- Check for updates automatically (unless you explicitly check).

### What RockTerm Stores Locally

All data remains on your machine:

| Data | Purpose | Location |
|------|---------|----------|
| Session configurations | Remember your connections | %APPDATA%\RockTerm\ |
| Preferences | Remember your settings | %APPDATA%\RockTerm\ |
| Encrypted credentials | Stored passwords | %APPDATA%\RockTerm\secrets.enc |
| SSH known hosts | Host key verification | %USERPROFILE%\.ssh\known_hosts |
| Session logs | Audit trail (user-initiated) | User-specified location |
| Window layouts | Workspace snapshots | %APPDATA%\RockTerm\ |
| Custom themes/rules | Personalization | %APPDATA%\RockTerm\ |

---

## Local Data Storage

### Configuration Files

- **sessions.json** — Connection details (hostnames, ports, usernames). Does not contain passwords.
- **secrets.enc** — Encrypted vault for stored passwords. Protected by master password with AES encryption.
- **snapshots.json** — Window layout configurations.
- **commands.json** — Saved command snippets and macros.

### Sensitive Data Protection

| Data Type | Protection Method |
|-----------|-------------------|
| Passwords | AES-128 encryption with PBKDF2 master key |
| API keys | Local storage in settings (not transmitted to RockTerm) |
| Private keys | User-managed file permissions (paths stored, not contents) |
| Session content | Never stored unless user enables logging |

---

## Network Communications

### When RockTerm Communicates Over the Network

RockTerm connects to external hosts **only** when you explicitly initiate a connection:

| Action | Destination | Data Sent |
|--------|-------------|-----------|
| SSH connection | Your specified host | SSH protocol data |
| Telnet connection | Your specified host | Telnet protocol data |
| AI Assistant query | Your AI provider (Anthropic/OpenAI) | Your question + terminal context |
| TFTP server | Clients that connect to you | Files in your TFTP root |

### When RockTerm Does NOT Communicate

- At launch
- At exit
- When idle
- During configuration changes
- When updating settings
- For license validation
- For update checks (unless you request them)

---

## AI Assistant Privacy

The AI Assistant is an **opt-in** feature. It is completely disabled unless you:

1. Explicitly enable it in Preferences.
2. Provide your own API key.
3. Actively submit a query.

### Data Flow

When you use the AI Assistant:

```
Your Question + Terminal Context
        │
        ▼
    RockTerm (local) ──HTTPS──► AI Provider API
                                 (Anthropic or OpenAI)
        ◄──────────────────────── AI Response
```

### What is Sent to AI Provider

- Your typed question.
- Terminal context (recent output or selected text) if you include it.
- Previous messages in the current conversation.
- A system prompt identifying the assistant role.

### What is NOT Sent to AI Provider

- Your API keys (authentication header only, not in message body).
- Passwords or private keys.
- Other session data.
- Your configuration or saved sessions.
- Any data from other terminals.

### AI Provider Data Policies

Data sent to AI providers is subject to their respective privacy policies:

- **Anthropic:** Data is not used for training (API usage policy).
- **OpenAI:** Review their data usage policy for API calls.

**Recommendation:** For sensitive environments, review your AI provider's enterprise data handling agreement before enabling AI features on terminals with confidential data.

### Disabling AI

To ensure no AI-related data transmission:

1. Leave the AI Assistant disabled in Preferences (default state).
2. Do not enter an API key.
3. No data will ever be sent to AI providers.

---

## Diagnostic Bundles

### What are Diagnostic Bundles

If you contact support and are asked to provide diagnostic information, you may be asked to generate a diagnostic bundle.

### What is Included

Diagnostic bundles may include:

- Application version information.
- Operating system version.
- Error logs (if available).
- Configuration file structure (NOT contents).
- Connection failure details.

### What is NEVER Included

- Passwords or credentials.
- Session content or terminal output.
- Private keys or certificates.
- API keys.
- Personal files.
- Session logs (unless you explicitly attach them).

### Your Control

- Diagnostic bundles are never generated or sent automatically.
- You must explicitly create and share them.
- Review the bundle contents before sharing with support.

---

## Third-Party Services

RockTerm uses the following third-party services only when you explicitly configure them:

| Service | Used When | Data Shared |
|---------|-----------|-------------|
| Anthropic API | AI Assistant enabled with Anthropic | Queries + context |
| OpenAI API | AI Assistant enabled with OpenAI | Queries + context |

No other third-party services are contacted by RockTerm.

---

## Data Retention

### On Your Machine

- Configuration files persist until you delete them.
- Session logs persist until you delete them.
- Encrypted vault persists until you delete it.
- Uninstalling RockTerm optionally removes configuration data.

### On AI Provider Servers

- Subject to your AI provider's data retention policy.
- Anthropic API calls are not used for model training.
- Review your provider's terms for specifics.

---

## Your Rights

### Access Your Data

All your data is stored locally on your machine in readable formats (JSON, plaintext):

- `%APPDATA%\RockTerm\` — Configuration and sessions.
- `%USERPROFILE%\.ssh\` — SSH keys and known hosts.
- Your chosen locations — Session logs.

### Delete Your Data

To remove all RockTerm data:

1. Uninstall RockTerm.
2. Delete `%APPDATA%\RockTerm\` directory.
3. Remove any session log files you created.
4. Optionally remove SSH keys from `%USERPROFILE%\.ssh\`.

### Export Your Data

Use **File > Export Sessions** to export your session configurations to a portable JSON file.

---

## Related Links

- [Security](security.md)
- [AI Assistant](ai-assistant.md)
- [Support](support.md)
