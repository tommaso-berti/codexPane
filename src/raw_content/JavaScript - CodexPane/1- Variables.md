# 1. Variables


## Var
There were a lot of changes introduced in the ES6 version of JavaScript in 2015. One of the biggest changes was two new keywords, let and const, to create, or *declare*, variables. Prior to the ES6, programmers could only use the var keyword to declare variables.

## Let
The let keyword was introduced in ES6. The let keyword signals that the variable can be reassigned a different value. Take a look at the example:
Another concept that we should be aware of when using let (and even var) is that we can declare a variable without assigning the variable a value. In such a case, the variable will be automatically initialized with a value of undefined:

## Const
The const keyword was also introduced in ES6, and is short for the word constant. Just like with var and let you can store any value in a const variable. The way you declare a const variable and assign a value to it follows the same structure as let and var. Take a look at the following example:
However, a const variable cannot be reassigned because it is *constant*. If you try to reassign a const variable, you’ll get a TypeError.
Constant variables *must* be assigned a value when declared. If you try to declare a const variable without a value, you’ll get a SyntaxError.

## Difference between let and var
In JavaScript, let and var are both used to declare variables, but they have different scopes.
* var is function-scoped, meaning it is accessible throughout the function in which it is declared.
* let is block-scoped, meaning it is only accessible within the block (e.g., inside a loop or an if statement) where it is declared.
Using let can help prevent errors by limiting the variable’s scope to where it is needed.

## Scope
Scope defines where variables can be accessed or referenced. While some variables can be accessed from anywhere within a program, other variables may only be available in a specific context.
A block is the code found inside a set of curly braces {}. Blocks help us group one or more statements together and serve as an important structural marker for our code.
### Global scope
In *global scope*, variables are declared outside of blocks. These variables are called *global variables*. Because global variables are not bound inside a block, they can be accessed by any code in the program, including code in blocks.
When you declare global variables, they go to the *global namespace*. The global namespace allows the variables to be accessible from anywhere in the program. These variables remain there until the program finishes which means our global namespace can fill up really quickly.
*Scope pollution* is when we have too many global variables that exist in the global namespace, or when we reuse variables across different scopes
### Block scope
When a variable is defined inside a block, it is only accessible to the code within the curly braces {}. We say that variable has *block scope* because it is *only* accessible to the lines of code within that block.

## Interpolation
In the ES6 version of JavaScript, we can insert, or *interpolate*, variables into strings using *template literals*. Check out the following example where a template literal is used to log strings together:

```
const myPet = 'armadillo';
console.log(`I own a pet ${myPet}.`);
// Output: I own a pet armadillo.

```

Notice that:
* a template literal is wrapped by backticks ` (this key is usually located on the top of your keyboard, left of the 1 key).
* Inside the template literal, you’ll see a placeholder, ${myPet}. The value of myPet is inserted into the template literal.
* When we interpolate `I own a pet ${myPet}.`, the output we print is the string: 'I own a pet armadillo.'

## Truty and falsy
Sometimes, you’ll want to check if a variable exists and you won’t necessarily want it to equal a specific value — you’ll only check to see if the variable has been assigned a value.

```
let myVariable = 'I Exist!';

if (myVariable) {
   console.log(myVariable)
} else {
   console.log('The variable does not exist.')
}

```

The code block in the if statement will run because myVariable has a *truthy* value; even though the value of myVariable is not explicitly the value true, when used in a boolean or conditional context, it evaluates to true because it has been assigned a non-falsy value.
So which values are *falsy*— or evaluate to false when checked as a condition? The list of falsy values includes:
* 0
* Empty strings like "" or ''
* null which represent when there is no value at all
* undefined which represent when a declared variable lacks a value
* NaN, or Not a Number

## Ternary operators
T*ernary operator* is used to simplify  an if...else statement.

```
isNightTime ? console.log('Turn on the lights!') : console.log('Turn off the lights!');

```

* The condition, isNightTime, is provided before the ?.
* Two expressions follow the ? and are separated by a colon :.
* If the condition evaluates to true, the first expression executes.
* If the condition evaluates to false, the second expression executes.

## Switch
A switch statement provides an alternative syntax that is easier to read and write. A switch statement looks like this:


```
let groceryItem = 'papaya';
switch (groceryItem) {
  case 'tomato':
    console.log('Tomatoes are $0.49');
    break;
  case 'lime':
    console.log('Limes are $1.49');
    break;
  case 'papaya':
    console.log('Papayas are $1.29');
    break;
  default:
    console.log('Invalid item');
    break;
}
// Prints 'Papayas are $1.29'

```

* The switch keyword initiates the statement, which contains the value that each case will compare. In the example, the value or expression of the switch statement is groceryItem.
* Inside the block, { ... }, there are multiple cases. The case keyword checks if the expression matches the specified value that comes after it. The value following the first case is 'tomato'. If the value of groceryItem equalled 'tomato', that case‘s console.log() would run.
* The value of groceryItem is 'papaya', so the third case runs— Papayas are $1.29 is logged to the console.
* The break keyword tells the computer to exit the block and not execute any more code or check any other cases inside the code block. Note: Without break keywords, the first matching case will run, but so will every subsequent case regardless of whether or not it matches—including the default. This behavior is different from if/else conditional statements that execute only one block of code.
* At the end of each switch statement, there is a default statement. If none of the cases are true, then the code in the default statement will run.

