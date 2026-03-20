# 3. Spies with Sinon


In testing, a *spy* is a function that observes and records information about another function’s calls including arguments, return value, the this value, and exceptions thrown (if any). The information that is observed by the spy can then be used in assertions for testing.
### **What is Sinon?**
Sinon.js is a JavaScript library that includes standalone fakes, spies, and mocks that can be used in any unit testing framework. The <u>[Sinon spies documentation](https://sinonjs.org/releases/latest/spies/)</u> highlights the different information that can be pulled from spies.

### **How to Spy?**
There are multiple ways to use a spy, they can be anonymous functions or they can wrap around existing methods in a program. You can see all the many ways to use spies in the <u>[Sinon spies documentation](https://sinonjs.org/releases/latest/spies/)</u>, but we’ll focus on one type in particular: wrapping methods.
Our spy will be wrapped around a method and, as we use the method in our tests, will observe everything that happens involving that method. We can think of a spy with a wiretap, taking notes on every interaction that method has.

The following example demonstrates some basics of using the <u>[sinon.spy() method](https://sinonjs.org/releases/latest/spies/#using-a-spy-to-wrap-an-existing-method)</u> to test the method of an object.

```
const robot = {
  greet(name){  // Unit being tested
    return 'Hello ' + name;
  }
};

test('greet should return hello codey', () => {
  sinon.spy(robot, 'greet'); // Initialize the spy
  robot.greet('codey'); // Call the method
  expect(robot.greet.called).to.be.true;
  expect(robot.greet.calledWith('codey')).to.be.true;
  expect(robot.greet.returned('Hello codey')).to.be.true;
  robot.greet.restore(); // Remove spy from wrapped method
});

```

In the example above, the sinon.spy() method is used to wrap the robot object’s .greet() method. Doing so adds a number of useful properties and methods that allow us to monitor its behavior after we call robot.greet('codey'). Using a few of these methods, we test if the .greet() method…
* has been called using the .called property
* is called with the correct argument using the .calledWith() method
* returns what we expect it to return using the .returned() property
Finally, to ensure that the method returns to its original, un-spied-on state, we use the .restore() method.
