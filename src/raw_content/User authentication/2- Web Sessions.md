# 2. Web Sessions


A web *session* refers to a series of user interactions over a time frame. Session data is stored server-side and associated with a session ID.
Think of a session as short-term memory for a web application.

## **Sessions and Cookies**
It’s a bit clunky for the client to remember to tack the session ID onto every request. Because of this, the session ID is often kept client-side in the form of session cookies. *Cookies* are tiny pieces of data — text files of max 4kb — the browser stores that are automatically sent with HTTP requests to a web application. Cookies are set by the HTTP response header in key-value pairs:

```
Set-Cookie: Key=Value

```

A session cookie is set with the first HTTP response from the server and persists until the browser is closed or the cookie expires. They look like this in the HTTP header:

```
Set-Cookie: sessionID=34jgL79b

```

This is roughly how a session is implemented with cookies:
1. A user goes to a site. The web server creates a session and a session ID.
2. In the server’s response, it tells the browser to store a cookie with the session ID (should not include any personal information).
3. The session ID cookie automatically attaches to each subsequent HTTP request to the server.
4. When the server reads the session ID cookie sent with the next HTTP request, it returns the session data associated with the ID.
5. The process continues as long as the session is active.
6. The session and session ID cookie expires after a user closes out the browser, logs out, or a predetermined session length (i.e. an hour) passes.

### **Cookie Security**
Cookies often store sensitive information, especially when they’re used in session management. Cookies are also used to store a user’s personal preferences or history, which should also stay secure.
It’s important to add security to the cookies, especially in the case that someone tries to swipe data from them to steal your session data!
The first step to securing a cookie could be adding an expiration date or duration so a cookie doesn’t persist longer than it needs to. We can specify that information through the Set-Cookie header in an HTTP response like so:

```
Set-Cookie: Key=Value; expires=Saturday, 01-May-2021 07:30:10 GMT

```

The <u>[HttpOnly](https://owasp.org/www-community/HttpOnly)</u> attribute for the Set-Cookie header makes sure that the cookie’s data is not accessible to a script running client-side. This helps prevent a Cross-Site Scripting (XSS) attack that tries to steal a session cookie and take over the victim’s session, which is extremely common.

```
Set-Cookie: Key=Value; expires=Saturday, 01-May-2021 07:30:10 GMT; HTTPOnly

```

Here are some other  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     Set-Cookie
 </span> options:
* <u>[SameSite](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)</u> helps prevent Cross-Site Request Forgery (CSRF) attacks.
* <u>[Secure](https://owasp.org/www-community/controls/SecureCookieAttribute)</u> makes sure cookies are only sent with a request to an HTTPS page.
You can explore <u>[more options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)</u> for the  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     Set-Cookie
 </span> header.

## **What is localStorage?**
Cookies were the only option for storing miscellaneous data outside of the database until HTML5 came around with localStorage and sessionStorage
- <u>[localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)</u> is a newer form of client-side storage. These browser files also store data as key-value pairs, and web applications can choose to store up to 5MB of data in localStorage. localStorage does not interact with the server, but is instead accessed and modified by simple client-side JavaScript code. localStorage will persist even after a user exits the browser, and will continue to persist until the browser cache is deleted.
- <u>[sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)</u>, which uses the same syntax as localStorage, can hold session data. This storage clears once the browser closes, so, for many use cases, this is more secure.

```
localStorage.setItem('key', value)

localStorage.getItem('key');

```


## **Cookies vs. localStorage vs. sessionStorage**
localStorage and sessionStorage are meant to be accessed directly by JavaScript and not sent directly to the server like cookies. localStorage is also newer, so there is less browser compatibility. The syntax to access this storage is also arguably simpler.
![E19FDC58-DDDE-403A-BABF-DB0D06CDF6FF](images/E19FDC58-DDDE-403A-BABF-DB0D06CDF6FF.png)

## **More On Session Security**
Users and web developers should be concerned with <u>[session hijacking](https://owasp.org/www-community/attacks/Session_hijacking_attack)</u>, an attack in which an attacker steals session identifiers and gains access to the web server as a different person.
Below, we will introduce a couple of secure practices for implementing sessions that prevents hijacking attacks.

### **Define Session Expiry**
The shorter a session is, the less time an attacker has to hijack a session. This is usually done by setting an expiry on the session cookie. It’s also important to implement an automatic session expiration on the backend.
A timeout dictates how long a session can stay open. The session timeout after an idle period is a common feature on bank websites! Other environments that require high security even implement an absolute timeout where a user’s session ends regardless of activity.

### **Make Session IDs Difficult to Hack**
Session IDs are just like passwords — the longer and more random, the better. According to <u>[OWASP](https://owasp.org/www-community/vulnerabilities/Insufficient_Session-ID_Length)</u>, session identifiers should be at least 128 bits long. This helps prevent brute-force attacks where a hacker uses multiple bots to guess IDs.
In order to make the session ID random, ensure it does not contain personally identifying information and that the algorithm to generate an ID doesn’t follow a predefined pattern that makes it easier to guess.

### **Securing Cookies**
Session cookies can be made more secure if they expire. This decreases the timeframe where an attacker could steal the session identifier.
You should also use the <u>[Secure](https://owasp.org/www-community/controls/SecureCookieAttribute)</u>, <u>[HttpOnly](https://owasp.org/www-community/HttpOnly)</u>, and <u>[SameSite](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)</u> attributes in the Set-Cookie HTTP header.

### **Enforce HTTPS**
Ideally, all sessions-based web applications should enforce HTTPS for all communication! This prevents common web attacks that could give the attacker access to the session.

















