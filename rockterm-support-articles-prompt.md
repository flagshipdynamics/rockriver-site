# RockTerm Support Articles — Build Instructions

Add the following support article pages to the existing `~/rockriver-site` project. Each article goes in its own directory under `/rockterm/support/`. Follow the same design, layout, nav, and footer already established in the site. Same `<link rel="stylesheet" href="/css/style.css">` and same shared nav/footer HTML.

Also update the support hub page at `/rockterm/support/index.html` to link to all of these articles, organized by category.

---

## Directory Structure (new additions)

```
~/rockriver-site/rockterm/support/
├── index.html                                    # (update existing — add article links)
├── ssh-connection-refused/
│   └── index.html
├── ssh-key-authentication/
│   └── index.html
├── ssh-host-key-verification/
│   └── index.html
├── ssh-connection-timeout/
│   └── index.html
├── ssh-agent-forwarding/
│   └── index.html
├── managing-connection-profiles/
│   └── index.html
├── configuring-ai-features/
│   └── index.html
├── ai-api-key-setup/
│   └── index.html
├── ai-not-responding/
│   └── index.html
├── ai-privacy-and-data/
│   └── index.html
├── terminal-fonts-and-display/
│   └── index.html
├── terminal-encoding-issues/
│   └── index.html
├── keyboard-shortcuts/
│   └── index.html
├── microsoft-store-installation/
│   └── index.html
├── free-trial-and-licensing/
│   └── index.html
├── updating-rockterm/
│   └── index.html
├── proxy-and-jump-host/
│   └── index.html
├── multiple-sessions-and-tabs/
│   └── index.html
├── import-export-connections/
│   └── index.html
└── logs-and-diagnostics/
    └── index.html
```

---

## Update Support Hub — `/rockterm/support/index.html`

Replace the current content with a categorized article index. Use section headings for each category with article links underneath. Each link should show the article title and a one-line description.

**Categories and articles:**

**SSH Connections**
- SSH Connection Refused — What to check when the remote host refuses your connection
- SSH Connection Timeout — Diagnosing slow or timed-out connections
- SSH Host Key Verification — Understanding host key warnings and how to handle them
- SSH Key Authentication — Setting up and troubleshooting key-based auth
- SSH Agent Forwarding — Forwarding keys through jump hosts
- Proxy and Jump Host Configuration — Connecting through bastion hosts and proxies

**Connection Management**
- Managing Connection Profiles — Creating, editing, organizing, and grouping saved connections
- Multiple Sessions and Tabs — Working with multiple SSH sessions simultaneously
- Import and Export Connections — Backing up and migrating your connection profiles

**AI Features**
- Configuring AI Features — Enabling and setting up AI assistance
- AI API Key Setup — Configuring your Anthropic API key for AI features
- AI Not Responding — Troubleshooting AI feature issues
- AI Privacy and Data — Understanding what data is sent and when

**Terminal & Display**
- Terminal Fonts and Display — Customizing fonts, colors, and appearance
- Terminal Encoding Issues — Fixing garbled text and character display problems
- Keyboard Shortcuts — Default shortcuts and customization

**Installation & Licensing**
- Microsoft Store Installation — Installing and repairing RockTerm
- Free Trial and Licensing — Trial details, purchasing, and license scope
- Updating RockTerm — How updates work through the Microsoft Store

**Diagnostics**
- Logs and Diagnostics — Finding logs and gathering diagnostic info for support

Keep the contact info at the bottom: "Still need help? Email support@rockriverresearch.com"

---

## Article Content

Each article should follow this format:
- Page title in the `<title>` tag: "{Article Title} — RockTerm Support — Rock River Research"
- Breadcrumb at the top: Home > RockTerm > Support > {Article Title} (each segment linked)
- H1 with the article title
- A "Last updated: April 2026" line below the heading in muted text
- Clear, technical content written for the target audience (network engineers, sysadmins)
- Use code blocks with the monospace styling for any commands, paths, or config examples
- End each article with a "Still need help?" section linking to the contact page and support email

---

### 1. SSH Connection Refused — `/rockterm/support/ssh-connection-refused/index.html`

Title: "SSH Connection Refused"

Content: Explain the "Connection refused" error. Walk through the causes in order of likelihood:

1. **SSH service not running on the remote host.** Explain that the remote machine's SSH daemon (sshd) may not be running. If you have out-of-band access (console, IPMI, iDRAC, iLO), check with `systemctl status sshd` or `service ssh status`. On network devices (Cisco IOS/IOS-XE), verify SSH is enabled with `show ip ssh` and that VTY lines accept SSH with `show run | section line vty`.

2. **Wrong port.** Default is 22 but many environments use non-standard ports. Verify the port in your connection profile matches what the remote host is listening on. On the remote, check with `ss -tlnp | grep ssh` or `netstat -tlnp | grep ssh`.

3. **Firewall blocking the connection.** The remote host's firewall (iptables, firewalld, Windows Firewall, or an infrastructure firewall/ACL) may be blocking port 22. For Linux, check `iptables -L -n` or `firewall-cmd --list-all`. For Cisco ASA or IOS ACLs, check `show access-lists`. For Windows hosts, check Windows Defender Firewall.

4. **Host-based access restrictions.** The SSH daemon config (`/etc/ssh/sshd_config`) may restrict connections via `AllowUsers`, `AllowGroups`, `DenyUsers`, or `ListenAddress`. If sshd is bound to a specific IP (e.g., management VLAN), connecting from another interface won't work.

5. **TCP wrappers.** On older Linux systems, `/etc/hosts.allow` and `/etc/hosts.deny` may restrict SSH access.

6. **Network path issue.** Verify basic connectivity: can you ping the host? Can you telnet/nc to the SSH port? (`Test-NetConnection -ComputerName hostname -Port 22` on Windows.) If ping works but port 22 doesn't, it's a firewall or service issue.

Include a quick checklist summary at the end.

---

### 2. SSH Key Authentication — `/rockterm/support/ssh-key-authentication/index.html`

Title: "SSH Key Authentication"

Content: Walk through setting up and troubleshooting key-based authentication.

**Generating a key pair.** Explain `ssh-keygen -t ed25519` (preferred) or `ssh-keygen -t rsa -b 4096`. On Windows, this works in PowerShell or Windows Terminal. Explain the default key location: `C:\Users\<username>\.ssh\id_ed25519` and `id_ed25519.pub`. Mention passphrases — recommended but optional.

**Adding the public key to the remote host.** Copy the contents of the `.pub` file to `~/.ssh/authorized_keys` on the remote host. Each key on its own line. Mention `ssh-copy-id` if available. For network devices, the process varies — Cisco IOS uses `ip ssh pubkey-chain` and `key-string`.

**Configuring RockTerm.** In the connection profile, set the authentication method to "Key" and browse to your private key file. If the key has a passphrase, RockTerm will prompt for it on connection.

**Common issues:**
- **Permissions.** On the remote host, `~/.ssh` must be 700, `authorized_keys` must be 600. The home directory itself must not be group-writable. Wrong permissions = silent failure, sshd will fall back to password auth.
- **Wrong key format.** If you generated keys with PuTTYgen (.ppk format), they need to be converted. RockTerm uses OpenSSH format. PuTTYgen can export to OpenSSH format, or use `ssh-keygen -i -f key.ppk`.
- **sshd_config settings.** The remote host needs `PubkeyAuthentication yes` and `AuthorizedKeysFile .ssh/authorized_keys` (these are defaults but may have been changed).
- **SELinux.** On RHEL/CentOS, SELinux can block sshd from reading authorized_keys if the file context is wrong. Fix with `restorecon -Rv ~/.ssh`.

---

### 3. SSH Host Key Verification — `/rockterm/support/ssh-host-key-verification/index.html`

Title: "SSH Host Key Verification"

Content: Explain what host key verification is and why it matters.

**What's happening:** The first time you connect to a host, RockTerm stores the server's public key fingerprint. On subsequent connections, it compares the current key against the stored one. This prevents man-in-the-middle attacks.

**First connection:** RockTerm will display the host key fingerprint and ask you to verify and accept. Best practice: verify the fingerprint out-of-band (check it on the server console with `ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub`). In practice, most people accept on first connection (TOFU — Trust On First Use) and rely on the warning if it changes.

**"Host key has changed" warning:** This is a serious warning. It means the server's key is different from what RockTerm previously recorded. Common legitimate causes:
- The server was rebuilt or reimaged
- The OS was reinstalled
- SSH was reinstalled and new host keys were generated
- You're connecting to a different server at the same IP (e.g., DHCP reassignment, load balancer)

**If the change is expected:** Remove the old key from RockTerm's known hosts. Explain where RockTerm stores known hosts and how to clear a specific entry.

**If the change is NOT expected:** Do not proceed. This could indicate a MITM attack, DNS spoofing, or ARP poisoning. Investigate before connecting. Contact the server administrator.

---

### 4. SSH Connection Timeout — `/rockterm/support/ssh-connection-timeout/index.html`

Title: "SSH Connection Timeout"

Content: Diagnose connections that hang or time out.

**DNS resolution delays.** If the hostname takes a long time to resolve, the connection will appear to hang before timing out. Test with `nslookup hostname` or `Resolve-DnsName hostname` in PowerShell. Try connecting by IP to bypass DNS.

**Network routing issues.** Traffic may be routed to a black hole, or a firewall may be silently dropping packets (DROP instead of REJECT — you get a timeout instead of connection refused). Use `tracert hostname` on Windows to see where the path breaks.

**Reverse DNS lookup by sshd.** The SSH server often performs a reverse DNS lookup on your connecting IP. If reverse DNS is slow or misconfigured, the connection hangs during authentication. The server admin can set `UseDNS no` in `sshd_config` to fix this.

**Firewall silently dropping.** Unlike "connection refused" (port closed but reachable), a timeout usually means packets are being dropped. Check intermediate firewalls, VPN routing, and ACLs.

**RockTerm connection timeout setting.** Explain where to configure the connection timeout value in RockTerm's settings. The default may be too short for high-latency connections (satellite links, international connections). Increase the timeout for these scenarios.

**Session keepalive.** If connections drop after being idle, this is a different issue — an intermediate device (NAT gateway, firewall) is expiring the idle TCP session. RockTerm can send keepalive packets at a configurable interval to prevent this. Explain where to enable and set the keepalive interval.

---

### 5. SSH Agent Forwarding — `/rockterm/support/ssh-agent-forwarding/index.html`

Title: "SSH Agent Forwarding"

Content: Explain agent forwarding for jump host / bastion host workflows.

**What it is:** Agent forwarding lets you use your local SSH keys to authenticate to a second (or third) host through an intermediate host, without copying your private key to the intermediate host.

**Use case:** You SSH to a bastion host (jumpbox), then from there SSH to internal servers. With agent forwarding, the internal server authenticates using your local key — the bastion never sees your private key.

**How to enable in RockTerm:** In the connection profile, enable the agent forwarding option. Your local SSH agent must be running and have your key loaded.

**Windows SSH Agent:** Explain that Windows has a built-in SSH agent service (OpenSSH Authentication Agent). It may be disabled by default. To enable: Services → OpenSSH Authentication Agent → Set to Automatic → Start. Add your key with `ssh-add C:\Users\<username>\.ssh\id_ed25519`.

**Security warning:** Only enable agent forwarding to hosts you trust. A malicious admin on the intermediate host could potentially use your forwarded agent to authenticate as you to other systems while your session is active. Never enable agent forwarding to untrusted or shared systems.

---

### 6. Proxy and Jump Host Configuration — `/rockterm/support/proxy-and-jump-host/index.html`

Title: "Proxy and Jump Host Configuration"

Content: Connecting through bastion hosts and proxies.

**Jump host / bastion host:** Explain the concept — a hardened intermediate server that acts as the entry point to an internal network. Common in enterprise and cloud environments. All SSH access to internal servers goes through the bastion.

**Configuring in RockTerm:** Explain how to set up a connection profile that routes through a jump host. The connection first establishes a session to the bastion, then tunnels through to the target host.

**HTTP/SOCKS proxy:** If you're behind a corporate proxy, RockTerm can tunnel SSH through an HTTP CONNECT proxy or a SOCKS5 proxy. Explain where to configure proxy settings in the connection profile — proxy type, host, port, and optional credentials.

**Chained connections:** Some environments require multiple hops (laptop → bastion → management network → device). Describe how this works conceptually and how RockTerm handles it.

---

### 7. Managing Connection Profiles — `/rockterm/support/managing-connection-profiles/index.html`

Title: "Managing Connection Profiles"

Content: How to use the connection manager effectively.

**Creating a profile.** Walk through each field: display name, hostname/IP, port, username, authentication method (password or key), key file path if applicable.

**Organizing with groups.** Explain the grouping feature. Suggest practical organization strategies: by environment (production, staging, dev, lab), by project, by client, by site/datacenter, or by device type (routers, switches, servers, firewalls).

**Editing and deleting profiles.** How to modify an existing profile. How to delete profiles.

**Duplicate profile.** If you need to create a similar connection (same host, different user, or same credentials, different host), you can duplicate an existing profile and modify the differences.

**Quick connect.** For one-off connections that don't need a saved profile, explain the quick connect option — type in host, port, user, and go.

---

### 8. Multiple Sessions and Tabs — `/rockterm/support/multiple-sessions-and-tabs/index.html`

Title: "Multiple Sessions and Tabs"

Content: Working with multiple simultaneous SSH sessions.

Explain how RockTerm handles multiple connections in tabs. How to open a new tab, switch between tabs, close a tab (and what happens to the SSH session). Keyboard shortcuts for tab navigation.

Mention that each tab is an independent SSH session. Disconnecting one doesn't affect others. If you close a tab with an active session, RockTerm will prompt for confirmation.

---

### 9. Import and Export Connections — `/rockterm/support/import-export-connections/index.html`

Title: "Import and Export Connections"

Content: Backing up and migrating your connection profiles.

**Export:** Explain how to export all connection profiles for backup or migration to another machine. Describe the export format.

**Import:** How to import profiles from an export file. Describe how duplicates are handled.

**Migration from other SSH clients:** If possible, describe how users migrating from PuTTY can import their sessions. PuTTY stores sessions in the Windows registry under `HKEY_CURRENT_USER\SOFTWARE\SimonTatham\PuTTY\Sessions`. A brief note about migrating from other clients (MobaXterm, SecureCRT, etc.) would be helpful — even if it's just "manual re-entry is required for these clients."

---

### 10. Configuring AI Features — `/rockterm/support/configuring-ai-features/index.html`

Title: "Configuring AI Features"

Content: Setting up and using RockTerm's AI integration.

**What the AI can do:** The AI assistant has visibility into your terminal session context. It can help interpret error messages, suggest commands, explain output, help with configuration syntax (Cisco IOS, Linux, etc.), and answer networking and systems questions — all without leaving your terminal.

**Enabling AI:** AI features are disabled by default. Walk through enabling them in RockTerm settings.

**How to use it:** Explain the interaction model — how to invoke the AI (keyboard shortcut, button, command), how to ask it a question, how to ask it about something currently on screen. Explain that the AI sees recent terminal output for context.

**Examples of useful prompts:**
- "What does this error mean?" (with error visible in terminal)
- "How do I configure OSPF on this interface?" (while connected to a Cisco router)
- "Explain this routing table output"
- "What's the command to check disk usage on this server?"
- "Help me write a firewall rule to allow HTTPS inbound"

**Limitations:** The AI is not connected to your devices. It can see terminal output but it cannot execute commands. It's an advisor, not an operator. Always verify AI suggestions before executing commands, especially on production infrastructure.

---

### 11. AI API Key Setup — `/rockterm/support/ai-api-key-setup/index.html`

Title: "AI API Key Setup"

Content: How to configure the Anthropic API key for AI features.

**Getting an API key:** Go to console.anthropic.com, create an account, and generate an API key. Explain that the Anthropic API is a paid service with usage-based pricing. RockTerm itself doesn't charge for AI features — the cost is your API usage with Anthropic.

**Entering the key in RockTerm:** Explain where in settings to enter the API key.

**API key security:** The API key is stored locally on your machine in RockTerm's configuration. It is never transmitted anywhere except directly to Anthropic's API endpoint. Treat it like a password — don't share it.

**Usage and cost:** AI queries consume API tokens. Normal terminal assistance usage is very lightweight — a few cents per day for typical use. Explain that users can monitor their API usage and set spending limits in their Anthropic console.

---

### 12. AI Not Responding — `/rockterm/support/ai-not-responding/index.html`

Title: "AI Not Responding"

Content: Troubleshooting when AI features aren't working.

**Check your internet connection.** AI features require outbound HTTPS access to the Anthropic API (`api.anthropic.com`).

**Verify your API key.** An invalid, expired, or revoked API key will cause silent failures. Go to console.anthropic.com and verify your key is active. Try regenerating a new key and entering it in RockTerm settings.

**API rate limits or billing issues.** If you've exceeded your API rate limit or your Anthropic account has a billing issue, requests will fail. Check your Anthropic dashboard for usage and billing status.

**Corporate firewall or proxy blocking API access.** If you're on a corporate network, outbound HTTPS to `api.anthropic.com` may be blocked. Check with your network team. If you're using a proxy, ensure RockTerm's proxy settings include the API endpoint.

**Anthropic API outage.** Occasionally the API may experience downtime. Check status.anthropic.com for current status.

**AI features disabled.** Verify AI features are enabled in RockTerm settings — they're off by default.

---

### 13. AI Privacy and Data — `/rockterm/support/ai-privacy-and-data/index.html`

Title: "AI Privacy and Data"

Content: What data the AI features send and when.

**When data is sent:** Only when you explicitly invoke the AI assistant. RockTerm never sends terminal data to any external service in the background. No telemetry, no automatic uploads.

**What is sent:** When you ask the AI a question, RockTerm sends your prompt and recent terminal context (visible output in the current session) to the Anthropic API. This gives the AI the context it needs to provide relevant answers.

**What is NOT sent:** Your SSH credentials (passwords, key files) are never included in AI queries. Connection profile details (hostnames, IPs, usernames) that appear in terminal output may be visible in the context sent to the AI — this is inherent in sending terminal output for context.

**Data retention by Anthropic:** Refer users to Anthropic's privacy policy and data retention documentation for details on how Anthropic handles API data. Note that Anthropic's API is subject to their own terms and privacy policy.

**Sensitive environments:** If you work in environments with strict data handling requirements (government, healthcare, financial), evaluate whether sending terminal output to an external API meets your compliance requirements. AI features can be disabled entirely if needed. When working on sensitive systems, consider disabling AI features for those specific sessions.

**Local data:** All RockTerm settings, connection profiles, and session data remain local on your machine. Nothing is sent to Rock River Research.

---

### 14. Terminal Fonts and Display — `/rockterm/support/terminal-fonts-and-display/index.html`

Title: "Terminal Fonts and Display"

Content: Customizing the terminal appearance.

**Changing the font.** Explain where in settings to change the terminal font. Recommend monospace fonts that render well for terminal use: Cascadia Code (ships with Windows Terminal), Consolas (ships with Windows), JetBrains Mono (free download), Fira Code (free download). Explain that proportional fonts will make terminal output misalign — always use monospace.

**Font size.** How to adjust font size. Mention that Ctrl+scroll wheel may work for quick zoom.

**Color scheme.** Explain terminal color configuration — background, foreground, and the 16 ANSI colors. If RockTerm has preset themes, list them. If it's manual, explain the color settings.

**High DPI / scaling.** If the terminal text looks blurry on a high-DPI display, explain how Windows scaling interacts with RockTerm and any relevant settings to fix it.

---

### 15. Terminal Encoding Issues — `/rockterm/support/terminal-encoding-issues/index.html`

Title: "Terminal Encoding Issues"

Content: Fixing garbled text and character display problems.

**UTF-8 is the default.** RockTerm defaults to UTF-8 encoding. Most modern systems use UTF-8. If you're seeing garbled text, the remote system may be using a different encoding.

**Symptoms:** Garbled characters, question marks, boxes, or mojibake (wrong characters displayed). Common when connecting to legacy systems, some Asian locale systems, or older network devices with limited character set support.

**Checking the remote encoding.** On Linux: `echo $LANG` or `locale`. Should show something like `en_US.UTF-8`. If it shows something else (e.g., `ISO-8859-1`, `EUC-JP`), there's a mismatch.

**Fixing it:** Either change the remote system's locale to UTF-8, or change RockTerm's encoding setting for that connection to match the remote system's encoding.

**Network device output.** Some network devices output non-UTF-8 characters in certain show commands (e.g., special characters in SNMP descriptions, interface aliases). This is normal — the device's character handling is limited.

---

### 16. Keyboard Shortcuts — `/rockterm/support/keyboard-shortcuts/index.html`

Title: "Keyboard Shortcuts"

Content: Reference page for RockTerm keyboard shortcuts.

Present in a clean table format. Include reasonable defaults for a terminal emulator:

**Session management:**
- New connection tab: `Ctrl+T`
- Close current tab: `Ctrl+W`
- Next tab: `Ctrl+Tab`
- Previous tab: `Ctrl+Shift+Tab`
- Reconnect: `Ctrl+R`

**Terminal:**
- Copy: `Ctrl+Shift+C`
- Paste: `Ctrl+Shift+V`
- Find in terminal: `Ctrl+Shift+F`
- Clear scrollback: `Ctrl+Shift+K`
- Increase font size: `Ctrl+Plus`
- Decrease font size: `Ctrl+Minus`
- Reset font size: `Ctrl+0`

**AI:**
- Invoke AI assistant: `Ctrl+Space` (or whatever the actual shortcut is)

**General:**
- Open settings: `Ctrl+Comma`
- Open connection manager: `Ctrl+Shift+N`
- Toggle fullscreen: `F11`

Add a note that shortcuts may be customizable in settings.

---

### 17. Microsoft Store Installation — `/rockterm/support/microsoft-store-installation/index.html`

Title: "Microsoft Store Installation"

Content: Installing, repairing, and reinstalling RockTerm.

**Installing:** Open the Microsoft Store, search for "RockTerm", click Install (or "Free Trial" to start the trial). RockTerm will download and appear in your Start menu.

**Repairing:** If RockTerm is misbehaving, try repairing before reinstalling. Go to Settings → Apps → Installed Apps → RockTerm → Advanced Options → Repair. This fixes corrupted files without losing your settings.

**Resetting:** If repair doesn't help, try Reset (same location). This restores RockTerm to its default state. Warning: this will clear your settings. Your connection profiles may or may not be affected — back them up first using the export feature.

**Reinstalling:** Uninstall from Settings → Apps, then reinstall from the Microsoft Store.

**Offline installation / MSIX sideloading:** RockTerm is distributed exclusively through the Microsoft Store. Sideloading is not officially supported.

---

### 18. Free Trial and Licensing — `/rockterm/support/free-trial-and-licensing/index.html`

Title: "Free Trial and Licensing"

Content: Trial details, purchasing, and license scope.

**Free trial:** RockTerm offers a free trial through the Microsoft Store. The trial is fully functional — no feature limitations. The trial period is defined in the Store listing.

**Purchasing:** When you're ready to buy, purchase through the Microsoft Store. It's a one-time purchase — no subscription, no recurring charges.

**License scope:** Your license is tied to your Microsoft account. You can install RockTerm on any Windows device signed in with your Microsoft account, consistent with Microsoft Store licensing terms.

**Commercial use:** The license permits both personal and commercial use. No separate enterprise license is needed.

**AI feature costs:** The RockTerm license does not include AI API usage. AI features use your own Anthropic API key, billed separately by Anthropic based on your usage.

---

### 19. Updating RockTerm — `/rockterm/support/updating-rockterm/index.html`

Title: "Updating RockTerm"

Content: How updates work.

**Automatic updates:** The Microsoft Store handles updates automatically. When a new version is available, it will download and install in the background. You may need to close and reopen RockTerm for the update to take effect.

**Manual update check:** Open the Microsoft Store → Library → Get Updates. This forces a check for available updates.

**Changelog:** See the [changelog](/rockterm/changelog/) for details on what's included in each update.

**Settings after update:** Updates preserve your settings and connection profiles. No reconfiguration needed.

---

### 20. Logs and Diagnostics — `/rockterm/support/logs-and-diagnostics/index.html`

Title: "Logs and Diagnostics"

Content: Finding logs and gathering information for support.

**Log location.** Explain where RockTerm stores its log files (likely in `%LOCALAPPDATA%\RockTerm\logs\` or similar). Describe what's in the logs — connection attempts, errors, application events. Logs do NOT contain terminal output or SSH credentials.

**Enabling verbose logging.** If standard logs don't show enough detail, explain how to enable debug/verbose logging in settings.

**What to include in a support request.** When emailing support@rockriverresearch.com, include:
- RockTerm version number (found in Help → About or Settings)
- Windows version (`winver` command)
- A description of the problem and steps to reproduce it
- Relevant log excerpts
- Screenshots if applicable

**Session logging.** Separately from application logs, RockTerm may offer session logging — saving terminal output to a file. Explain how to enable this per session if available. Note that session logs may contain sensitive information — handle them accordingly.

---

## Navigation Updates

Update the main site nav's "Support" dropdown to include a link to the support article index at `/rockterm/support/`. The full article list should be accessible from the support hub page, not the nav dropdown — the dropdown just links to the hub.

## Commit

After creating all files and updating existing pages, make a single git commit with the message: "Add RockTerm support articles — 20 detailed guides".
