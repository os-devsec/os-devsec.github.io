---
title: "Dav Room - TryHackMe Write-up"
description: "A write-up of the dav room on TryHackMe."
date: "2026-02-10"
readTime: "10 min read"
image: "/assets/images/posts/dav/cover.png"
slug: "dav-thm-writeup"
author: "oscar lara"
---

# Dav - TryHackMe Write-up

## Overview

The **Dav** challenge is a TryHackMe room focused on directory enumeration, WebDAV exploitation, unrestricted file upload, and reverse shells. It is a great exercise for beginners to understand how to enumerate ports and directories, upload a reverse shell, and use sudo misconfigurations to escalate privileges.

In this write-up, I walk through each step of the process, explaining the methodology and tools used to solve the challenge.

---

## Enumeration

The first step is to enumerate all open ports on the target machine. For this, I used my own script, which automates an `nmap` scan and generates two output files.

![ports](/assets/images/posts/dav/dav_port_scan.png)

Port **80** is open, so we can access the web server.

![web](/assets/images/posts/dav/dav_web.png)

The page displayed is just the default Apache2 Ubuntu Default Page. Since it didn’t reveal any useful information, directory enumeration was performed to discover hidden endpoints.

```bash
gobuster dir -u http://10.80.169.21 -w /usr/share/wordlists/dirb/big.txt
```

![gobuster](/assets/images/posts/dav/dav_gobuster.png)

---

## Exploitation

This directory enumeration revealed a `/webdav` directory. When accessing it, a login prompt appears. Initially, I tried the credentials `admin:admin`, but they did not work.

![webdav](/assets/images/posts/dav/dav_login_popup.png)

After doing some research on WebDAV, I found that it is an HTTP extension that allows web developers to remotely manage content on a server. Since WebDAV services are often misconfigured and sometimes use default credentials, I searched for common default credentials and was able to authenticate successfully.

![credentials](/assets/images/posts/dav/dav_credentials.png)
![webdav](/assets/images/posts/dav/dav_webdav.png)

Since WebDAV allows the PUT method, it was possible to upload a PHP reverse shell directly to the server usign `curl`.

```bash
curl -u wampp:xampp -T /usr/share/webshells/php/php-reverse-shell.php http://10.80.169.21/webdav/
```

![upload](/assets/images/posts/dav/dav_upload.png)

> **Note:**
> Before uploading the reverse shell, you must modify the IP address and port in the script to match your own listener.

Once the file was uploaded, accessing it triggered the reverse shell.

![reverse](/assets/images/posts/dav/dav_reverse.png)

Using `netcat`, I set up a listener to catch the incoming connection.

```bash
nc -lvp 443
```

![reverse](/assets/images/posts/dav/dav_reverse_shell.png)

With the reverse shell established, it was possible to read the **user flag**.

![user](/assets/images/posts/dav/dav_user_flag.png)

---

## Privilege Escalation

To escalate privileges, I checked the sudo permissions for the current user. It was found that the www-data user is allowed to run the `cat` command with `sudo`.

![sudo](/assets/images/posts/dav/dav_sudo.png)

Since `cat` can be used to read files, this misconfiguration allows reading any file on the system as root, including the root flag.

```bash
sudo cat /root/root.txt
```

![root](/assets/images/posts/dav/dav_root_flag.png)

---

## Final Thoughts

This room is very easy, but it is a good exercise, especially for beginners. It encourages thinking like a pentester by requiring basic enumeration, researching unfamiliar services such as WebDAV, and abusing common misconfigurations to gain access.

Overall, the Dav room is simple but effective. It reinforces core concepts such as enumeration, researching unknown services, and exploiting privilege misconfigurations, skills that are essential in real-world pentesting.

Thanks for reading — I hope this write-up was helpful.
