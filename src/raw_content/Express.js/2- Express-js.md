# 2. Express.js

[https://expressjs.com/en/guide/routing.html](https://expressjs.com/en/guide/routing.html)

Express is a powerful but flexible Javascript framework for creating web servers and <u>[APIs](https://en.wikipedia.org/wiki/Web_API)</u>. It can be used for everything from simple static file servers to JSON APIs to full production servers.

## **Starting A Server**
Express is a Node module, so to use it, we will need to import it into our program file. The imported express function must then be invoked to create a server. Check out this sample app.js:

```
// app.js
const express = require('express');
const app = express();

module.exports = { app };

```

On the first line, we import the Express library with require(). When invoked on the second line, it returns an instance of an Express application. This application can then be used to start a server and specify server behavior.
The final line exports the app so that it can be used in another file.
The purpose of a server is to listen for requests, perform whatever action is required to satisfy the request, and then return a response. In order for our server to start responding, we have to tell the server where to *listen* for new requests by providing a port number argument to a method called app.listen(). The server will then listen on the specified <u>[port](https://en.wikipedia.org/wiki/Port_(computer_networking))</u> and respond to any requests that come into it.
The second argument is a callback function that will be called once the server is running and ready to receive responses.
It is common practice to define the Express application in one file, then have it listen in another file, as a way to separate concerns.

```
// main.js
const { app } = require("./app.js");

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

```

In this example, main.js imports the app from app.js, then calls app.listen() to have the server begin listening on port 4001. Once the server is started, it will log 'Server is listening on port 4001'.

## **Writing a Route**
To tell our server how to deal with any given request, we register a series of **routes**. Routes define the control flow for requests based on the request’s **path** and HTTP verb.
For example, if we wanted our server to respond to GET requests at /monsters, we would create a route to define the appropriate functionality for that HTTP verb (GET) and path (/monsters). In this case, it might return a list of all monsters stored in the server.
The path is a part of the request URL, located after the <u>[hostname](https://en.wikipedia.org/wiki/Hostname)</u> and port number. For example, in a request to localhost:4001/monsters, localhost is the hostname, 4001 is the port number, and /monsters is the path.

### GET
Express uses app.get() to register routes to match GET requests. Express routes (including app.get()) usually take two arguments, a path (usually a string), and a callback function to handle the request and send a response.

```
const moods = [{ mood: 'excited about express!'}, { mood: 'route-tastic!' }];
app.get('/moods', (req, res, next) => {
  // Here we would send back the moods array in response
});

```

The route above will match any GET request to '/moods' and execute the callback function, passing in two objects as the first two arguments. These objects represent the request sent to the server and the response the Express server should eventually send to the client.
next is a function, which we will cover in a later lesson, and can be omitted when not used.
If no routes are matched on a client request, the Express server will handle sending a 404 Not Found response to the client.
(Re

## **Sending A Response**
HTTP follows a one request/one response cycle. Each client expects exactly one response per request, and each server should only send a single response back to the client per request.
Express servers send responses using the .send() method on the response object. .send() will take any input and include it in the response body.

```
const monsters = [
  { type: 'werewolf' }, 
  { type: 'hydra' }, 
  { type: 'chupacabra' }
];
app.get('/monsters', (req, res, next) => {
  res.send(monsters);
});

```


In this example, a GET /monsters request will match the route, Express will call the callback function, and the res.send() method will send back an array of spooky monsters.
In addition to .send(), .json() can be used to explicitly send JSON-formatted responses. .json() sends any JavaScript object passed into it.

## **Matching Route Paths**
Express tries to match requests by route, meaning that if we send a request to <server address>:<port number>/api-endpoint, the Express server will search through any registered routes in order and try to match /api-endpoint.
Express searches through routes in the order that they are registered in your code. The first one that is matched will be used, and its callback will be called.

```
app.get('/another-route', (req, res, next) => {
  // route handling
})

app.get('/expressions', (req, res, next) => {
  res.send();
})

```

When a GET /expressions request arrives to the Express server, it first checks /another-route‘s path because it is registered before the /expressions route. Because /another-route does not match the path, Express moves on to the next registered route. Since the route matches the path, the callback is invoked, and it sends a response.
If there are no matching routes registered, or the Express server has not sent a response at the end of all matched routes, it will automatically send back a “404 Not Found” response, meaning that no routes were matched or no response was ultimately sent by the registered routes.

## **Getting A Single Expression**
Routes become much more powerful when they can be used dynamically. Express servers provide this functionality with named **route parameters**. Parameters are route path segments that begin with : in their Express route definitions. They act as wildcards, matching any text at that path segment. For example, /monsters/:id will match both /monsters/1 and /monsters/45
Express parses any parameters, extracts their actual values, and attaches them as an object to the request object: .params. This object’s keys are any parameter names in the route, and each key’s value is the actual value of that field per request.

```
const monsters = { 
  hydra: { height: 3, age: 4 }, 
  dragon: { height: 200, age: 350 } 
};

// GET /monsters/hydra
app.get('/monsters/:name', (req, res, next) => {
  console.log(req.params); // { name: 'hydra' }
  res.send(monsters[req.params.name]); // { height: 3, age: 4 }
});

```

In this code snippet, a .get() route is defined to match /monsters/:name path. When a GET request arrives for /monsters/hydra, the callback is executed. Inside the callback, req.params is an object with the key name and the value 'hydra', which was present in the actual request path.

## **Setting Status Codes**
Express allows us to set the <u>**[status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)**</u> on responses before they are sent. Response codes provide information to clients about how their requests were handled. Until now, we have been allowing the Express server to set status codes for us. For example, any res.send() has by default sent a “200 OK” status code.
The res object has a .status() method to allow us to set the status code, and other methods like .send() can be chained from it.

```
const monsterStoreInventory = { fenrirs: 4, banshees: 1, jerseyDevils: 4, krakens: 3 };
app.get('/monsters-inventory/:name', (req, res, next) => {
  const monsterInventory = monsterStoreInventory[req.params.name];
  if (monsterInventory) {
    res.send(monsterInventory);
  } else {
    res.status(404).send('Monster not found');
  }
});

```

In this example, we’ve implemented a route to retrieve inventory levels from a Monster Store. Inventory levels are kept in the monsterStoreInventory variable. When a request arrives for GET /monsters-inventory/mothMen, the route matches and so the callback is invoked. req.params.name will be equal to 'mothMen' and so our program accesses monsterStoreInventory['mothMen']. Since there are no mothMen in our inventory, res.status() sets a 404 status code on the response, and .send() sends the response.

## **Matching Longer Paths**
Parameters are extremely helpful in making server routes dynamic and able to respond to different inputs. Route parameters will match anything in their specific part of the path, so a route matching /monsters/:name would match all the following request paths:

```
/monsters/hydra
/monsters/jörmungandr
/monsters/manticore
/monsters/123

```

In order for a request to match a route path, it must match the entire path, as shown in the image in the workspace.

```
app.get('/expressions', (req, res, next) => {
  res.send(getAllExpressions());
})

app.get('/expressions/:id', (req, res, next) => {
  const expression = getExpressionById(req.params.id);
  res.send(expression);
})

```

A request arrives for /expressions/1. It first tries to match the /expressions route, since it is defined first, but because it has additional path segments after /expressions, it does not match this route and moves on to the next. It matches /expressions/:id because :id will match any value at that level of the path segment. The route matches, so the Express server calls the callback function, which in turn handles the request and sends a response.

## **Other HTTP Methods**
This course will cover three other important HTTP methods: PUT, POST, and DELETE. Express provides methods for each one: app.put(), app.post(), and app.delete().

### PUT
PUT requests are used for updating existing resources.
To send additional information along with a request, we can use a **query string**. <u>[Query strings](https://en.wikipedia.org/wiki/Query_string)</u> appear at the end of path URLs, and they are indicated with a ? character. For instance, in /monsters/1?name=chimera&age=1, the query string is name=chimera&age=1 and the path is /monsters/1/
Query strings do not count as part of the route path. Instead, the Express server parses them into a JavaScript object and attaches it to the request object’s .query property. The key: value relationship is indicated by the = character in a query string, and multiple key-value pairs are separated by &. In the example route from the previous paragraph, the .query object would be { name: 'chimera', age: '1' }.

```
const monsters = { '1': { name: 'cerberus', age: '4'  } };

// PUT /monsters/1?name=chimera&age=1
app.put('/monsters/:id', (req, res, next) => {
  const monsterUpdates = req.query;
  monsters[req.params.id] = monsterUpdates;
  res.send(monsters[req.params.id]);
});

```

In this example, we have a route for updating monsters by ID. When a PUT /monsters/1?name=chimera&age=1 request arrives, our callback function is executed, and we create a monsterUpdates variable to store req.query. Since req.params.id is '1', we replace the value at monsters['1'] with monsterUpdates. Finally, Express sends back the new object stored at monsters['1'].
When handling PUT requests (i.e., updating existing entries), many servers will send back the updated resource after the changes are applied so that the client has the exact same version of the resource as the server and database

### POST
POST is the HTTP method verb used to create new resources. Because POST routes create new data, their paths do not end with a route parameter, but instead end with the type of resource to be created.
For example, to create a new monster, a client would make a POST request to /monsters. The client does not know the id of the monster until it is created and sent back by the server. Therefore, POST /monsters/:id would not make sense because a client cannot know the unique ID of a monster before it exists.
Express uses .post() as its method for POST requests. POST requests may use various ways to send data to create new resources, including query strings.
The HTTP status code for a newly-created resource is “201 Created”.

```
app.post('/expressions', (req, res, next) => {
  const receivedExpression = createElement('expressions', req.query);
  if (receivedExpression) {
    expressions.push(receivedExpression);
    res.status(201).send(receivedExpression);
  } else {
    res.status(400).send();
  }
});

```


### DEL
DELETE is the HTTP method verb used to delete resources. Because DELETE routes delete currently existing data, their paths should usually end with a route parameter to indicate which resource to delete.

```
app.delete('/expressions/:id', (req, res, next) => {
    const expressionIndex = getIndexById(req.params.id, expressions);
    if(expressionIndex !== -1) {
      expressions.splice(expressionIndex, 1)
      res.status(204).send();
    } else {
      res.status(404).send();
    }
})

```

Express uses the .delete() method for DELETE requests.

## **Matching By HTTP Verb**

```
app.get('/expressions/:id', (req, res, next) => {
  const expression = getExpressionById(req.params.id);
  res.send(expression);
})

app.put('/expressions/:id', (req, res, next) => {
  const expression = getExpressionById(req.params.id);
  const updatedExpression = updateExpression(expression, req.query);
  res.send(updatedExpression);
})

```

The path for the first route matches, but the method verb is wrong, so the Express server will continue to the next registered route. This route matches both method and path, and so its callback is called, the necessary updating logic is executed, and the response is sent.

## Response status
[https://en.wikipedia.org/wiki/List_of_HTTP_status_codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

## Methods
### Req.method
Returns the method of the request.

```
app.get('/...', (req, res, next) => {
    let request = req.method           //request is 'GET'
})

```





























