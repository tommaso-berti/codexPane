# 5. JSON Web Tokens (JWTs)

[jwt.io](https://jwt.io/)

*JSON Web Tokens* are self-contained JSON objects that compactly and securely transmit information between two parties. They are secure because they are digitally signed using a secret or a public/private key pair.

A JWT is made up of three components:
* **Header****Payload****Signature**
## **JWT Header**
A JWT header contains the *type* of the token we’re creating and the *signing algorithm* that will be used.
* Type: The type of this token will always be “JWT”. The <u>[Internet Assigned Numbers Authority](https://www.iana.org/)</u>, or IANA, coordinates internet protocol resources across the globe. The “JWT” type aligns with the media type “<u>[application/jwt](https://www.iana.org/assignments/media-types/application/jwt)</u>“.
* Algorithm: The signing, or hashing, algorithm used might vary. Some commonly used algorithms are HMAC-SHA256, represented by "HS256", RSA with SHA-256, represented by "RW256", and ECDSA with SHA-256, represented by "ES256".
Here’s an example of a header specifying the HMAC-SHA256 algorithm:

```
{
  'alg': 'HS256',  
  'typ': 'JWT'
}

```


## **JWT Payload**
A JWT payload contains claims about an entity. A *claim* is a statement or piece of information and the *entity* is often a user.
There are three types of claims a JWT payload can contain:
* **Registered** Claims: These are predefined claim types that anyone can use in a JWT.
* **Public** Claims: These are custom claim types that are created by a developer and can be used publicly. They should be registered to avoid collisions, also known as repeated claims.
* **Private** Claims: These are custom claim types that are not registered or public. They are only used between parties that have agreed to use them.
Here’s an example payload using some common registered claims:

```
{
 'sub': '1234567890',
 'name': 'Harine Cooper',
 'admin': false,
 'iat': 1620924478,
 'exp': 1620939187
}

```

You can find <u>[a list of registered claims and public claims which have been registered in the IANA JSON Web Token Registry](https://www.iana.org/assignments/jwt/jwt.xhtml#claims)</u>.

## **JWT Signature**
A <u>[JWT signature](https://datatracker.ietf.org/doc/html/rfc7515)</u> is used to verify that the JWT wasn’t tampered with or changed. It can be created taking the encoded header, the encoded payload, a secret, and using the hashing algorithm to create a hash from those elements.
The *secret* is a symmetric key known by the sender and receiver of this token.
In this example, we will use <u>[jwt.io’s JWT debugger](https://jwt.io/#debugger-io)</u> to create our final JWT.
The Base64Url encoding of our header is:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9

```

The Base64Url encoding of our payload is:

```
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkhhcmluZSBDb29wZXIiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTYyMDkyNDQ3OCwiZXhwIjoxNjIwOTM5MTg3fQ

```

Finally, we use the HMAC-SHA256 algorithm we defined in our header to create our signature:

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)

```

which gives us: 3B-FLgPETrExxlDKW30AoU7KGE6xuZodw79TQR8_mwM

## **Our Final JWT**
Concatenating our encoded header, our encoded payload, and our signature, and separating each with a “.”, gives us our final token:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkhhcmluZSBDb29wZXIiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTYyMDkyNDQ3OCwiZXhwIjoxNjIwOTM5MTg3fQ.3B-FLgPETrExxlDKW30AoU7KGE6xuZodw79TQR8_mwM

```


## **How Do We Use a JWT?**
Now that we’ve stored our user’s information in our JWT, what do we do with it? How do we use the information in our JWT when communicating with our server?
1. The user logs into a website and their information is sent to the server.
2. The server creates a JWT with a secret
3. The JWT is returned to the browser
4. The user makes another request, and the browser sends the JWT back to the server in the <u>*[Authorization header](https://datatracker.ietf.org/doc/html/rfc6750)*</u><u>[ using the ](https://datatracker.ietf.org/doc/html/rfc6750)</u><u>*[Bearer schema](https://datatracker.ietf.org/doc/html/rfc6750)*</u>.
With our newly created JWT, this would look like:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkhhcmluZSBDb29wZXIiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTYyMDkyNDQ3OCwiZXhwIjoxNjIwOTM5MTg3fQ.3B-FLgPETrExxlDKW30AoU7KGE6xuZodw79TQR8_mwM

```

1. The server verifies the JWT signature and gets user information from the JWT.
2. The server will send a response back to the browser. If the JWT is valid, the browser will receive what it requested, if the JWT was not valid, the browser will likely receive an error message.
![32158BE8-D588-4DFF-851C-19529F13C082](images/32158BE8-D588-4DFF-851C-19529F13C082.png)

## **Improperly Storing a JWT**
Do not store your JWT in  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     <u>[localStorage](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#local-storage)</u>
 </span> as an attacker could use Cross-Site Scripting attacks to steal local data.
Storing your JWT in a cookie may seem like a solution to this, but could expose your data to a Cross-Site Resource Forgery attack. Additionally, if a user has disabled cookies in their browser, the application is now unable to store the JWT.

## **Why Use JWTs?**
JWTs are used for:
* Authorization: They’re often used for SSO.
* Information Exchange: If a server received a valid JWT, it knows the sender is who they say they are and the information hasn’t been tampered with.
So, why use JWTs?
* Parsing JSON is easier than some alternatives like XML or SAML.
* JWTs are small, scale well, and are easier for mobile devices to process.
Why are some reasons we might not want to a JWT?
* A mix of a public and private key-pair adds security, but can also add complexity.
* Sensitive information, like passwords or Social Security Numbers, should not be stored client-side, even if it is encoded.

## **Node.js JWT Libraries**
* <u>[jsonwebtoken GitHub repo](https://github.com/auth0/node-jsonwebtoken)</u><u>[node-jws GitHub repo](https://github.com/auth0/node-jws)</u><u>[jose GitHub repo](https://github.com/panva/jose)</u>



































