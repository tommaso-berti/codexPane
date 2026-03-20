# 2. Functions


## Overview

Functions are **First-Class Objects** and have:
* **Properties and Methods**: Functions have built-in properties like .name and methods like .toString().
* **Assigning Functions**: Functions can be assigned to variables, array elements, and objects.
* **Passing Functions**: Functions can be passed as arguments and returned from other functions.

```
const originalFunc = (num) => { return num + 2 };
const newFunc = originalFunc;

console.log(newFunc.name); // 'originalFunc'
console.log(newFunc.toString()); // '(num) => { return num + 2 }'
newFunc.isMathFunction = true;

```


## **Higher-Order functions**

A higher-order function accepts functions as parameters and/or returns a function.

```
const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

const operate = (x, y, func) => func(x, y);

console.log(operate(2, 3, add)); // 5
console.log(operate(2, 3, multiply)); // 6

```


## Callback functions

A callback function is passed into another function as an argument and invoked within that function.

```
const isEven = (n) => n % 2 === 0;

const printMsg = (evenFunc, num) => {
  const isNumEven = evenFunc(num);
  console.log(`The number ${num} is an even number: ${isNumEven}.`);
};

printMsg(isEven, 4); // Prints: The number 4 is an even number: true.

```


## Function default parameter

One of the features added in ES6 is the ability to use *default parameters*. Default parameters allow parameters to have a predetermined value in case there is no argument passed into the function or if the argument is undefined when called.

```
function greeting (name = 'stranger') {
  console.log(`Hello, ${name}!`)
}

greeting('Nick') // Output: Hello, Nick!
greeting() // Output: Hello, stranger!

```


## Currying

**Currying is a functional programming technique.**
Programming technique that we can use to write code that is modular, easy to test, and highly reusable. Functional programming is a declarative paradigm that emphasizes immutability and *pure functions* — meaning the function is side-effect free and for any given input it will always return the same output.
This helps make code more readable and easier to reason about in general, and currying is just one part of it. Let’s get started with currying!

```
function curried_add(a) {
    // has access to the argument for a
    return function nested_add(b) {
        // has access to the arguments for a and b
        return a + b;
    }
}

// creates a local variable a and assigns it the value 1
let add_one = curried_add(1); 

// add_one() still has access to the argument from curried_add()
add_one(10);

```


With arrow functions

```
function changeColor(color) {
   return function(obj) {
       obj.color = color;
   }
}

// write your code here
let changeColorArrow = color => obj => obj.color = color

```

