---
title: "Cyber Kill Chain, What is it?"
description: "An overview of the cyber kill chain framework and its application in cybersecurity"
date: "2025-12-28"
readTime: "10 min read"
image: "/assets/images/posts/cyber_kill_chain/cover.jpg"
slug: "cyber-kill-chain-framework"
author: "oscar lara"
---

## Cyber Kill Chain

An important concept in cybersecurity is the **Cyber Kill Chain**, a framework that divides a cyber attack into seven stages. Understanding the following stages helps organizations identify and mitigate threats effectively.

1. Reconnaissance
2. Weaponization
3. Delivery
4. Exploitation
5. Installation
6. Command and Control (C2)
7. Actions on Objectives

---
### Reconnaissance

In this initial phase, attackers gather information about their target. This includes identifying potential vulnerabilities, network structures, key personal and weaknesses. 

There are two types of reconnaissance:
- Passive: Gathering information without direct interaction with the target (e.g., OSINT).
- Active: Directly interacting with the target to gather information (e.g., scanning, probing).

#### Countermeasures
- Minimizing public information exposure
- Implementing network monitoring to detect scanning activities
- Using deception techniques like honeypots
---
### Weaponization
In this phase, based on the information gathered, attackers create a payload , also might use a ready-made exploit, edit existing one and use obfuscation or encryption techniques to evade detection.

The weaponization process may include vectors ranging from email attachments to USB drops. Additionally, attackers usually rely on creating Microsoft Office documents with embedded malicious macros.

<p class="my-4 text-sm italic">
    <b>macros:</b> commands or instructions embedded within Microsoft Office documents that are executed when the document is opened.
</p>

#### Countermeasures
- User education and training
- Disable unnecessary features, plugins and software
- Implement application whitelisting
---
### Delibery
In this phase, the attacker delivers the weaponized payload to the target. Common delivery methods include:

- Phishing emails
- Spear-phishing campaigns
- SMS Phishing (Smishing)
- Social Engineering
- Malicious Web Links
- File Sharing Platforms
- Malvertising
- Physical means delivery (e.g., USB drives)

As we see there are multiple delivery methods, being phishing one of the most common and effective ones. You can read more about it in my <a href="../phishing-campaign-poc" target="_blank">Phishing Campaign PoC</a> post.

#### Countermeasures
- Email filtering and anti-phishing solutions
- User training and awareness programs
- Web Firewalls (WAFs) and URL filtering
---
### Exploitation
Once the payload is delivered, the attacker exploits a vulnerability in the target system to execute the malicious code. This can take various forms, such as software vulnerabilities, misconfigurations, human errors or weak passwords.

The most straightforward approach is to exploit known vulnerabilities in unpatched systems or target password based authentication systems, if the password is weak or a default one, it is easy to discover it. Other options include exploiting zero-day vulnerabilities or leveraging social engineering techniques to trick users into executing the payload.

#### Countermeasures
- Regular patching and updates
- Multi-factor authentication (MFA)
- Intrusion detection and prevention systems (IDS/IPS)
- Security awareness training
---
### Installation
This phase ensures persistence on the system, in order to this, attackers may create a scheduled tasks in MS Windows or a cron job in Linux. Also install a new service or daemon is a possible approach.

Futhermore, attackers try to take advantage of legitimate system tools to avoid detection (**Living-off-the-Land techniques**), for example using PowerShell scripts or Windows Management Instrumentation.

#### Countermeasures
- Endpoint Detection and Response (EDR) solutions
- Regular system audits and monitoring
- Application whitelisting
---
### Command and Control (C2)
This phase aims to establish a covert communication channel between the compromised system and the attacker's infrastructure. For this, attackers use various techniques, such as:

- Use common application layer protocols (HTTP, HTTPS, DNS, and SMTP) to blend in with legitimate traffic.
- Use encryption to protect C2 communications from detection and analysis.
- Use legitimate cloud services (e.g., Dropbox, Google Drive) to host C2 infrastructure.

Also two important techniques used in this phase are:

- **Domain Generation Algorithms (DGAs)**: Used to generate thousands of domain names based on a predefined algorithm, making C2 domains difficult to predict and block. If a domain is blocked, the malware automatically switches to another generated domain.
- **Fast Flux**: A technique that associates multiple IP addresses with a single domain name. Compromised devices act as proxies, and if an IP address is blocked, the malware switches to another one, making C2 servers harder to track and take down.

#### Countermeasures
- Endpoint Detection and Response (EDR) solutions
- Network Segmentation and Monitoring
- DNS Filtering and Analysis
- Firewall Rules
- Intrusion Detection and Prevention Systems (IDS/IPS)
---
### Actions on Objectives
In this final phase, attackers carry out their original objectives, so the attack may vary depending on the attacker's goals, which can include:

- Data Exfiltration: Stealing sensitive data from the target system.
- Data Destruction: Deleting or corrupting data to disrupt operations.
- Financial Gain: Ransomware attacks or financial fraud.
- Espionage: Gathering intelligence for political or competitive advantage.
- Other Systems: Using the compromised system as a foothold to move laterally within the network and compromise additional systems.

#### Countermeasures
- Data Loss Prevention (DLP) solutions
- Regular backups, Incident Response and Recovery plans
- Network Segmentation and Monitoring
- Access Controls and Least Privilege Principles 
---
## Conclusion
The Cyber Kill Chain framework provides a structured approach to understanding and defending against cyber attacks. By recognizing the different stages of an attack, organizations can implement targeted countermeasures to disrupt the attacker's progress and minimize the impact of security incidents. A cybersecurity strategy should encompass all phases of the kill chain to effectively protect against evolving threats.

Personally, I consider that understanding the Cyber Kill Chain is essential for anyone involved in defense security, as it provides valuable insights into the tactics and techniques used by attackers, helping to investigate and respond to incidents more effectively. I learned about this through THM's room. <a href="https://tryhackme.com/room/cyberkillchain" target="_blank">Cyber Kill Chain</a>.

---

<p class="my-4 text-sm italic text-center">
Support cybersecurity content and share the post so more people can learn
</p>