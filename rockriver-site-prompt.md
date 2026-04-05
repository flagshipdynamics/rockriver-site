# Rock River Research Website — Build Instructions

Run `mkdir -p ~/rockriver-site && cd ~/rockriver-site && git init`.

Create a static website for Rock River Research, LLC. No build tools, no static site generators, no frameworks. Plain HTML, CSS, and minimal JS. Every page is an `index.html` inside its directory so URLs stay clean (e.g., `/rockterm/` serves `rockterm/index.html`).

---

## Directory Structure

```
~/rockriver-site/
├── index.html                          # Home page
├── css/
│   └── style.css                       # Shared stylesheet (all pages link to this)
├── js/
│   └── main.js                         # Shared JS (mobile nav toggle, etc.)
├── images/                             # Placeholder directory for future images/screenshots
│   └── .gitkeep
├── about/
│   └── index.html
├── contact/
│   └── index.html
├── privacy/
│   └── index.html
├── terms/
│   └── index.html
├── rockterm/
│   ├── index.html                      # RockTerm product landing page
│   ├── features/
│   │   └── index.html
│   ├── getting-started/
│   │   └── index.html
│   ├── support/
│   │   └── index.html
│   ├── faq/
│   │   └── index.html
│   ├── troubleshooting/
│   │   └── index.html
│   ├── system-requirements/
│   │   └── index.html
│   └── changelog/
│       └── index.html
├── favicon.ico                         # Placeholder (1x1 transparent or simple "RR" icon)
├── README.md
└── .gitignore
```

---

## Global Design System (css/style.css)

- **Dark theme.** Background: `#0d1117`. Primary text: `#e6edf3`. Secondary/muted text: `#8b949e`. Accent: `#58a6ff`. Accent hover: `#79c0ff`. Borders: `#30363d`. Surface/card background: `#161b22`.
- **Font:** System stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif`.
- **Max content width:** 960px, centered with `margin: 0 auto`, horizontal padding 20px.
- **Responsive:** Single breakpoint at 768px. Nav collapses to hamburger menu on mobile.
- **Links:** Accent color, no underline. Underline on hover.
- **Code/monospace elements:** Use `'Cascadia Code', 'Fira Code', 'Consolas', monospace`. Background `#1c2128`, border `1px solid #30363d`, slight border-radius, padding.
- **Buttons:** Primary button: accent background, `#0d1117` text, rounded corners (6px), padding `12px 24px`. Hover: lighten background. Secondary/outline button: transparent background, accent border, accent text.
- **Cards/feature blocks:** Background `#161b22`, border `1px solid #30363d`, border-radius 8px, padding 24px.
- **No animations or scroll effects.** Keep it fast.
- **Print-friendly:** `@media print` block that switches to light background, dark text.

---

## Shared HTML Structure (every page)

Every page must use paths relative to root with leading slashes so they work at any depth (e.g., `/css/style.css`, not `../../css/style.css`).

### Head

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{Page Title} — Rock River Research</title>
  <meta name="description" content="{page-specific description}">
  <link rel="stylesheet" href="/css/style.css">
  <link rel="icon" href="/favicon.ico">
</head>
```

### Nav (consistent on every page)

```
Rock River Research, LLC          [Products v] [Support v] [About] [Contact]
```

- "Rock River Research, LLC" links to `/`.
- "Products" dropdown: RockTerm → `/rockterm/`
- "Support" dropdown: Getting Started → `/rockterm/getting-started/`, FAQ → `/rockterm/faq/`, Troubleshooting → `/rockterm/troubleshooting/`, System Requirements → `/rockterm/system-requirements/`
- "About" links to `/about/`
- "Contact" links to `/contact/`
- On mobile: hamburger icon, full-screen overlay or slide-out menu.

### Footer (consistent on every page)

```
© 2026 Rock River Research, LLC. All rights reserved.
[Privacy Policy] [Terms of Service] [Contact]
Based in Tennessee.
```

All footer links use absolute paths.

### JS (js/main.js)

Just the mobile nav toggle logic. No libraries.

---

## Page Content

### 1. Home — `/index.html`

**Meta description:** "Rock River Research, LLC — professional-grade software tools for technical users."

**Hero section:**
- Headline: "Software Built for Professionals"
- Subtext: "Rock River Research builds practical, high-performance tools for network engineers, system administrators, and technical professionals."
- CTA button: "Explore RockTerm" → links to `/rockterm/`

**Product highlight section:**
- Section headline: "Our Products"
- Card for RockTerm:
  - Name: "RockTerm"
  - Short description: "A modern SSH terminal emulator with integrated AI assistance. Connect to your infrastructure faster, troubleshoot smarter, and work more efficiently — all from a single interface."
  - Link: "Learn More →" to `/rockterm/`

**Why Rock River section (short):**
- 3 cards in a row (stack on mobile):
  - "Built by Practitioners" — "Our tools are designed by engineers who use them. Every feature solves a real problem."
  - "Professional Grade" — "No electron wrappers, no bloat. Native performance and clean architecture."
  - "Active Development" — "Continuous improvement driven by real-world usage and direct user feedback."

---

### 2. About — `/about/index.html`

**Meta description:** "About Rock River Research, LLC — a Tennessee-based software company building tools for technical professionals."

**Content:**

Headline: "About Rock River Research"

Body (write as flowing paragraphs, not bullet points):

Rock River Research, LLC is a software development company based in Tennessee. We focus on building professional-grade tools that solve real problems for technical users — network engineers, system administrators, and infrastructure teams.

The company was founded on a simple idea: the tools professionals rely on every day should be fast, reliable, and thoughtfully designed. Too many developer tools are bloated, overengineered, or built by people who don't actually use them. We take a different approach — building software we use ourselves, iterating based on real-world workflows.

Our first product, RockTerm, is a modern SSH terminal emulator with integrated AI capabilities. It represents our philosophy: take a tool that every network professional uses daily, and make it meaningfully better without adding complexity.

Rock River Research, LLC is a Wyoming LLC.

---

### 3. Contact — `/contact/index.html`

**Meta description:** "Contact Rock River Research for support, feedback, or inquiries."

Headline: "Contact Us"

Content:

For general inquiries: contact@rockriverresearch.com

For RockTerm support: support@rockriverresearch.com

Include a note: "For RockTerm technical support, please visit our [support page](/rockterm/support/) for FAQs and troubleshooting guides before reaching out."

---

### 4. Privacy Policy — `/privacy/index.html`

**Meta description:** "Rock River Research, LLC privacy policy."

Headline: "Privacy Policy"

Effective date: April 2026.

Write a real, substantive privacy policy appropriate for a desktop application sold through the Microsoft Store. Cover these topics in clearly labeled subsections (use heading tags, not bullet lists):

- **Information We Collect** — RockTerm does not collect personal data. No telemetry, no usage analytics, no tracking. The AI integration features may send terminal context to third-party AI providers (e.g., Anthropic's Claude API) when explicitly initiated by the user. No data is sent without user action.
- **Microsoft Store** — Purchases are handled by Microsoft. Microsoft collects payment and account information per their own privacy policy. Rock River Research does not receive or store your payment details.
- **Data Storage** — All user data (SSH connection profiles, settings, session history) is stored locally on the user's machine. Nothing is transmitted to Rock River Research servers.
- **Third-Party Services** — When AI features are used, the data sent to the AI provider is governed by that provider's privacy policy. Users can disable AI features entirely.
- **Children's Privacy** — RockTerm is not designed for children under 13.
- **Changes to This Policy** — We may update this policy. Changes will be posted on this page with an updated effective date.
- **Contact** — Questions about this policy: contact@rockriverresearch.com.

---

### 5. Terms of Service — `/terms/index.html`

**Meta description:** "Rock River Research, LLC terms of service."

Headline: "Terms of Service"

Effective date: April 2026.

Write terms of service covering:

- **Acceptance** — By using RockTerm, you agree to these terms.
- **License** — RockTerm is licensed, not sold. One-time purchase grants a license for personal or commercial use on devices associated with your Microsoft account, per Microsoft Store terms.
- **AI Features** — AI-assisted features are provided as-is. AI output may be inaccurate. Users are responsible for verifying any actions suggested by AI features. Do not rely on AI output for critical infrastructure changes without independent verification.
- **Prohibited Use** — Do not reverse-engineer, decompile, or redistribute the software. Do not use the software for any unlawful purpose.
- **Disclaimer of Warranties** — The software is provided as-is. No warranty of any kind, express or implied.
- **Limitation of Liability** — Rock River Research, LLC is not liable for any damages arising from use of the software, including but not limited to data loss, system downtime, or misconfigurations resulting from AI-suggested actions.
- **Governing Law** — These terms are governed by the laws of the state of Wyoming.
- **Contact** — contact@rockriverresearch.com.

---

### 6. RockTerm Product Landing — `/rockterm/index.html`

**Meta description:** "RockTerm — a modern SSH terminal emulator with AI integration for network engineers and sysadmins."

**Hero:**
- Headline: "RockTerm"
- Subline: "A modern SSH terminal emulator with integrated AI assistance."
- Description paragraph: "Built for network engineers and system administrators who spend their day in the terminal. RockTerm combines a fast, reliable SSH client with AI-powered assistance that understands your infrastructure context. Diagnose issues faster, automate repetitive tasks, and manage connections efficiently."
- Primary CTA button: "Get RockTerm on the Microsoft Store" → links to `#` for now (placeholder).
- Secondary CTA: "View System Requirements" → `/rockterm/system-requirements/`

**Feature highlights (cards, 2-column grid on desktop, stack on mobile):**

1. "AI-Powered Terminal" — "Get contextual AI assistance right inside your terminal session. Ask questions about command output, get help with configuration syntax, or troubleshoot errors — without leaving your workflow."
2. "Fast & Native" — "Built with native UI toolkits for responsive performance. No Electron, no web views. Launches fast, stays fast."
3. "Connection Management" — "Organize SSH connections with saved profiles. Group hosts by environment, project, or role. Connect with one click."
4. "Secure by Default" — "SSH key management, agent forwarding, and standard SSH protocol support. Your credentials and sessions stay on your machine."
5. "Professional Interface" — "Clean, modern dark interface designed for extended use. Multiple tabbed sessions, customizable appearance, and a distraction-free layout."
6. "Microsoft Store Distribution" — "Install and update through the Microsoft Store. Clean installation, automatic updates, and easy licensing."

**Bottom CTA:**
- "Ready to get started?" → link to Getting Started page.

---

### 7. RockTerm Features — `/rockterm/features/index.html`

**Meta description:** "RockTerm features — AI terminal assistance, SSH connection management, and more."

Headline: "Features"

Write a more detailed breakdown of RockTerm's capabilities. Organize into sections with headings:

**AI Integration**
Describe how the AI assistant works within the terminal. It can read terminal output context, help interpret error messages, suggest commands, and explain complex output. Emphasize that AI is opt-in — nothing is sent to any AI provider unless the user explicitly triggers it. The AI understands networking context: routing tables, interface configurations, log output, etc.

**SSH Terminal**
Fast terminal emulation, support for standard SSH connections, key-based authentication, configurable terminal settings (font, colors, scrollback buffer). Multiple simultaneous sessions in tabs.

**Connection Manager**
Saved connection profiles with host, port, username, key file. Organized groups. Quick-connect.

**Interface**
Dark theme optimized for extended use. Resizable panes. Customizable font and color settings. Keyboard-driven workflow with configurable shortcuts.

**Microsoft Store Integration**
Installed from the Store. Automatic updates. Free trial available so users can evaluate before purchasing. One-time purchase — no subscription.

---

### 8. Getting Started — `/rockterm/getting-started/index.html`

**Meta description:** "Get started with RockTerm — installation, setup, and your first SSH connection."

Headline: "Getting Started with RockTerm"

Write a straightforward quickstart guide:

**Step 1: Install RockTerm**
Download from the Microsoft Store (link placeholder). The free trial includes full functionality. Launch after installation.

**Step 2: Create a Connection**
Open the connection manager. Click "New Connection." Enter your host, port (default 22), and username. Choose your authentication method — password or SSH key. Save the profile.

**Step 3: Connect**
Select your saved connection and click Connect. RockTerm opens a new terminal tab with your SSH session.

**Step 4: Using AI Assistance**
With an active terminal session, invoke the AI assistant (describe the general mechanism — keyboard shortcut or UI button). The AI can see your recent terminal output and provide contextual help. Ask it about error messages, command syntax, or configuration questions.

**Tips:**
- Organize connections into groups for different environments (production, staging, lab).
- Customize your terminal font and colors in Settings.
- AI features require an active internet connection for the AI provider API.

---

### 9. Support Hub — `/rockterm/support/index.html`

**Meta description:** "RockTerm support — find help, FAQs, and troubleshooting guides."

Headline: "RockTerm Support"

Brief intro: "Find answers to common questions, troubleshoot issues, or contact us directly."

Link cards to:
- [Frequently Asked Questions](/rockterm/faq/) — "Common questions about RockTerm features, licensing, and usage."
- [Troubleshooting](/rockterm/troubleshooting/) — "Solutions for common issues and error messages."
- [System Requirements](/rockterm/system-requirements/) — "Check hardware and software requirements."
- [Getting Started](/rockterm/getting-started/) — "New to RockTerm? Start here."
- [Changelog](/rockterm/changelog/) — "See what's new in the latest release."

Contact: "Can't find what you're looking for? Email us at support@rockriverresearch.com."

---

### 10. FAQ — `/rockterm/faq/index.html`

**Meta description:** "Frequently asked questions about RockTerm."

Headline: "Frequently Asked Questions"

Use collapsible `<details><summary>` elements for each question. No JS needed.

Questions and answers:

**What is RockTerm?**
RockTerm is a modern SSH terminal emulator for Windows with integrated AI assistance. It's built for network engineers, sysadmins, and technical professionals who need a fast, reliable terminal client.

**How much does RockTerm cost?**
RockTerm is a one-time purchase through the Microsoft Store. A free trial is available so you can evaluate the full product before buying. There is no subscription.

**What does the AI integration do?**
The AI assistant can read your terminal context and provide help — interpreting error messages, suggesting commands, explaining output, and answering technical questions. AI features are opt-in. Nothing is sent to any external service unless you explicitly ask the AI for help.

**Which AI provider does RockTerm use?**
RockTerm integrates with Anthropic's Claude API for AI features.

**Does RockTerm collect my data?**
No. RockTerm does not collect telemetry, usage data, or analytics. All your connection profiles and settings are stored locally on your machine. See our [Privacy Policy](/privacy/) for details.

**Is RockTerm available on Mac or Linux?**
Currently RockTerm is available for Windows only, distributed through the Microsoft Store. Other platforms may be considered in the future.

**Can I use RockTerm for commercial/work purposes?**
Yes. The license permits both personal and commercial use.

**How do I get updates?**
Updates are delivered through the Microsoft Store automatically.

**Where are my connection profiles stored?**
Locally on your machine. RockTerm does not sync data to any cloud service.

**I found a bug or have a feature request. How do I report it?**
Email support@rockriverresearch.com with details about the issue or your suggestion.

---

### 11. Troubleshooting — `/rockterm/troubleshooting/index.html`

**Meta description:** "Troubleshoot common RockTerm issues."

Headline: "Troubleshooting"

Use the same `<details><summary>` pattern.

**RockTerm won't launch.**
Try restarting your computer. If the problem persists, try repairing or reinstalling from the Microsoft Store (Settings → Apps → RockTerm → Advanced Options → Repair/Reset). Ensure your system meets the minimum requirements.

**I can't connect to my SSH host.**
Verify the hostname/IP, port, and credentials. Ensure the remote host is reachable from your network (try `ping` or `Test-NetConnection` in PowerShell). Check that your firewall or VPN is not blocking port 22 (or your configured SSH port). Verify your SSH key file path is correct if using key-based auth.

**AI features are not responding.**
AI features require an active internet connection. Verify your connection. If the AI provider's API is experiencing downtime, the feature may be temporarily unavailable. Check that AI features are enabled in settings.

**Terminal text looks wrong or garbled.**
Try changing the terminal font in settings. Ensure your terminal encoding is set to UTF-8. Some legacy systems may send output in encodings that require specific configuration.

**The Microsoft Store says the app is not available.**
Ensure you're running a supported version of Windows. RockTerm requires Windows 10 version 1809 or later. Check that the Microsoft Store is not restricted by your organization's policies.

**How do I reset RockTerm to default settings?**
Go to Settings → Apps → RockTerm → Advanced Options → Reset. This will clear your settings but will not delete saved connection profiles.

Still stuck? Email support@rockriverresearch.com.

---

### 12. System Requirements — `/rockterm/system-requirements/index.html`

**Meta description:** "RockTerm system requirements."

Headline: "System Requirements"

Present as a clean table or definition list:

- **Operating System:** Windows 10 version 1809 (October 2018 Update) or later, Windows 11
- **Architecture:** x64 (64-bit)
- **RAM:** 4 GB minimum, 8 GB recommended
- **Disk Space:** ~200 MB
- **Display:** 1280x720 minimum resolution
- **Network:** Internet connection required for AI features. SSH connections require network access to target hosts.
- **Distribution:** Microsoft Store

---

### 13. Changelog — `/rockterm/changelog/index.html`

**Meta description:** "RockTerm changelog — release notes and version history."

Headline: "Changelog"

Start with a single entry:

**v1.0.0 — April 2026**
- Initial release
- SSH terminal emulation with tabbed sessions
- AI-powered terminal assistance via Anthropic Claude
- Connection manager with saved profiles and groups
- Key-based and password authentication
- Customizable terminal appearance
- Microsoft Store distribution with free trial

---

## README.md

```markdown
# Rock River Research Website

Static website for Rock River Research, LLC and the RockTerm product.

## Local Development

Open `index.html` in a browser. No build step required.

For local development with correct paths, use a simple HTTP server:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deployment

This site deploys to Cloudflare Pages.

- **Build command:** (none)
- **Build output directory:** `/`
- **Branch:** `main`

## Structure

All pages use absolute paths (`/css/style.css`) and the shared stylesheet in `css/style.css`.
```

---

## .gitignore

```
.DS_Store
Thumbs.db
*.swp
*.swo
```

---

## Final Steps

After creating all files, make a single git commit with the message: "Initial site scaffold — all pages, shared layout, full content".

Do NOT push to any remote.
