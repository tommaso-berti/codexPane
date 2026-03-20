# 1. Web Security Fundamentals

# 
Web applications are constantly under threat. From malicious threat actors to curious teenagers, malicious code or hacking attempts are coming from every angle. Using the OWASP Top 10’s list of the most critical security risks to web applications as a guide, you can protect your users, and yourself, from threats to your Express applications. Strong authentication and authorization practices, properly protected data, and secure code will protect your web app from these constant threats.

Headline-grabbing security incidents are in the news all the time, and just as you are constantly evolving your skills, so are the attackers - they are constantly on the lookout to discover vulnerabilities and find a point of attack. Cyberattacks against websites are extremely common. The attacks can result in:
* Website defacement
* Loss of website availability or in the worst case, total denial-of-service (DoS)
* Leaking of sensitive customer data
* An attacker gaining control over the website
* An attacker using the website as a vector for other attacks
* Loss of user trust in the website
* Reputational damage

<u>[Penetration testing](https://csrc.nist.gov/glossary/term/penetration_testing)</u>, or pen testing, is a growing practice where a cyberattack is simulated in order to identify security vulnerabilities so that they can be discovered and remediated. Also known as ethical hacking, pen-testing requires a thorough understanding of topics such as computer architecture and operating systems, business operations, networking protocols, and scripting languages.

## **Security Principles**
A good rule of thumb for web security, and cybersecurity in general, is something called the CIA triad (no, not the US federal agency). CIA stands for Confidentiality, Integrity, and Availability.

***Confidentiality*** refers to protecting private information from eyes that shouldn’t have access to it. It’s the need to enforce access - who can see this, and who shouldn’t? Examples of enforcing confidentiality include implementing robust user authentication and encryption of important user data.

***Integrity*** refers to data integrity here. We need security controls that protect data from being changed or deleted, and that the damage can be reversed if done accidentally. Some techniques related to integrity are database security, keeping backups and using cryptography to check for changes.

***Availability*** refers to data being consistently, reliably available to those authorized. For example, social media websites ensure that even with high traffic or when a server is compromised, information gets to a user’s screen. This is accomplished through constant maintenance of hardware and software, monitoring servers and networks, and having a plan for any disasters.

Keep these principles in mind as you develop for the web! <u>[OWASP, the Open Web Application Security Project](https://owasp.org/)</u>, is a great resource for web developers, offering tools, security education and manuals.
