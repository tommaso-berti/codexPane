# 1. Testing Framework: Chai

# 
When writing tests, sometimes you’ll find that the tests require calculation steps or inline code to determine if the test is passing. For example, to test if an array foo includes an element bar using Mocha with the built-in Node assertion library, we use the JavaScript .includes() method:

```
assert.ok(foo.includes(bar));

```

To improve the readability and flow of our tests, Chai is a framework that provides a more robust assertion library.

```
const { assert } = require('chai');

```

Chai also features an .include() method, which allows us to rewrite the previous example as:

```
assert.include(foo, bar);

```


## **Testing HTML Responses**
It is possible to use .include() to verify that the HTML response contains a specific string, but verifying the hierarchical relationships of DOM elements becomes cumbersome.
We can use the jsdom library ([https://github.com/jsdom/jsdom#readme](https://github.com/jsdom/jsdom#readme)) to improve this type of assertion. It allows us to select elements of the DOM and check relationships and content. To increase the readability of our tests, we abstracted the jsdom functionality into a custom function, parseTextFromHTML:

```
const parseTextFromHTML = (htmlAsString, selector) => {
  const { document } = new JSDOM(htmlAsString).window;
  const selectedElement = document.querySelector(selector);
  
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

```

This function takes the HTML response as a string and the desired selector as inputs and returns the textContent of the corresponding element. If no element is found, it will throw a TypeError. It can be used like this:

```
describe('HTML tests', () => {
  describe('#bar', () => {
    it('should include the string "Hello"', () => {
      // setup
      const foo = '<html><div id="bar">Hello</div><div id="buzz">Hello</div><html>';
      //asserts
      assert.include(parseTextFromHTML(foo, '#bar'), 'Hello');
    });
  });
});

```


## **Async / Await**
We need a way to receive asynchronous responses from the server and then act on them. The async/await pattern helps us write readable descriptions of the behavior of our application, which is an important part of writing good tests.
To use this pattern, define the function with the async keyword. Then, within the function, use the await keyword in front of the asynchronous function you are calling. For example:

```
const foo = async () => {
  console.log(await someAsyncThing());
  return true;
}

foo();

```

## 
## **SuperTest**
[https://www.testim.io/blog/supertest-how-to-test-apis-like-a-pro/](https://www.testim.io/blog/supertest-how-to-test-apis-like-a-pro/)
[https://github.com/visionmedia/supertest#readme](https://github.com/visionmedia/supertest#readme)
We are using the function request() to make server calls to support our tests. This function is provided by the supertest library:

```
const request = require('supertest');

```

This library was specifically designed for testing Node server responses and integrates well with Mocha and Chai. To use supertest, we pass the app object from our app into the request function. To make a GET request, we use the .get() method, passing the desired route as the argument:

```
await request(app)
        .get('/')
        .send();

```

 is also possible to perform a POST request using supertest. We chain any desired properties or inputs to the HTTP call, and use .send() to make the request:

```
await request(app)
        .post('/messages')
        .type('form')
        .send({ author, message });

```






























