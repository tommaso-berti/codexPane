# 9. Inline Styles and Style Object Variables

## 
An inline style is a style that’s written as an *attribute*, like this:

```
<h1 style={{ color: 'red' }}>Hello world</h1>

```

The outer curly braces are to note that everything between should be read as JavaScript. The *inner* curly braces create a JavaScript object literal.
An alternative is to store a style object in a *variable* and then inject that variable as the value of the style attribute.

```
const darkMode = {
  color: 'white',
  background: 'black'
};
<h1 style={darkMode}>Hello world</h1>

```


## Style syntax
CSS property names using *camelCase* in React

```
const styles = {
  marginTop: '20px',
  backgroundColor: 'green'
};

```

This syntax comes from a small rule. A hyphen is a reserved operator in JavaScript. If we use background-color, the hyphen is then interpreted as a minus sign. Thus, we want to be consistent with the property names in the DOM style JavaScript object and use camel case.In regular JavaScript, style *values* are almost always strings. Even if a style value is numeric, you usually have to write it as a string so that you can specify a unit. For example, you’d write '450px' or '20%'.
If you write a style value as a *number*, then the unit 'px' is assumed.

## Stylesheet
We can import a stylesheet by using the import keyword:

```
import './App.css'

```

However, if we have multiple stylesheets with the same class names, the names can collide and create style conflicts.
One way to prevent this is to use CSS modules. By importing it as a module, the styles will only be available for the component that imported the style. This is done automatically by creating unique class names for each module. This frees us from having to keep track of the class names we’ve used across stylesheets.
To use CSS modules, we begin by naming our stylesheet in this format, where fileName should be replaced with the name of the component you’re styling:

```
ComponentName.module.css

```

This indicates that the file should be processed as a CSS module.
Then, it must be imported into the file containing our component.

```
import styles from './ComponentName.module.css'

```

From this import, we can see that the styles object now holds the class selectors of fileName.module.css. To access the selectors, we use the dot notation like so:

```
<div className={styles.divStyle}></div>

```

