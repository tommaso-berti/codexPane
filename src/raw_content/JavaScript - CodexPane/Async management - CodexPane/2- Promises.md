# 2. Promises


A Promise object can be in one of three states:
* **Pending**: The initial state— the operation has not completed yet.
* **Fulfilled**: The operation has completed successfully and the promise now has a *resolved value*. For example, a request’s promise might resolve with a JSON object as its value.
* **Rejected**: The operation has failed and the promise has a reason for the failure. This reason is usually an Error of some kind.
We refer to a promise as *settled* if it is no longer pending— it is either fulfilled or rejected. Let’s think of a dishwasher as having the states of a promise:


## **Constructing a Promise Object**

```
const executorFunction = (resolve, reject) => { };
const myFirstPromise = new Promise(executorFunction);

```

The Promise constructor method takes a function parameter called the *executor function* which runs automatically when the constructor is called. The executor function generally starts an asynchronous operation and dictates how the promise should be settled.
The resolve() and reject() functions aren’t defined by the programmer. When the Promise constructor runs, JavaScript will pass **its own** resolve() and reject() functions into the executor function.
* resolve is a function with one argument. Under the hood, if invoked, resolve() will change the promise’s status from pending to fulfilled, and the promise’s resolved value will be set to the argument passed into resolve().
* reject is a function that takes a reason or error as an argument. Under the hood, if invoked, reject() will change the promise’s status from pending to rejected, and the promise’s rejection reason will be set to the argument passed into reject().

```
const executorFunction = (resolve, reject) => {
 if (someCondition) {
     resolve('I resolved!');
 } else {
     reject('I rejected!'); 
 }
}
const myFirstPromise = new Promise(executorFunction);

```


## .then()
he initial state of an asynchronous promise is pending, but we have a guarantee that it will settle. How do we tell the computer what should happen then? Promise objects come with an aptly named .then() method.
.then() is a higher-order function— it takes two callback functions as arguments. We refer to these callbacks as *handlers*. When the promise settles, the appropriate handler will be invoked with that settled value.
* The first handler, sometimes called onFulfilled, is a *success handler*, and it should contain the logic for the promise resolving.
* The second handler, sometimes called onRejected, is a *failure handler*, and it should contain the logic for the promise rejecting.
We can invoke .then() with one, both, or neither handler! This allows for flexibility, but it can also make for tricky debugging. If the appropriate handler is not provided, instead of throwing an error, .then() will just return a promise with the same settled value as the promise it was called on. One important feature of .then() is that it always returns a promise. We’ll return to this in more detail in a later exercise and explore why it’s so important.

```
let prom = new Promise((resolve, reject) => {
  let num = Math.random();
  if (num < .5 ){
    resolve('Yay!');
  } else {
    reject('Ohhh noooo!');
  }
});
const handleSuccess = (resolvedValue) => {
  console.log(resolvedValue);
};
const handleFailure = (rejectionReason) => {
  console.log(rejectionReason);
};
prom.then(handleSuccess, handleFailure);

```


## .catch()
The .catch() function takes only one argument, onRejected. In the case of a rejected promise, this failure handler will be invoked with the reason for rejection. Using .catch() accomplishes the same thing as using a .then() with only a failure handler.

```
prom
 .then((resolvedValue) => {
   console.log(resolvedValue);
 })
 .catch((rejectionReason) => {
   console.log(rejectionReason);
 });

```


## **Chaining Multiple Promises**
Promises are designed with composition in mind! Here’s a simple promise chain in code:

```
firstPromiseFunction()
.then((firstResolveVal) => {
  return secondPromiseFunction(firstResolveVal);
})
.then((secondResolveVal) => {
  console.log(secondResolveVal);
});

```

* We invoke a function firstPromiseFunction() which returns a promise.
* We invoke .then() with an anonymous function as the success handler.
* Inside the success handler we **return** a new promise— the result of invoking a second function, secondPromiseFunction() with the first promise’s resolved value.
* We invoke a second .then() to handle the logic for the second promise settling.
* Inside that .then(), we have a success handler which will log the second promise’s resolved value to the console.
In order for our chain to work properly, we had to return the promise secondPromiseFunction(firstResolveVal). This ensured that the return value of the first .then() was our second promise rather than the default return of a new promise with the same settled value as the initial.

## Promise.all()
 What if we’re dealing with multiple promises, but we don’t care about the order? Let’s think in terms of cleaning again.
To maximize efficiency we should use *concurrency*, multiple asynchronous operations happening together. With promises, we can do this with the function Promise.all().
Promise.all() accepts an array of promises as its argument and returns a single promise. That single promise will settle in one of two ways:
* If every promise in the argument array resolves, the single promise returned from Promise.all() will resolve with an array containing the resolve value from each promise in the argument array.
* If any promise from the argument array rejects, the single promise returned from Promise.all() will immediately reject with the reason that promise rejected. This behavior is sometimes referred to as *failing fast*.
