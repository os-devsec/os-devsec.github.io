---
title: "Phishing Campaign PoC"
description: "technique PoC of a directed phishing campaign using GoPhish and Evilginx, aimed at obtaining initial access in a controlled environment"
date: "2025-10-27"
readTime: "15 min read"
image: "/assets/images/posts/phishing_campaing/cover.jpg"
slug: "phishing-ops-red-teaming"
author: "oscar lara"
---
<p class="my-4 text-sm italic text-center">
    Disclaimer: This post is for educational purposes only. Always obtain proper authorization before conducting any phishing simulations or security assessments.
</p>

## Phishing Campaign PoC: Emulating Initial Access Techniques

Phishing is still one of the **most effective vectors** to obtain initial access. Despite advances in technical controls, the human factor remains in the preferred entry point for many malicious actors. 

In this post I will explain a project carried out at the university, where I developed a *Proof of concept (PoC)* to emulate a real phishing operation to obtain valid credentials and session tokens without exploiting technical vulnerabilities. However, the configuration and assembly of the tools will not be explained in technical detail since there is a lot of documentation on the internet about it.

## Attack profiling and design

The most important step in a phishing campaign is the analysis of the target. Understanding the organization's structure, communication patterns, and key personnel is crucial to design a credible and effective attack.

Also understanding the objective of the attack is essential, compromising a high-profile user like the CEO is not always the most effective approach. Sometimes, in companies a user with less visibility but with access to systems can provide more value.

Here is were OSINT techniques plays a key role, gathering information such as email structures, organizational charts, corporate language, signatures, schedules, and communication patterns. All of this directly influences the credibility of the attack.

## Infrastructure and Tools
For the campaign, I used widely known open source tools, GoPhish and Evilginx, deployed on a simple cloud infrastructure. The key to success was the **design of the domain** and the coherence of the attack, rather than the use of exclusive tooling.

<img src="/assets/images/posts/phishing_campaing/infrastructure.png" alt="Infrastructure developed in the phishing campaign" class="my-4 rounded-lg shadow-md block mx-auto w-full max-w-2xl h-auto"/>

First, I deployed two independent servers:

- A server for GoPhish  
- A server for Evilginx  

Both running on Linux (Ubuntu 24.04), with minimal resources. It is not necessary to use specialized distributions like Kali, the cloud provider chosen was *Azure*, although you can replicate this design on AWS, GCP or any other provider. The only thing to keep in mind is the outgoing or incoming restrictions that some providers may have.

### GoPhish
Gophish is an open source phishing framework that allows you to create and manage phishing campaigns. It provides a web interface to design emails, landing pages and track results. It also has versions compatible with evilginx to capture session tokens.  

<p class="my-4 text-sm italic">
    For this PoC, I used the fork created by kgretzky available on <a href="https://github.com/kgretzky/gophish" target="_blank">github</a> that includes some additional features for better integration with evilginx.
</p>

<img src="/assets/images/posts/phishing_campaing/gophish.svg" alt="GoPhish Dashboard" class="my-4 rounded-lg shadow-md block mx-auto w-full max-w-2xl h-auto"/>

### Evilginx
Evilginx is a framework used for man-in-the-middle attacks, specifically designed for phishing campaigns. It allows you to proxy legitimate websites and capture session tokens and credentials without the user noticing. It is especially useful for bypassing two-factor authentication (2FA).

<p class="my-4 text-sm italic">
    For this PoC, I used the repository available on <a href="https://github.com/kgretzky/evilginx2" target="_blank">github</a> that is a free and open source version of Evilginx.
</p>

<img src="/assets/images/posts/phishing_campaing/Evilginx1.avif" alt="GoPhish Dashboard" class="my-4 rounded-lg shadow-md block mx-auto w-full max-w-2xl h-auto"/>

Evilginx handles the capture of credentials and sessions. Although it requires some initial learning curve, once deployed it is relatively straightforward to operate.

The key element in Evilginx are the **phishlets**, which define how the legitimate service is proxied. Although there are many public repositories, reusing phishlets without modifications increases the risk of detection. Whenever possible, it is advisable to adapt them or develop your own variants.

<p class="my-4 text-sm italic">
    For this PoC, I used the phishlet for Microsoft 365 available in the <a href="https://github.com/ClintAndSiTheHackers/phish">github</a> of ClintAndSiTheHackers.
</p>

---

## Domain Registration 

In phishing operations one of the most critical elements is the **domain**, this time registered through *Namecheap*. The choice of the domain is one of the factors that most influence the success rate of phishing, so you hve to think carefully about what domain to use. 

If you are targeting users of a specific company, it is advisable to use a domain that resembles the company's domain, but with slight variations (typosquatting). For example, if the target company is `spotify.com`, you could register domains like `sp0tify.com`, `sptify.com`,`spo7ify.com`, etc.

Also, instead of using common TLDs like `.com` or `.net`, you can use less common TLDs like `.xyz`, `.info` or `.online` and combine with the domain variation in order to make it more credible. For example, if your are going to impersonate the comunication department of `spotify.com`, you could register a domain like `spotify-support.info`.

As we can see, the registered domain depends on the target and the context of the attack, so it is important to analyze the target before choosing the domain.

### SMTP Service

The registered domain plays a crucial role in the **credibility of the phishing email**, where typosquatting techniques are specially effective, because the user quickly evaluates who seems to be sending the email, not the validity of the domain.

For sending emails, it is essential to have a functional SMTP service. There are several options: setting up your own service, using external providers like SendGrid, or using accounts with app passwords.

In this case, we use *privateemail* from *Namecheap*, which offers a simple SMTP service associated with the registered domain. Also with a good reputation, which is essential to avoid spam filters or blacklists.

An important detail is to **configure the DNS records** of the domain correctly, including SPF, DKIM and DMARC records, to improve email deliverability and avoid being marked as spam.

---

## Email Design with GoPhish

Once we have all the infrastructure ready, it's time to design the phishing email. GoPhish allows define profiles, templates and campaigns in a very flexible way.

The email must seen as legitimate as possible. This involves using the correct logos, language, signatures, formatting and the link must be discreet. Generic text such as "Access the document" or "Review notification" usually work better than aggressive calls to action like "Click Here", this way we didn't raise any suspicions. 

---

## Execution and Monitoring

Once everything is configured, it's time to launch the campaign. Gophish allows monitoring in real time the results of the campaign, including who opened the email, who clicked the link and who submitted credentials.

Additionally, is posible to configure external notifications, such as Telegram bots, to receive real-time alerts on relevant events, with Evilginx we can see the captured credentials an sessions tokens and using a cookie editor plugin we can validate the sessions in real time.

<img src="/assets/images/posts/phishing_campaing/sessions.png" alt="Evilginx Captured Session" class="my-4 rounded-lg shadow-md block mx-auto w-full max-w-2xl h-auto"/>

---

## Conclusion

This PoC highlights the effectiveness of phishing as an initial access technique, especially when combined with careful profiling and attack design. Phishing remains effective because it exploits trust, context, and habits. Understanding this from an offensive perspective is key to improving defense and awareness.

In the end, the best defense against phishing is user education and awareness. So regular training and simulated phishing campaigns are essential to strengthen the human factor in cybersecurity.

---

<p class="my-4 italic text-center">
    Support cybersecurity content and share the post so more people can learn
</p>

