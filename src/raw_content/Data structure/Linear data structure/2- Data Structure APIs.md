# 2. Data Structure APIs

# 
## 
## **Choosing the Right Data Structure**
Data structures are about choosing the right tool for the job. Depending on the use case, you might care more about:
* Ordered storage
* Fast retrieval
* Runtime performance
* Memory usage
Different data structures exist because each has its own advantages, disadvantages, and ideal use cases.

## **Arrays in JavaScript**
An  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     Array
 </span> is useful for storing **ordered data**. You can access elements by index:

```
arrayName[0]

```

Arrays also provide helpful built-in methods such as:
* .push()
* .pop()
* .sort()
* .includes()
However, checking whether an element exists (for example using  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     .includes()
 </span>) may require iterating through the entire array. With very large datasets (e.g., 10,000,000 elements), this can become slow.

## **Example: Storing and Checking Numbers (Using an Array)**
Suppose we receive numbers one at a time and want to:
1. Store each number
2. Later check whether a specific number was received
Given the numbers:

```
1, 250, -42, 0.4, 17

```

One possible implementation using an array:

```
const listOfNumbers = [];

const storeNumber = num => listOfNumbers.push(num);

const doYouHaveThisNumber = num => listOfNumbers.includes(num);

```

* storeNumber() adds a number to the array.
* doYouHaveThisNumber() returns true if the number exists, otherwise false.
This works, but  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     .includes()
 </span> may be slow for large arrays because it checks elements sequentially.

## **Alternative Implementation: Using an Object**
If we only care about whether a number exists, we can use an object instead:

```
const receivedNumbers = {};

const storeNumber = num => receivedNumbers[num] = true;

const doYouHaveThisNumber = num => receivedNumbers[num] === true;

```

In this case:
* We store numbers as object keys.
* Retrieving a value from an object is significantly faster than iterating through an array.
## 
### **Important Point**
The **public API** remains the same:
* storeNumber()
* doYouHaveThisNumber()
Only the **underlying implementation** changes.

## What Is an API?
API stands for **Application Programming Interface**.
An API allows end users to interact with a data structure through exposed methods and properties, without needing to understand the internal implementation.
For example, when adding an element to the end of an array:

```
myArray.push(value);

```

You do not need to know how  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     .push()
 </span> works internally. The array API abstracts away the implementation details.
The array API provides many built-in capabilities:
* Adding/removing elements at the start or end
* Iterating through elements
* Sorting
* Transforming data
However, some functionality (like finding the smallest number in an array) must still be implemented manually.

## **Creating Your Own APIs**
When building your own data structures, you define a **public API** that users interact with.
The same public API can have different internal implementations. Therefore, it’s important to consider trade-offs in performance and memory usage.
## 
### **Public vs Private**
In some languages:
* **Public methods** can be accessed from outside the class.
* **Private methods** can only be accessed internally.
JavaScript does not strictly enforce public/private access, but developers often prefix internal properties with an underscore  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     _
 </span> to signal they are not meant for external use.

## **Example: Implementing a Stack**
A **Stack** is a data structure that allows:
* Adding elements to the top (push)
* Removing elements from the top (pop)
Although an array can behave like a stack, arrays also allow behaviors that a stack should not (like accessing by index or adding to the beginning).
## 
### **Basic Stack Class**

```
class Stack {

  constructor() {
    this._array = [];
  }

}

```

The internal array is stored as  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     _array
 </span> to indicate it is not meant to be accessed directly.
## 
### **Adding Public Methods**

```
class Stack {

  constructor() {
    this._array = [];
  }

  push(newValue) {
    this._array.push(newValue);
  }

  pop() {
    return this._array.pop();
  }

}

```

Now:
* Users interact only through .push() and .pop()
* Direct manipulation of _array is discouraged
For example:

```
const stack = new Stack();
stack._array.unshift('value');

```

This technically works, but it breaks the intended design of the Stack.

## **Key Concept: API vs Implementation**
* **Implementation** = how the data structure works internally
* **Public API** = how users are supposed to interact with it
If you change the internal implementation but keep the public API the same, user code should continue working.
This separation allows flexibility and maintainability.

## **Final Takeaways**
* Data structures are chosen based on performance, memory usage, and intended purpose.
* APIs provide a clean interface for interacting with data structures.
* The same public API can have multiple internal implementations.
* When building your own data structures, carefully design:
	* What should be public
	* What should remain internal
* Maintaining a clear distinction between API and implementation is essential for writing scalable, maintainable software.
