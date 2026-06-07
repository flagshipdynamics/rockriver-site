---
title: Support
---

# Support

How to get help with RockTerm, report issues, and submit feedback.

## Table of Contents

- [Getting Help](#getting-help)
- [Before Contacting Support](#before-contacting-support)
- [How to Contact Support](#how-to-contact-support)
- [Information to Provide](#information-to-provide)
- [Generating Diagnostics](#generating-diagnostics)
- [Reporting Bugs](#reporting-bugs)
- [Submitting Feature Requests](#submitting-feature-requests)
- [Community Resources](#community-resources)
- [Related Links](#related-links)

---

## Getting Help

### Self-Service Resources

Before contacting support, check these resources:

1. **Built-in Help** — Press **F1** in RockTerm for the documentation browser with 25+ help sections.
2. **FAQ** — Check the [Frequently Asked Questions](faq.md) for common answers.
3. **Troubleshooting Guides:**
   - [Authentication Issues](troubleshooting-authentication.md)
   - [Port Forwarding Problems](troubleshooting-port-forwarding.md)
   - [Serial Connection Issues](troubleshooting-serial.md)
   - [Performance Problems](troubleshooting-performance.md)
4. **Documentation** — Browse the full [documentation index](index.md).

---

## Before Contacting Support

Please try these steps before reaching out:

1. **Check the FAQ** — Your question may already be answered.
2. **Check troubleshooting guides** — Step-by-step solutions for common issues.
3. **Try restarting RockTerm** — Some transient issues resolve with a restart.
4. **Update to the latest version** — Your issue may already be fixed.
5. **Test with default settings** — Rename `%APPDATA%\RockTerm\` temporarily to test with fresh configuration.

---

## How to Contact Support

### Email Support

Send detailed support requests to the RockTerm support email address provided with your license.

### Response Times

Response times depend on the nature of the issue and your support tier. Critical issues (data loss, security vulnerabilities) are prioritized.

---

## Information to Provide

When contacting support, include the following information to help us resolve your issue quickly:

### Required Information

| Information | How to Find It |
|-------------|----------------|
| RockTerm version | Help > About |
| Windows version | Settings > System > About |
| Issue description | Clear, step-by-step description |
| Steps to reproduce | Exact sequence of actions |
| Expected behavior | What you expected to happen |
| Actual behavior | What actually happened |

### For Connection Issues

| Information | Why We Need It |
|-------------|----------------|
| Connection type (SSH/Telnet/Serial) | Narrows the problem domain |
| Remote host OS (if known) | Rules out server-side issues |
| Error message (exact text) | Identifies specific failure |
| Does it work with another client? | Isolates RockTerm-specific issues |
| Network path (direct, VPN, proxy) | Identifies network factors |

### For Serial Issues

| Information | Why We Need It |
|-------------|----------------|
| USB adapter model/chipset | Identifies driver issues |
| COM port number | Verifies correct port selection |
| Device type and model | Provides expected settings |
| Cable type | Rules out cable issues |
| Driver version | Identifies compatibility issues |

### For Performance Issues

| Information | Why We Need It |
|-------------|----------------|
| Number of open sessions | Quantifies load |
| Scrollback setting | Memory usage factor |
| System specs (CPU, RAM) | Baseline capacity |
| How long RockTerm has been running | Memory accumulation |
| Specific action that is slow | Narrows the bottleneck |

---

## Generating Diagnostics

### Application Information

Collect this information for support requests:

1. **Version:** Help > About (note the exact version number).
2. **Configuration location:** `%APPDATA%\RockTerm\`
3. **Log files:** If you enabled session logging, include relevant logs.

### System Information

Run this command in PowerShell for system details:

```powershell
Get-ComputerInfo | Select-Object WindowsVersion, OsArchitecture, CsProcessors, CsTotalPhysicalMemory
```

### Network Diagnostics

For connection issues, include:

```cmd
ping <target_host>
tracert <target_host>
netstat -an | findstr :<port>
```

### Serial Diagnostics

For serial issues:

1. Open Device Manager.
2. Expand "Ports (COM & LPT)".
3. Note the adapter name, COM port number, and any warning icons.
4. Right-click the adapter > Properties > Driver tab > note driver version.

---

## Reporting Bugs

### What Qualifies as a Bug

- Unexpected behavior that differs from documentation.
- Application crashes or hangs.
- Features that don't work as described.
- Data corruption or loss.
- Security vulnerabilities.

### Bug Report Template

```
## Summary
[One-sentence description of the bug]

## Steps to Reproduce
1. [First step]
2. [Second step]
3. [Third step]

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Environment
- RockTerm version: [x.x.x]
- Windows version: [10/11, build number]
- Connection type: [SSH/Telnet/Serial/Local]

## Additional Context
[Screenshots, error messages, log excerpts]
```

### Security Vulnerabilities

If you discover a security vulnerability:

- **Do not** post it publicly.
- Contact support directly with details.
- Include steps to reproduce if possible.
- We will respond promptly to security reports.

---

## Submitting Feature Requests

### How to Request a Feature

Contact support with:

1. **Description** — What the feature should do.
2. **Use case** — Why you need it (workflow, problem it solves).
3. **Priority** — How important it is to your workflow.
4. **Examples** — How other tools implement similar features (if applicable).

### Feature Request Tips

- Be specific about what you want (not just "make it better").
- Describe the problem you're trying to solve, not just the solution you envision.
- Include workflow context — how would you use this feature day-to-day?
- Note if this is blocking a purchase decision or deployment.

---

## Community Resources

### Documentation

- Full documentation at the [documentation index](index.md).
- Built-in help accessible via F1 within the application.

### Updates

Check for RockTerm updates through the official download source provided with your license.

---

## Related Links

- [FAQ](faq.md)
- [Getting Started](getting-started.md)
- [Troubleshooting: Authentication](troubleshooting-authentication.md)
- [Troubleshooting: Serial](troubleshooting-serial.md)
- [Troubleshooting: Performance](troubleshooting-performance.md)
- [Troubleshooting: Port Forwarding](troubleshooting-port-forwarding.md)
