# 1. Modules


## Export modules with node

To create a module, you simply have to create a new file where the functions can be declared. Then, to make these functions available to other files, add them as properties to the built-in module.exports object

```
//primo metodo
module.exports.celsiusToFahrenheit = celsiusToFahrenheit;

//secondo metodo
module.exports.fahrenheitToCelsius = function(fahrenheit) {
  return (fahrenheit - 32) * (5/9);
};

```

 
## Import modules with node

The require() function accepts a string as an argument. That string provides the <u>[file path](https://www.freecodecamp.org/news/requiring-modules-in-node-js-everything-you-need-to-know-e7fbd119be8/)</u> to the module you would like to import.

```
const converters = require('./converters.js');
const freezingPointF = converters.celsiusToFahrenheit(freezingPointC);

```

In many cases, modules will export a large number of functions but only one or two of them are needed. You can use object destructuring to extract only the needed functions.

```
const { celsiusToFahrenheit } = require('./converters.js');
const fahrenheitValue = celsiusToFahrenheit(celsiusInput);

```

