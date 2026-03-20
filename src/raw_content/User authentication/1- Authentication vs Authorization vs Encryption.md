# 1. Authentication vs Authorization vs Encryption

[https://owasp.org/www-project-top-ten/](https://owasp.org/www-project-top-ten/)

## **Authentication**
Authentication is the verification of *who you are*.
Authentication relies on one or more *factors* to verify identity, and these factors come in three main types:
* Knowledge is something you know, like a username and password.
* Possession is something you have, like a security card or mobile device
* Inherence is something you are, which generally refers to biometric data such as fingerprints.

Authentication that relies on a single factor, such as a simple username/password combo, is called *Single-Factor Authentication*, and is becoming increasingly insecure.
Authentication that requires multiple factors, such as a username/password combo and a code sent to a mobile device, is known as *Multi-Factor Authentication*. This is distinct from Multi-*Step* authentication, which requires multiple types of authentication within a single factor, such as a password and a PIN.

### **Usernames and Passwords**
Early computers were expensive and bulky, so it was common to have multiple users share them using separate terminals. Because computation time was limited and expensive, the administrators needed a way to know who was using the system, and they chose password-based authentication.
Early password systems stored passwords in plaintext, but this proved to be a serious vulnerability! Password storage has gotten more complex with the advance of cryptography, and the current standard for password storage is to use salted hashes.

### One-Time Passwords & MFA
In the 1980s, a new authentication technology was developed that paved the way for possession-based authentication: The One-Time Password, or OTP.
A security code that’s sent to your phone or the constantly refreshing code on a company’s security fob are examples of OTP’s. They are passwords that expire and refresh. Humans can’t practically manage these dynamic passwords, so we use digital devices to do it for us.

### **PKI: Authenticating the Authenticator**
Most authentication relies on the ability to transmit secrets securely. How can you be sure you’re sending your precious credentials to the right place? If you’re logging into a website with a password, you need to be sure you’re actually interacting with the real website, and not a malicious fake.
<u>[Public-Key Infrastructure](https://www.ssh.com/academy/pki)</u>, or PKI, solves this problem. PKI is a system that designates trusted authorities who verify that you’re interacting with who you think you are. You’re making use of PKI right now to connect to this website; HTTPS relies on PKI to make it harder for malicious actors to create fake copies of websites.

### **Single Sign-On & OAuth2**
The most recent advancement in authentication is Single Sign-On, also known as SSO. If you’ve ever used the ‘Sign in with Google/Facebook/Etc’ buttons on websites, you’ve used SSO.
With SSO, you authenticate with one service yourself, then use that service to authenticate with other services, but those services never actually have access to the secrets *you* use to authenticate. This makes it just as secure, if not more, than creating a password for the website itself.
The current standard for SSO is OAuth 2.0, the protocol that powers the ‘Sign in with…’ buttons.

## **Authorization**
Authorization is the verification of *what you are allowed to do*.
Good authorization will allow you to limit users and services to the privileges they require; just because a user is authorized to manage one group doesn’t mean they should be able to manage all groups, for example.

## **Encryption**
One of the core tools for enforcing authentication and authorization is *encryption*. Encryption is the process of transforming data into a format that is unreadable unless you have the correct *key* to decrypt it. Encryption comes in two main types:
* *Symmetric encryption* uses the same key to encrypt and decrypt data.
* *Asymmetric encryption* uses separate keys for encryption and decryption.
































