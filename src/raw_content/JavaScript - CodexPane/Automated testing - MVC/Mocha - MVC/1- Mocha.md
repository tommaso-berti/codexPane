# 1. Mocha


**[https://mochajs.org/#getting-started](https://mochajs.org/#getting-started)**
## **Install Mocha**
Before writing any tests you’ll need to use <u>[Node.js and npm](https://www.codecademy.com/articles/what-is-node)</u> to set up a JavaScript project and install Mocha.
* *Node* allows you to run JavaScript in the terminal
* Npm is a Node tool that allows you to download packages from the web, and manage them in a JavaScript project
* *Mocha* is one of those packages and is used to test other JavaScript code
A JavaScript project is a directory of files. The following command creates a file **package.json** that can be used to manage packages for the project.

```
$ npm init

```

After running this command you will be prompted to enter information about your project. It’s okay to skip some fields if you’re not ready to enter that information.
With your project setup, you can install packages.

```
$ npm install mocha -D

```

* npm install tells npm to install a package from the internet and any other packages it depends on
* mocha is the package you want to download
* -D signifies that this package is a development dependency and will show up under the devDependecies section in **package.json**. This means that the package will only be included in development mode and will not be included in the production bundle.

The new directory structure contains the following:

```
project
|_ node_modules
|___ .bin
|___ mocha
|___ ...
|_ package.json

```


## Run mocha
First method (not recommended)

```
$ ./node_modules/mocha/bin/mocha

```

The second (and recommended) method is to add a script to **package.json**. In the scripts object in **package.json**, set the value of "test" to mocha. It should look like this:

```
"scripts": {
  "test": "mocha"
}

```

Then

```
$ npm test

```


## **describe and it blocks**
In Mocha we group tests using the describe function and define tests using the it function.

```
describe('Math', () => {
  describe('.max', () => {
    it('returns the argument with the highest value', () => {
      // Your test goes here
    });
    it('returns -Infinity when no arguments are provided', () => {
      // Your test goes here
    });
  });
});

```

Both the describe and it functions accept two parameters: a descriptive string and a callback function. Though the functions are flexible, they are commonly used in the structure above: nest describe blocks to resemble the structure of your implementation code and write individual tests in it blocks. This makes your test suite *isolated*, *maintainable*, and *expressive*.

## assert (expressive test)
### assert.ok()
assert.ok() allows you to compare values and throw errors as needed using one function call.
As a Node module, assert can be imported at the top of your files with

```
const assert = require('assert');

```

You call assert functions like this:

```
assert.ok(a === 3);

```


### assert.equal() (==)
 It is common practice to pass result first and expected second.

```
assert.ok(landAnimals[2] == waterAnimals[2]);
assert.equal(landAnimals[2], waterAnimals[2]);

```


### **assert.strictEqual (===) (preferred, following the assert documentation)**
If you need to be strict in evaluating equality, you can use assert.strictEqual().
* assert.equal() performs a == comparison
* assert.strictEqual() performs a === comparison

```
const a = 3;
const b = '3';
assert.equal(a, b);     //true
assert.strictEqual(a, b);     //false

```


### **assert.deepStrictEqual()**

```
const a = {relation: 'twin', age: '17'};
const b = {relation: 'twin', age: '17'};
assert.equal(a, b);    //false
assert.strictEqual(a, b);    //false
assert.deepStrictEqual(a, b);    //true

```

Both assertions will throw an error because distinct objects are not considered equal when using either loose or strict equality in JavaScript.
If we need to compare the values within two objects, we can use assert.deepStrictEqual(). This method compares the values of each object using strict (===) equality.

```
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
const arr3 = [1, 2, '3'];

assert.deepStrictEqual(arr1, arr2); // No error
assert.deepStrictEqual(arr1, arr3); // Error: 1, 2, 3 !== 1, 2, '3'

```

Node’s assert library includes more than the four methods covered so far. You can find them all in the <u>[Node.js documentation](https://nodejs.org/api/assert.html)</u>.

### **assert.notStrictEqual()**
### assert.throws()

## **Setup, Exercise, and Verify**
The phases are defined as follows:
* *Setup* - create objects, variables and set conditions that your test depends on
* *Exercise* - execute the functionality you are testing
* *Verify* - check your expectations against the result of the exercise phase. You can use the assert library here

 <span style="font-size: 16.0;">
     **teardown (altering and restoring testing environment)**

 </span>Running multiple tests can introduce issues if the tests make changes to the testing environment: changes to the environment in one test might affect the next test. Some common changes to an environment include:
* altering files and directory structure
* changing read and write permissions on a file
* editing records in a database
To address this issue, we often add a *teardown* step to the end of our tests. The teardown phase makes our tests *isolated* by resetting the environment before the next test runs. This provides two key benefits:
* Changes to the environment caused by one test do not affect the other tests.
* Isolated tests can be executed in any order!
To ensure that each test is isolated from each other, and that each run of the test file isolated, we will add a teardown step to the tests. In this case, we want to make sure that after each test, the file found at path is deleted

## **Hooks**
While execution and verification are unique to each test, setup and teardown are often similar or even identical for multiple tests within a test suite. The Mocha test framework provides functions that enable us to reduce repetition, simplify the scope of each test, and more finely control the execution of our tests.
These functions (also referred to as *hooks*) are:
* beforeEach(callback) - callback is run before each test
* afterEach(callback) - callback is run after each test
* before(callback) - callback is run before the first test
* after(callback) - callback is run after the last test
Example

```
describe('messing around with hooks', () => {

  let testValue; // Variable used by both tests

  beforeEach(() => {
    testValue = 5;
  });

  it('should add', () => {
    // testValue = 5 <-- moved to beforeEach()
    testValue = testValue + 5;
    assert.equal(testValue, 10);
  });

  it('should multiply', () => {
    // testValue = 5 <-- moved to beforeEach()
    testValue = testValue * 5;
    assert.equal(testValue, 25);
  });

});

```


