# 9. Modules export/import


# Modules
*Modules* are reusable pieces of code in a file that can be exported and then imported for use in another file. A *modular* program is one whose components can be separated, used individually, and recombined to create a complex system.
Before we dive in, it should be noted that there are multiple ways of implementing modules depending on the *runtime environment* in which your code is executed. In JavaScript, there are two runtime environments and each has a preferred module implementation:
* The <u>[Node](https://nodejs.org/en/about/)</u> runtime environment and the module.exports and require() syntax.
* The browser’s runtime environment and the <u>[ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)</u> import/export syntax.

## **ES6 Named Export Syntax**
A module must be entirely contained within a file. So, let’s first consider where a new module may be placed within the file system. Since it needs to be used by both of these projects, you may want to put it in a mutually accessible location. The entire file structure containing both projects and this new module, let’s call it **dom-functions.js**, could look like this:

```
secret-image/
|-- secret-image.html
|-- secret-image.js
secret-messages/
|-- secret-messages.html
|-- secret-messages.js
modules/
|-- dom-functions.js    <-- new module file

```


## Single function export/import
Inside **dom-functions.js**, the functions you wish to reuse can be exported using the *named export* syntax below:

```
export { resourceToExportA, resourceToExportB, ...}

```

Import

```
import { exportedResourceA, exportedResourceB } from '/path/to/module.js';

```


Now, you must also update **secret-messages.html**:

```
<!-- secret-messages.html --> 
<html>
  <head>
    <title>Secret Messages</title>
  </head>
  <body>
    <button id="secret-button"> Press me... if you dare </button>
    <p id="secret-p" style="display: none"> Modules are fancy! </p>
    <script type="module" src="./secret-messages.js"> </script>
  </body>
</html>

```

The change here is subtle, can you spot it? In **secret-messages.html**, the only thing that changes is the addition of the attribute type='module' to the <script> element. Failure to do so can cause some browsers to throw an error. For example, in Chrome you might see this error:

## **Renaming Imports to Avoid Naming Collisions**

```
/* inside greeterEspanol.js */
const greet = () => {
  console.log('hola');
}
export { greet };

/* inside greeterFrancais.js */
const greet = () => {
  console.log('bonjour');
}
export { greet };

```

ES6 includes syntax for renaming imported resources by adding in the keyword as.

```
import { exportedResource as newlyNamedResource } from '/path/to/module'

```

From the example above

```
/* main.js */
import { greet as greetEspanol } from 'greeterEspanol.js';
import { greet as greetFrancais } from 'greeterFrancais.js';

greetEspanol(); // Prints: hola
greetFrancais(); // Prints: bonjour

```


## Default export/import (whole file)
Every module also has the option to export a single value to represent the entire module called the *default export*. Often, though not always, the default export value is an object containing the entire set of functions and/or data values of a module.

```
const resources = { 
  valueA, 
  valueB 
}
export { resources as default };
//or
const resources = {
  valueA,
  valueB
}
export default resources;

```

Import:

```
import { default as importedResources } from 'module.j
//shorthand
import importedResources from 'module.js';

```

It should be noted that if the default export is an object, the values inside cannot be extracted until after the object is imported, like so:

```
// This will work...
import resources from 'module.js'
const { valueA, valueB } = resources;

// This will not work...
import { valueA, valueB } from 'module.js'

```


Example:
export

```
/* dom-functions.js */
const toggleHiddenElement = (domElement) => {
    if (domElement.style.display === 'none') {
      domElement.style.display = 'block';
    } else {
      domElement.style.display = 'none';
    }
}

const changeToFunkyColor = (domElement) => {
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;
        
  domElement.style.background = `rgb(${r}, ${g}, ${b})`;
}

const resources = { 
  toggleHiddenElement, 
  changeToFunkyColor
}
export default resources;

```

Import

```
import domFunctions from '../modules/dom-functions.js';

const { toggleHiddenElement, changeToFunkyColor } = domFunctions;

const buttonElement = document.getElementById('secret-button');
const pElement = document.getElementById('secret-p');

buttonElement.addEventListener('click', () => {
  toggleHiddenElement(pElement);
  changeToFunkyColor(buttonElement);
});

```


## Inline export

