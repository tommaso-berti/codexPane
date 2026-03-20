# 5. Router parameters



```
app.get('/books/:isbn', (req, res, next) => {
  const book = getBookByIsbn(req.params.isbn);
  res.send(book);
});

app.get('/books/:isbn/checkoutHistory', (req, res, next) => {
  const book = getBookByIsbn(req.params.isbn);
  const checkoutHistory = book.checkoutHistory;
  res.send(checkoutHistory);
});

```

In the preceding code, we need to extract the request parameter  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     :isbn
 </span> from the URL in both instances, and end up duplicating the necessary code so that it appears in both routes. When working with routes that require parameters, we might find ourselves in a position where multiple different routes require the same parameter and use it to identify the same piece of data

**router.param()**
Express, luckily, is mindful of the pain-point of replicated parameter-matching code and has a method specifically for this issue. When a specific parameter is present in a route, we can write a function that will perform the necessary lookup and attach it to the req object in subsequent middleware that is run.

```
app.param('isbn', (req, res, next, isbn) => {
  try {
    const found = books.find((book) => {
      return isbn === book.isbn;
    })
    if (found) {
      req.book = found;
      next();
    } else {
      next(new Error('No book matched the ISBN you provided.'));
    };
  } catch (err) {
    next(err)
  }
});
```


```


```

In the preceding code, we intercept any request to a route handler with the :isbn parameter. Note that in the app.param() function signature, 'isbn' does not have the leading :. The actual ID will be passed in as the fourth argument, id in this case, to the app.param() callback function when a request arrives.
If books does not exist, or some other error is thrown in this process, we pass the error to the following middleware (hopefully we’ve written some error-handling middleware, or included some externally-sourced error-handling middleware). If the book exists in books, the .find() method will store the spell in found, and we attach it to the .book property of the request object (so future routes can reference it via req.book). If the requested book does not exist, .find() will store undefined in found, and we let future middlewares know there was an error with the request by creating a new Error object and passing it to next().
Note that inside an app.param() callback, you should use the fourth argument as the parameter’s value, not a key from the req.params object.

```
app.param('spiceRackId', (req, res, next, id) => {
  const idToFind = Number(id);
  const rackIndex = spiceRacks.findIndex(spiceRack => spiceRack.id === idToFind);
  if (rackIndex !== -1) {
    req.spiceRack = spiceRacks[rackIndex];
    req.spiceRackIndex = rackIndex;
    next();
  } else {
    res.status(404).send('Spice Rack Not Found.');
  }
});

app.get('/spice-racks', (req, res, next) => {
 res.send(spiceRacks);
});

app.post('/spice-racks', (req, res, next) => {
  const newRack = req.body.spiceRack;
  newRack.id = nextSpiceRackId++;
  spiceRacks.push(newRack);
  res.send(newRack);
});
```


```


```


## **Merge Parameters**
When we’re building web endpoints, we might want to access some property of a complex object. In order to do this in Express, we can design a nested router. This would be a router that is invoked within another router. In order to pass parameters the parent router has access to, we pass a special configuration object when defining the router.

```
const authorRouter = express.Router();
const bookRouter = express.Router({ mergeParams: true });

authorRouter.use('/:authorName/books', bookRouter);

authorRouter.get('/', (req, res, next) => {
  res.status(200).send(authors);
  next();
});

authorRouter.param('authorName', (req, res, next, id) => {
  const author = getAuthorById(id);
  req.author = author;
  next();
});

bookRouter.get('/', (req, res, next) => {
  res.status(200).send(`Author ${req.author} has the following books: ${getBooks(req.author)}`);
});

app.use('/author', authorRouter);
```


```


```

In the preceding code, we define two endpoints: /author and /author/:authorName/books. The books are nested into the /author endpoint, indicating that an author may write multiple books. Take careful note of the { mergeParameters: true } argument that gets passed when creating the bookRouter. This argument tells Express that the bookRouter should have access to parameters passed into its *parent* router, that is, authorRouter.
We then tell Express that the path for bookRouter is the same as the path for authorRouter with the additional path segment /:authorName/books. We can then create a family of routes (i.e., a router) by appending routes to the base path of bookRouter: /author/:authorName/books.

































