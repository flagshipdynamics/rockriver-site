---
title: Troubleshooting Authentication
---

# Troubleshooting Authentication

This guide covers common authentication issues when connecting via SSH, including password failures, key problems, and host key mismatches.

## Table of Contents

- [Password Authentication Failures](#password-authentication-failures)
- [SSH Key Problems](#ssh-key-problems)
- [Host Key Mismatches](#host-key-mismatches)
- [Keyboard-Interactive Issues](#keyboard-interactive-issues)
- [Permission Issues](#permission-issues)
- [Jump Host Authentication](#jump-host-authentication)
- [Credential Profile Issues](#credential-profile-issues)
- [General Diagnostics](#general-diagnostics)
- [Related Links](#related-links)

---

## Password Authentication Failures

### Symptoms

- "Authentication failed" error after entering password.
- Connection closes immediately after password entry.
- Multiple password prompts before failure.

### Causes and Solutions

**Incorrect password:**
- Verify Caps Lock is off.
- Re-type the password carefully (it is masked).
- Try the password on another SSH client to confirm it works.
- Check if the password was recently changed.

**Password authentication disabled on server:**
- The server may only accept key authentication.
- Check `/etc/ssh/sshd_config` on the server:
  ```
  PasswordAuthentication yes
  ```
- Contact the server administrator if you cannot check this.

**Account locked or expired:**
- The user account may be locked after too many failed attempts.
- The password may have expired (common in Active Directory environments).
- Check with your system administrator.

**PAM configuration issues (Linux servers):**
- PAM modules may reject authentication for various policy reasons.
- Check `/var/log/auth.log` or `/var/log/secure` on the server for details.

---

## SSH Key Problems

### Key Not Accepted

**Symptoms:**
- "Authentication failed" with key file specified.
- Falls back to password prompt.
- "Permission denied (publickey)" error.

**Solutions:**

1. **Verify public key is on the server:**
   ```bash
   cat ~/.ssh/authorized_keys
   ```
   Ensure your public key is listed.

2. **Check key format:**
   - RockTerm supports PEM format private keys.
   - If your key is in OpenSSH format (starts with `-----BEGIN OPENSSH PRIVATE KEY-----`), it should work with modern versions.
   - If issues persist, convert: `ssh-keygen -p -m PEM -f keyfile`

3. **Check key type:**
   - Ensure the server accepts your key type (RSA, ED25519, ECDSA).
   - Some servers disable RSA with SHA-1; try ED25519.

4. **Verify key file path:**
   - Ensure the path in RockTerm points to the correct private key.
   - The file must be readable by your user account.

### Passphrase Issues

**Symptoms:**
- "Could not decrypt key file" error.
- "Invalid passphrase" error.

**Solutions:**

- Verify you are entering the correct passphrase for the key (not the server password).
- Passphrases are case-sensitive.
- If you forgot the passphrase, you must generate a new key pair.

### Key File Permissions (Remote Linux Servers)

If connecting from a remote context, verify server-side permissions:

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
chmod 600 ~/.ssh/id_rsa
```

The SSH daemon rejects keys if the directory or file permissions are too open.

---

## Host Key Mismatches

### Symptoms

- "Host key verification failed" warning.
- "Remote host identification has changed" error.
- Connection refused with security warning.

### What This Means

The server's SSH host key has changed since you last connected. This could indicate:

- **Legitimate change:** Server was reinstalled, key was rotated, or IP was reassigned.
- **Security threat:** A man-in-the-middle (MITM) attack is intercepting your connection.

### Resolution

**If the change is expected (server reinstalled, etc.):**

1. Open **Network > Host Key Manager**.
2. Find the entry for the affected host.
3. Delete the old host key.
4. Reconnect — you will be prompted to accept the new key.

**If the change is unexpected:**

1. Do NOT connect to the server.
2. Contact the server administrator.
3. Verify the server's fingerprint through an out-of-band channel (phone, in person).
4. Investigate potential network compromise.

### Prevention

- Document host key fingerprints when deploying new servers.
- Use DNS SSHFP records where possible.
- Monitor for unexpected host key changes in your environment.

---

## Keyboard-Interactive Issues

### Symptoms

- Not prompted for MFA/2FA code.
- "Authentication method not supported" errors.
- Connection times out during interactive challenge.

### Solutions

**MFA not prompting:**
- Verify the server is configured for keyboard-interactive authentication.
- Some MFA systems have timeouts; respond promptly when prompted.
- Check if MFA is configured for your specific user account.

**Challenge-response loops:**
- Some servers send multiple challenges; answer each one.
- If stuck in a loop, the server configuration may be incorrect.
- Contact your administrator.

---

## Permission Issues

### Local File Permissions

**Private key not readable:**
- Ensure your Windows user account has read access to the key file.
- Right-click the key file > Properties > Security > Verify your user has read access.
- Keys in `%USERPROFILE%\.ssh\` typically have correct permissions.

**Configuration directory not writable:**
- RockTerm needs write access to `%APPDATA%\RockTerm\` for host key storage.
- Verify the directory exists and is writable.

### Remote Server Permissions

If key authentication fails but the key is correct, check server-side:

```bash
# Directory permissions
ls -la ~/.ssh/
# Should show: drwx------ (700)

# File permissions
ls -la ~/.ssh/authorized_keys
# Should show: -rw------- (600)

# Home directory permissions (some sshd configs check this)
ls -la ~/
# Should NOT be world-writable
```

### SELinux / AppArmor

On servers with mandatory access controls:

```bash
# Check SELinux context
ls -Z ~/.ssh/authorized_keys

# Restore correct context
restorecon -Rv ~/.ssh/
```

---

## Jump Host Authentication

### Symptoms

- Connection fails at the jump host stage.
- "Unable to connect to bastion" error.
- Authentication succeeds on jump host but fails on target.

### Solutions

**Jump host credentials:**
- Verify the jump host username and key are correct.
- Test connecting directly to the jump host first (without forwarding).
- Ensure the jump host allows TCP forwarding.

**Target host from jump host:**
- Verify the target host is reachable from the jump host.
- Check DNS resolution on the jump host.
- Confirm firewall rules allow the jump host to reach the target.

**Agent forwarding:**
- If using agent forwarding through the jump host, ensure the jump host allows it.
- Check `AllowAgentForwarding` in the jump host's sshd_config.

---

## Credential Profile Issues

### Master Password

**Symptoms:**
- "Vault locked" when trying to connect with a credential profile.
- Cannot access stored passwords.

**Solutions:**
- Enter your master password when prompted to unlock the vault.
- If you forgot the master password, stored credentials cannot be recovered.
- You will need to delete the vault and re-enter credentials.

### Profile Not Applied

- Verify the correct credential profile is selected in the session.
- Check that the profile contains the username and password.
- Edit the profile to confirm its contents.

---

## General Diagnostics

### Connection Debugging Steps

1. **Verify network connectivity:**
   - Can you ping the host?
   - Is port 22 (or custom port) open?
   - Are there firewall rules blocking access?

2. **Test with another client:**
   - Try connecting with the built-in `ssh` command or another SSH client.
   - This helps isolate whether the issue is RockTerm-specific.

3. **Check server logs:**
   - On Linux: `tail -f /var/log/auth.log` or `/var/log/secure`
   - Look for specific rejection reasons.

4. **Verify SSH server status:**
   ```bash
   systemctl status sshd
   ```

5. **Check server SSH configuration:**
   ```bash
   cat /etc/ssh/sshd_config | grep -v "^#" | grep -v "^$"
   ```

### Common Server Configuration Issues

```
# Must be 'yes' for password auth
PasswordAuthentication yes

# Must be 'yes' for key auth
PubkeyAuthentication yes

# Must include your key type
PubkeyAcceptedAlgorithms +ssh-rsa

# Must allow your user or group
AllowUsers yourusername
AllowGroups yourgroup

# Must not be too restrictive
MaxAuthTries 6
```

---

## Related Links

- [SSH Connections](ssh-connections.md)
- [SSH Jump Hosts](ssh-jump-hosts.md)
- [Security](security.md)
- [FAQ](faq.md)
