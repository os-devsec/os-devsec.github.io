---
title: "NetSec Challenge Writeup"
description: ""
date: "2026-02-02"
readTime: "10 min read"
image: "/assets/images/posts/netsec_challenge/cover.png"
slug: "netsec-challenge-writeup"
author: "oscar lara"
---

## Description

[NetSec Challenge](https://tryhackme.com/room/netsecchallenge) is a VIP room on TryHackMe, it is a CTF that test your network security skills adquired in the Network Security module.

## Task 1: Introduction

In this task, we only need to start the target machine.

## Task 2: Challenge Questions

### Q1: What is the highest port number being open less than 10,000?

First, we use nmap to enumerate the target machine and find open ports.

```bash
nmap -p- -sS --min-rate 5000 -Pn -n 10.80.148.26
```

The image below shows found ports and therefore the answer to this and next questions.

![ports](/assets/images/posts/netsec_challenge/ports.png)

### Q2: There is an open port outside the common 1000 ports; it is above 10,000. What is it?

We already found the answer to this question in the previous question.

### Q3: How many TCP ports are open?

We already found the answer to this question in the previous question, we only need to count the number of open ports.

### Q4: What is the flag hidden in the HTTP server header?

Here we can take two approaches, the first one is to use curl to get the HTTP server header.

```bash
curl -I http://10.80.148.26
```

The image below shows the HTTP server header obtained.

![http_header](/assets/images/posts/netsec_challenge/http_header.png)

The other approach is use the common scripts of nmap to get the HTTP server header and additional information about the other ports.

```bash
nmap -p 22,80,139,445,8080,10021 -sC -sV -Pn -n 10.80.148.26
```

The image below shows the nmap output.

![nmap_services_output](/assets/images/posts/netsec_challenge/nmap_services_output.png)

### Q5: What is the flag hidden in the SSH server header?

If we use the common scripts of nmap on the before task, we already got the SSH server header. But other approach is to use telnet and run the following command:

```bash
telnet 10.80.148.26 22
```

### Q6: We have an FTP server listening on a nonstandard port. What is the version of the FTP server?

As above if we use the common scripts of nmap on the before task, we already got the FTP server version. But we can use ftp to get the FTP server version.

```bash
ftp 10.80.148.26 10021
```

The image below shows the FTP server version obtained.

![ftp_version](/assets/images/posts/netsec_challenge/ftp_version.png)

### Q7: We learned two usernames using social engineering: `eddie` and `quinn`. What is the flag hidden in one of these two account files and accessible via FTP?

For answering this question, we use hydra to find the password of both users.

```bash
hydra -l eddie -P /usr/share/wordlists/rockyou.txt 10.80.148.26 ftp -s 10021
```

```bash
hydra -l quinn -P /usr/share/wordlists/rockyou.txt 10.80.148.26 ftp -s 10021
```

The image below shows the password obtained for both users.

![hydra_eddie](/assets/images/posts/netsec_challenge/hydra_eddie.png)
![hydra_quinn](/assets/imagftp_s/posts/netsec_challenge/hydra_quinn.png)

Now we can use ftp to get the flag hidden in one of these two account files and accessible via FTP.

```bash
ftp 10.80.148.26 10021
```

The image below shows the file hidden in one of these two account files and accessible via FTP.

![ftp_file](/assets/images/posts/netsec_challenge/ftp_file.png)

Then we can download the file and get the flag using cat.

```bash
cat ftp_flag.txt
```

### Q8: Browsing to http://MACHINE_IP:8080 displays a small challenge that will give you a flag once you solve it. What is the flag?

In the browser we can see the following challenge.

![challenge](/assets/images/posts/netsec_challenge/challenge.png)

As shown above, we need to run a scan as covertly as possible to avoid detection. In order to do this, we can play with the TCP flags and try different type of scans.

```bash
nmap -sN 10.80.148.26
```

The effective one was a null scan. The image below shows the page after solving the challenge.

![challenge_solved](/assets/images/posts/netsec_challenge/challenge_solved.png)

That's all for this room. I hope you enjoyed it and this writeup was helpful.
