# 4. Modules


**Modules** are reusable pieces of code in a file that can be exported and then imported for use in another file. A *modular* program is one whose components can be separated, used individually, and recombined to create a complex system.
Instead of having the entire program written within  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     my_app.js
 </span>, its components are broken up into separate modules that each handle a particular task. For example, the  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     database_logic.js
 </span> module may contain code for storing and retrieving data from a database. Meanwhile, the  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     date_formatting.js
 </span> module may contain functions designed to easily convert date values from one format to another (a common headache among programmers!).
This modular strategy is sometimes called **separation of concerns**.

## **Implementations of Modules in JavaScript: CommonJS vs ES6**
Before we dive in, it should be noted that there are multiple ways of implementing modules depending on the *runtime environment* in which your code is executed. In JavaScript, there are two primary runtime environments, and each has a preferred module implementation:
* The <u>[Node](https://nodejs.org/en/about/)</u> runtime environment supports CommonJS modules by default.
* The browser’s runtime environment uses <u>[ES6 modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)</u>, which use a different import/export syntax.
For more information about runtime environments and ES6 modules, you can read the following two articles:
* <u>[Introduction to JavaScript Runtime Environments](https://www.codecademy.com/articles/introduction-to-javascript-runtime-environments)</u><u>[Implementing modules using ES6 Syntax](https://www.codecademy.com/articles/implementing-modules-using-es-6-syntax)</u>
## **Implementing CommonJS Modules**
Every JavaScript file that runs in a Node environment is treated as a distinct module. The functions and data defined within each module can be used by any other module, as long as those resources are properly exported and imported. Since CommonJS Modules are most common in the Node runtime environment, we will discuss them in terms of Node.

### module.exports
To create a module, you simply have to create a new file where the variables and functions can be declared. Then, to make these functions available to other files, add them as properties to the built-in module.exports object:

```
/* converters.js */
function celsiusToFahrenheit(celsius) {
  return celsius * (9/5) + 32;
}

module.exports.celsiusToFahrenheit = celsiusToFahrenheit;

module.exports.fahrenheitToCelsius = function(fahrenheit) {
  return (fahrenheit - 32) * (5/9);
};
```


```


```

module.exports is an object built into the Node.js runtime environment. Other files can now import this object and use these two functions using another feature that is built into the Node.js runtime environment: the require() function.

### require()
The require() function accepts a string as an argument. That string provides the file path to the module you would like to import, generally using the relative path based on the file where require() is being called.

```
/* water-limits.js */
const converters = require('./converters.js');

const freezingPointC = 0;
const boilingPointC = 100;

const freezingPointF = converters.celsiusToFahrenheit(freezingPointC);
const boilingPointF = converters.celsiusToFahrenheit(boilingPointC);

console.log(`The freezing point of water in Fahrenheit is ${freezingPointF}`);
console.log(`The boiling point of water in Fahrenheit is ${boilingPointF}`);
```


```


```

When you use require(), the entire module.exports object is returned and stored in the variable converters. This means that both the .celsiusToFahrenheit() and .fahrenheitToCelsius() methods can be used in this program!

### **Using Object Destructuring to be more Selective With** require()
In many cases, modules will export a large number of data and functions, but only one or two of them are needed in a given file. You can use object destructuring to extract only the needed functions.

```
/* celsius-to-fahrenheit.js */
const { celsiusToFahrenheit } = require('./converters.js');

const celsiusInput = process.argv[2]; 
const fahrenheitValue = celsiusToFahrenheit(celsiusInput);

console.log(`${celsiusInput} degrees Celsius = ${fahrenheitValue} degrees Fahrenheit`);
```


```


```







































