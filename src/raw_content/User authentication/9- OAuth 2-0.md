# 9. OAuth 2.0


When the user enters their username and password on a website and hits “Submit”, what happens? Your web browser submits that information to the server’s API to authenticate you. An *API* is the part of a server that sends and receives data. There are three main types of API authentication:
* HTTP Basic Auth
* API Keys
* OAuth

## **HTTP Basic Auth**
HTTP Basic Auth is the oldest (since 1999) and simplest method of authentication. It simply requires you to send your username and password every time you communicate with the web page. The reason this isn’t necessary when you use your browser is because of cookies. *Cookies* store your credentials so that you don’t need to send them every time you click on a button.

## **API Keys**
API Keys are similar to HTTP Basic Auth except, instead of a username and password, you use something called an *API token*. An API token is a unique string of letters and numbers generated for each user. API Keys are frequently used by developers to authenticate their own scripts or applications when interacting with another application’s API. API Keys have the added advantage of being long and difficult to guess.
Unfortunately, API Keys are too long and complex to be practical for everyday users to use them to log in, and, like the credentials used in HTTP Basic Auth, they are vulnerable to interception when they are submitted for authentication.

## **OAuth**
Sometimes we don’t even have to create a username and password for a new account. Instead, we can sign in with Google, LinkedIn, Twitter, and more. This is possible because of OAuth.
![3772BDBF-7494-46EB-B739-05D4C8FCBB69](images/3772BDBF-7494-46EB-B739-05D4C8FCBB69.png)
## 
## **Access Tokens**
Authentication in OAuth is facilitated by the use of *access tokens*. Access tokens are used to make API requests on behalf of the user and represent the authorization of a specific application to access specific parts of a user’s data. These API requests are made over HTTPS connections.
Access tokens are very short-lived, and they only last anywhere from a few minutes to just hours. Their ephemeral nature limits the amount of time an attacker can use a stolen token.
![CF7A3CB0-0484-4ECE-A604-076CA6D00743](images/CF7A3CB0-0484-4ECE-A604-076CA6D00743.png)
*Refresh tokens* are longer lived than access tokens and are used by applications to get new access tokens without prompting the user. Refresh tokens can expire, like access tokens, but they can also be revoked by the authorization server.
## 
## **OAuth 2.0 Grant Types**
OAuth 2.0 *grant types*, also known as flows, describe multiple ways to obtain access tokens. Flows involve two main parts:
* Redirecting the user to the OAuth provider and obtaining an access token
* Using the access token to gain restricted access
Each grant type is optimized for a specific type of application based on complexity and severity. The grant type chosen will depend on whether the code can securely store a secret key and the trust level between a user and a client.
![622AB703-5B62-4B66-8B37-DFEB4272A958](images/622AB703-5B62-4B66-8B37-DFEB4272A958.png)

### **Client Credentials Grant**
A *Client Credentials Grant* is used when applications request an application token to access their own resource. This grant type has a limited use case because it’s only used when the resource server and the authentication server are the same entity.

### **Authorization Code Grant**
The *Authorization Code Grant* is the most widely used grant for publicly available applications. This was the grant type we showed earlier in this article. To use this grant type, the webserver must have the capability to store client credentials securely.
This approach uses browser redirection to communicate between the resource server and the authorization server. The client will obtain an authorization code and then exchange it for an access token.

### **Proof Key for Code Exchange (PKCE)**
*PKCE* is an extension to the Authorization Code flow, and it is used to prevent attacks and to securely perform the OAuth exchange from public clients. This extension helps prevent authorization code injection from malicious actors.

### **Implicit Grant - Deprecated**
The *Implicit Grant* is similar to the authorization code grant except in the case of single-page applications that cannot store client credentials. In this case, the authorization server will return an access token directly. The Implicit flow is deprecated, but might still be seen in legacy code. It has been replaced by the PKCE extension.

### **Device Code Grant**
The *Device Code Grant* is used for devices that have no browser and/or have limited input capability to input an access token. Some examples of this might be smart TV apps.

### **Resource Owner Password Credential Grant - Deprecated**
This grant is used when an application exchanges the user’s username and password for an access token. It’s important to note that third-party applications should never be allowed to ask the user for their password! The Resource Owner Password Credential flow would only be used if you had a high trust relationship with the client application. The Resource Owner Password Credential flow is deprecated, but might still be seen in legacy code.

## **Threats to OAuth**
OAuth tokens are great at defending users against data breaches because, even if websites that use OAuth to log in are hacked, there are no passwords contained in databases. Even if an attacker were to obtain the access tokens, the usually short-lived nature of the access tokens means an attacker would not be able to do much with them.
OAuth both authorizes and authenticates - in the above example, Codecademy was authorized to only view the user’s private email address, but it could have asked for much more data.
Let’s assume that an attacker sets up a malicious website, and tells a user that they must authenticate with OAuth through GitHub. Instead of asking for just an email, the website asks for access to private repositories and secret gists. If the user isn’t paying attention, or has been socially engineered into believing that this access is required, they could grant access to the malicious application.
If a user grants this access to the malicious application, the attacker would have access to all of the user’s private information on Github — without ever knowing their password! This was the <u>[method successfully used by the hacking group Fancy Bear](https://www.trendmicro.com/en_us/research/17/d/pawn-storm-abuses-open-authentication-advanced-social-engineering-attacks.html)</u> (also known as APT28 and Pawn Storm) to <u>[attack the Democratic National Convention in 2016](https://www.trendmicro.com/vinfo/us/security/news/cyber-attacks/espionage-cyber-propaganda-two-years-of-pawn-storm)</u>.

# 
# **Introduction to OAuth**
OAuth is an *authorization framework* that provides specific authorization flows which allow unrelated servers to access authenticated resources without sharing any passwords. It works by allowing applications to authenticate with third-party services in exchange for an *access token* which can be passed with an HTTP request to access protected content

## **Installing oauth2-server**
OAuth describes a protocol for authentication, and there are many open-source and commercial <u>[libraries](https://oauth.net/code/)</u> for various programming languages to help implement it. We will use <u>[the oauth2-server module](https://www.npmjs.com/package/oauth2-server)</u> to implement an OAuth 2.0 provider in Node.js utilizing the client credentials grant type to demonstrate obtaining an access token and using it in request.

```
const OAuth2Server = require('oauth2-server');

```


## **Creating an OAuth 2.0 Server Instance**
Inside **app.js**, where we have included the oauth2-server package, we’ll create an instance of <u>[the OAuth2Server object](https://oauth2-server.readthedocs.io/en/latest/api/oauth2-server.html)</u> and store it in a variable named oauth.

```
const oauth = new OAuth2Server();

```

The OAuth2Server object requires a model object which contains functions to access, store, and validate our access tokens. We’ll be writing them separately in a file named **model.js**.
Inside the constructor of OAuth2Server, pass an object with an attribute named model, and we’ll import **model.js** using the require() function as the value.

```
const oauth = new OAuth2Server({
  model: require('./model.js')
});

```

OAuth2Server can be supplied with additional options in the constructor. To pass tokens inside the URL, we’ll set the allowBearerTokensInQueryString attribute to true:

```
const oauth = new OAuth2Server({
  model: require('./model.js'),
  allowBearerTokensInQueryString: true
})

```

The access token lifetime can also be configured as an option using the accessTokenLifetime attribute. The lifetime is set in seconds, and we can set the access token lifetime to one hour like this:

```
const oauth = new OAuth2Server({
  model: require('./model.js'),
  allowBearerTokensInQueryString: true,
  accessTokenLifetime: 60 * 60
})

```


## **Registering Client to Application**
OAuth defines <u>[two types of clients](https://www.oauth.com/oauth2-servers/client-registration/client-id-secret/)</u> — confidential clients and public clients.
* *Public clients* are NOT able to store credentials securely and can only use grant types that do not use their client secret.
* *Confidential clients* are applications that can be registered to an authorization 
* <u>[server](https://www.codecademy.com/resources/docs/general/server)</u> using credentials. Those credentials, a client ID and a client secret, can be secured without exposing them to a third party. They require a backend server to store the credentials. A client’s ability to securely store credentials determines which type of OAuth authorization flows should be used.
We’ll be implementing the <u>[Client Credentials flow](https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/)</u> to obtain an access token for authentication. When a developer registers a client in an OAuth application, they’ll need:
* A *Client ID*: a public identifier for apps that is unique across all clients and the authorization server.
* A *Client Secret*: a secret key known only to the application and the authorization server.
OAuth 2.0 is flexible in which databases to use, and the oauth2-server package implicitly allows Postgres, MongoDB, and Redis.
We can register an application to the list of confidentialClients in **db.js**. Inside the module.exports object, we create an attribute named confidentialClients and set it equal to an 
<u>[array](https://www.codecademy.com/resources/docs/general/data-structures/array)</u>. Within the array, we create an object with the clientId and clientSecret, and specify 'client_credentials' in our array of grant types.

```
module.exports = {
  confidentialClients: [{
    clientId: 'secretapplication',
    clientSecret: 'topsecret',
    grants: [
      'client_credentials'
    ]
  }]
}

```

In our database, we’ll create a location to store access tokens. Within the module.exports object, we create another property named tokens and set it equal to an empty array.

```
module.exports = {
  // Confidential Clients Settings
  tokens: []
}

```


## **getClient()**
OAuth2Server requires certain functions implemented in the model regardless of the authorization flow used. The getClient() function is an example of a required model function for all flows. The function is used to retrieve a client using a Client ID and/or a Client Secret combination.
The <u>[getClient() function](https://oauth2-server.readthedocs.io/en/latest/model/spec.html#model-getclient)</u> takes two arguments: clientId and clientSecret. We must write a database query to match the provided arguments and its implementation will vary depending on the type of database used. Since we are using JavaScript as our in-memory database, we can use the .filter() method to evaluate if the clientId and clientSecret match any confidential clients in **db.js** and return the matching client.

```
const getClient = (clientId, clientSecret) => {
  let confidentialClients = db.confidentialClients.filter((client)=>{
    return client.clientId === clientId && client.clientSecret === clientSecret
  });
  return confidentialClients[0];
}

```

Each element’s clientId and clientSecret is tested to match against the clientId and clientSecret of the client that is passed and will return the client that matches both values in an array. Finally, the getClient() function returns the first element in confidentialClients.
Finally, we export the function from **model.js** so that it can be used from other files. We can do this using module.exports object.

```
module.exports = {
  getClient: getClient
}

```


## **saveToken()**
The <u>[saveToken() function](https://oauth2-server.readthedocs.io/en/latest/model/spec.html#savetoken-token-client-user-callback)</u> must be implemented for all grant types in the model used by OAuth2Server. This function stores the access token as an object to a database when an access token is obtained.
The saveToken() function is implemented with three arguments: token, client, and user. 
- We set the token.client equal an object in which the id attribute is equal to the passed client’s clientId.
- The token.user is set equal to an object with the username attribute. We set the username attribute equal to the username of the passed user object.
* With the token formatted, we can save the token to our database by pushing the token to our db.tokens array and returning the token.

```
const saveToken = (token, client, user) => {
  token.client = {
    id: client.clientId
  }
  token.user = {
    username: user.username
  }
  db.tokens.push(token);
  return token;
}

```


## **getUserFromClient()**
Certain grant types have specific functions that must be implemented for them to work. The Client Credentials grant type must have the <u>[getUserFromClient() function](https://oauth2-server.readthedocs.io/en/latest/model/spec.html?highlight=token#getuserfromclient-client-callback)</u> implemented to be used.
The getUserFromClient() function is invoked to retrieve the user associated with the specified client. We are not using a user in our application so we can return an empty object. However, leaving out this function declaration will throw an error when using the Client Credentials grant type!

```
const getUserFromClient = (client) => {
  return {};
}

```

Finally, we export the function from **model.js** so that it can be used from other files.

```
module.exports = {
  // Other modules to export
  getUserFromClient: getUserFromClient
}

```


## **Obtaining Token Handler**
Now that our model functions for generating and saving access tokens are implemented in **model.js**, we need to create a callback function to handle obtaining the access token whenever a URL is requested in our application. Within **app.js**, we create a function named obtainToken() that takes the HTTP request and HTTP response as arguments—req and res.
- Inside obtainToken(), we create a new variable named request and set it to a new instance of OAuth2Server.Request(), passing the HTTP request, req, as the argument
- We’ll also create a new variable named response and set it to a new instance of OAuth2Server.Response(), taking in res as the argument
- The <u>[.token()](https://oauth2-server.readthedocs.io/en/latest/api/oauth2-server.html#oauth2server-token)</u> method of the oauth object returns the access token. The method passes the OAuth2Server‘s request and response stored in response and request variables. We use the .then() method to return a promise. If the token method is successful, we will send the access token back to the client using the .json() Express method.
- We’ll chain the .catch() method to handle any errors if the .token() method fails. If the .token() method returns an error code or an HTTP 500 status, the error can be sent back to the client using the .json() method.

```
const obtainToken = (req, res) => {
  let request = new OAuth2Server.Request(req);
  let response = new OAuth2Server.Response(res);

  return oauth.token(request, response)
      .then((token) => {
          res.json(token);
      })
      .catch((err) => {
          res.status(err.code || 500).json(err);

```


```
      });

```


```

}

```

Note, must declare our function expressions before they can be used. To make use of our obtainToken() function, we can define a new route and pass obtainToken() as a callback function. We use the <u>[.all() method](https://expressjs.com/en/4x/api.html#app.all)</u> to handle all types of HTTP requests since we will eventually use a POST request on the route. 
Now the client can make an HTTP request with the Client Secret to /auth and receive an access token.

```
app.all('/auth', obtainToken);

```


## **getAccessToken()**
Now that we’ve written the code to obtain an access token, we can use it to restrict access to content unless a user is authenticated with a valid access token. Inside **model.js**, we implement the <u>[getAccessToken() function](https://oauth2-server.readthedocs.io/en/latest/model/spec.html#getaccesstoken-accesstoken-callback)</u> to retrieve existing tokens that were previously saved when the saveToken() function is invoked.
The getAccessToken() function is required when the <u>[.authenticate() method](https://oauth2-server.readthedocs.io/en/latest/api/oauth2-server.html#authenticate-request-response-options-callback)</u> is used on an OAuth2Server instance. getAccessToken() is declared with one parameter—accessToken.
When the function is invoked the accessToken is checked against the tokens stored inside the **db.js** to see if there is a match. We can use JavaScript’s .filter() method to each token in the database against the access token that is passed. If there is a match, the access token can be returned. 

```
const getAccessToken = (accessToken) => {
 let tokens = db.tokens.filter((savedToken)=>{
   return savedToken.accessToken === accessToken;
 })
 return tokens[0];
}

```

In the above example code, the getAccessToken() function expression is called with an access token as an argument. The .filter() method is used to check each token saved in the tokens array in the database to match the access token passed to the function. Finally, we return the matching access token from the array.
We export the function from **model.js** so that it can be used from other files. We can do this using module.exports object.

```
module.exports = {
  // Exported functions
  getAccessToken: getAccessToken
}

```


## **Authentication Middleware**
With the model function for checking access tokens implemented, let’s create a middleware function to handle authenticating access tokens inside our application. Inside **app.js**, we will create a function named authenticateRequest() that takes three arguments: req, res, next.
- Inside the function, we create a new variable named request and set it to a new instance of OAuth2Server.Request(), taking in the HTTP request, req, as the argument.
- We’ll create a new variable named response and set it to a new instance of OAuth2Server.Response(), passing in the HTTP response, res.
- We then return <u>[.authenticate() method](https://oauth2-server.readthedocs.io/en/latest/api/oauth2-server.html#authenticate-request-response-options-callback)</u>, that is provided by the OAuth2Server object, on oauth, passing in response and request. The method returns a Promise that resolves to the access token object returned from the .getAccessToken() method we defined in model.js. We’ll use a promise chain to handle the flow.
- We use the .then() method, and if the access token is valid, we can call the next() function to call the next function. We’ll chain the .catch() method to handle an error or if the access token is invalid. Inside .catch() method, we can send a response back to the client using the .send() method.

```
const authenticateRequest = (req, res, next) => {

  let request = new OAuth2Server.Request(req);
  let response = new OAuth2Server.Response(res);

  return oauth.authenticate(request, response)
    .then(()=>{
      next();
    })
    .catch((err) => {
      res.send(err);
    })
}

```

Finally, we can add authenticateRequest as a middleware function to a route to restrict access. Now the client must include the bearer token in the header when making a request to the route to gain authenticated access.

```
app.get('/secret', authenticateRequest, function(req, res){
  res.send("Welcome to the secret area!");
});

```


## **Testing Endpoints with HTTP**
 We can make an HTTP POST request to the /auth route to obtain an access token.

```
POST http://localhost:4001/auth
Content-Type: application/x-www-form-urlencoded
Authorization: Basic Y29kZWNhZGVteTpjb2RlY0BkZW15

grant_type=client_credentials

```

In the HTTP header, we set Authorization to Basic and the base64 encoded Client ID and Client Secret. In the POST request data, we provide grant_type=client_credentials. The server will respond with an access token that looks like this:

```
{
  "accessToken":" "<access token>",
  "accessTokenExpiresAt":"2021-06-17T01:02:37.272Z",
  "client": {
    "id": "codecademy",
    "user":{}
  }
}

```

To use the access token while requesting authenticated content, we pass the bearer token in the Authentication request header, replacing <Access Token> with the token returned from the request to /auth like so:

```
GET http://localhost:4001/secret
Authorization: Bearer <Access Token>

```





