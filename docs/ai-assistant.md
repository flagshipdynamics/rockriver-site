---
title: AI Assistant
---

# AI Assistant

RockTerm includes an optional AI-powered assistant that can analyze terminal output, explain commands, troubleshoot issues, and suggest solutions.

## Table of Contents

- [Overview](#overview)
- [Setup](#setup)
- [Using the AI Assistant](#using-the-ai-assistant)
- [Supported Workflows](#supported-workflows)
- [Quick Prompts](#quick-prompts)
- [Terminal Context](#terminal-context)
- [Paste to Terminal](#paste-to-terminal)
- [AI in Network Tools](#ai-in-network-tools)
- [Privacy and Security](#privacy-and-security)
- [Configuration](#configuration)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Related Links](#related-links)

---

## Overview

The AI Assistant is a **completely optional** feature that:

- Analyzes terminal output to explain errors and suggest fixes.
- Helps troubleshoot network and system issues.
- Suggests commands for common tasks.
- Provides context-aware assistance based on your terminal session.
- Supports Anthropic Claude and OpenAI models.

The AI Assistant requires a user-provided API key. No data is sent to any service unless you explicitly enable and configure the feature.

---

## Setup

### Enable the AI Assistant

1. Go to **Edit > Preferences**.
2. Navigate to the **AI Assistant** section.
3. Enable the AI Assistant toggle.
4. Select your preferred provider:
   - **Anthropic** (Claude models)
   - **OpenAI** (GPT models)
5. Enter your API key for the selected provider.
6. Choose a model (optional; defaults to the provider's recommended model).
7. Click **OK**.

### Supported Providers

| Provider | Models | API Key Source |
|----------|--------|---------------|
| Anthropic | Claude (configurable model selection) | api.anthropic.com |
| OpenAI | GPT-4 and later (configurable model selection) | platform.openai.com |

### API Key Management

- API keys are stored locally in your RockTerm configuration.
- Keys are never transmitted to RockTerm servers.
- You are responsible for your own API usage and billing.
- See your provider's pricing page for cost information.

---

## Using the AI Assistant

### Opening the Panel

- Toggle via **View > AI Assistant** or press **Ctrl+Shift+I**.
- The AI panel appears as a dockable panel on the right side.
- Right-click in the terminal and select **AI Assist** to open with selected context.

### Asking Questions

1. Type your question in the input field at the bottom of the AI panel.
2. Press **Enter** to submit (Shift+Enter for newline).
3. The AI responds with analysis, explanations, or suggestions.
4. Continue the conversation with follow-up questions.

### Context Awareness

When you invoke the AI Assistant:

- It automatically captures the last 200 lines of terminal output (configurable).
- If you have text selected in the terminal, that selection is included as primary context.
- The AI uses this context to provide relevant, specific answers.

---

## Supported Workflows

### Error Analysis

Select an error message in your terminal, then ask:

- "Explain this error"
- "What caused this?"
- "How do I fix this?"

### Command Help

Ask the AI about commands:

- "How do I find files larger than 100MB?"
- "What's the BGP command to advertise a network?"
- "Show me how to configure OSPF area 0"

### Output Interpretation

After running a command, ask:

- "Explain this output"
- "Summarize these results"
- "Are there any issues in this output?"

### Troubleshooting

Describe a problem:

- "My SSH connection keeps dropping"
- "Why is this interface showing errors?"
- "Help me debug this routing issue"

### Configuration Review

Paste or select configuration:

- "Review this ACL for security issues"
- "Is this BGP configuration correct?"
- "Optimize this firewall rule set"

---

## Quick Prompts

Quick prompts provide one-click access to common questions.

### Default Prompts

| Prompt | Use Case |
|--------|----------|
| Explain this output | Understand what terminal output means |
| Find the error | Identify issues in displayed output |
| Summarize | Get a concise summary of verbose output |

### Custom Prompts

Add your own frequently used prompts:

1. Click the **+** button in the Quick Prompts area.
2. Enter your prompt text.
3. Click **OK**.

Custom prompts appear alongside defaults and persist across sessions.

To edit or remove custom prompts, right-click and select **Edit** or **Remove**.

---

## Terminal Context

### Automatic Context

When you submit a question, RockTerm automatically captures recent terminal output (last 200 lines by default) and includes it with your query. This allows the AI to provide contextually relevant answers.

### Selected Text Context

If you select text in the terminal before asking a question:

1. The selected text is shown as a context preview in the AI panel.
2. The AI focuses its analysis on the selected content.
3. This is ideal for specific error messages or output sections.

### Context Configuration

Adjust the number of context lines in **Edit > Preferences > AI Assistant**:

- **Context Lines:** Number of scrollback lines to include (default: 200).
- Increase for complex multi-screen outputs.
- Decrease for shorter, more focused interactions.

---

## Paste to Terminal

The AI can generate commands that you may want to execute. To paste AI suggestions into your terminal:

1. Click the **Paste to Terminal** button in the AI panel.
2. RockTerm extracts code blocks from the AI's last response.
3. A preview shows the first 200 characters of what will be pasted.
4. Confirm the paste in the dialog.
5. The command is inserted into your active terminal.

**Safety:** Always review suggested commands before executing them, especially destructive operations (rm, format, reset, etc.).

---

## AI in Network Tools

The AI assistant is also available within specific network tools:

### Regex Lab

- Get AI help building complex regex patterns.
- Explain what a regex matches.
- Optimize regex for performance.

### Log Extractor

- AI-assisted analysis of extracted log data.
- Pattern identification in syslog, BGP, and OSPF logs.
- Anomaly detection suggestions.

---

## Privacy and Security

### Data Handling

- **Opt-in only** — No AI features are active unless you explicitly enable them and provide an API key.
- **Direct API calls** — Queries go directly from RockTerm to your chosen AI provider (Anthropic or OpenAI). No intermediate servers.
- **No data storage by RockTerm** — Conversation history exists only in memory during your session.
- **User-controlled context** — You decide what terminal output is included with your queries.
- **API key storage** — Keys are stored locally in your configuration file only.

### What is Sent

When you use the AI Assistant, the following is sent to your AI provider:

1. Your question text.
2. Terminal context (recent output or selected text) if included.
3. A system prompt describing the assistant's role.
4. Previous messages in the current conversation.

### What is NOT Sent

- Your API keys are never sent to RockTerm (only to the AI provider).
- Session credentials (passwords, private keys) are never included.
- Other session data from inactive terminals.
- Your session configuration or saved sessions.
- Any data when the AI feature is disabled.

### Provider Privacy Policies

Your data is subject to your AI provider's privacy policy:

- Anthropic: https://www.anthropic.com/privacy
- OpenAI: https://openai.com/policies/privacy-policy

Consult your provider's data retention and usage policies. Enterprise plans typically offer stronger data guarantees.

---

## Configuration

### Preferences

| Setting | Description | Default |
|---------|-------------|---------|
| Enabled | Enable/disable AI features globally | Disabled |
| Provider | Anthropic or OpenAI | (none) |
| API Key | Your provider API key | (none) |
| Model | Specific model to use | Provider default |
| Context Lines | Terminal lines included with queries | 200 |

### Provider-Specific Settings

**Anthropic:**
- API endpoint: `https://api.anthropic.com/v1/messages`
- Max tokens: 4096
- Timeout: 120 seconds

**OpenAI:**
- API endpoint: `https://api.openai.com/v1/chat/completions`
- Max tokens: 4096
- Timeout: 120 seconds

---

## Best Practices

1. **Be specific** — "Explain this BGP error message" is better than "help."
2. **Select relevant text** — Highlight the specific output you need help with.
3. **Provide context** — Mention what you were trying to accomplish.
4. **Verify commands** — Always review AI-suggested commands before executing.
5. **Use for learning** — Ask "why" to understand the reasoning behind suggestions.
6. **Keep conversations focused** — Clear the chat when switching topics.
7. **Don't share secrets** — Avoid pasting passwords, tokens, or sensitive data into the AI input.

---

## Troubleshooting

### AI Panel Not Responding

- Check your internet connection.
- Verify your API key is valid and has credit/quota.
- Check the error message displayed in the AI panel.
- Rate limiting (429 errors) means you've exceeded your provider's rate limits; wait and retry.

### API Key Invalid

- Regenerate your API key from your provider's dashboard.
- Ensure the key is entered correctly (no leading/trailing spaces).
- Verify the key has appropriate permissions.

### Slow Responses

- Larger models (GPT-4, Claude Opus) are slower but more capable.
- Reduce context lines to send less data.
- Check your network latency to the API endpoint.

### Context Not Appearing

- Ensure the AI panel is open before running commands.
- Check that context lines is set to a value > 0.
- Select specific text if auto-context is insufficient.

---

## Related Links

- [Terminal Features](terminal-features.md)
- [Privacy](privacy.md)
- [Getting Started](getting-started.md)
