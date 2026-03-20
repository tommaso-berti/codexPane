# Struttura corretta progetto con browser runtime

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

## 
## Export modules with browser runtime
The browser’s runtime environment and the <u>[ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)</u> import/export syntax.

```
//primo metodo
export { toggleHiddenElement, changeToFunkyColor };

//secondo metodo
export const toggleHiddenElement = (domElement) => {
  // logic omitted...
}

```

## 
## Import modules  with browser runtime

```
import { exportedResourceA, exportedResourceB } from '/path/to/module.js';

```

### HTML part
The type="module" is now required to use the file in which the functions are imported

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

### If the function has the same name but comes from different files
In this way we can use different identifiers

```
import { greet as greetEspanol } from 'greeterEspanol.js';
import { greet as greetFrancais } from 'greeterFrancais.js';

greetEspanol(); // Prints: hola
greetFrancais(); // Prints: bonjour

```


## Export/import the whole module with “default”
### Export

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

### Import

```
import domFunctions from '../modules/dom-functions.js';
//oppure 
//import { default as domFunctions } from '../modules/dom-functions.js';

const { toggleHiddenElement, changeToFunkyColor } = domFunctions;

const buttonElement = document.getElementById('secret-button');
const pElement = document.getElementById('secret-p');

buttonElement.addEventListener('click', () => {
  toggleHiddenElement(pElement);
  changeToFunkyColor(buttonElement);
});

```

