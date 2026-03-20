# 3. Specificity


Specificity is the order by which the browser decides which CSS styles will be displayed. A best practice in CSS is to style elements while using the lowest degree of specificity so that if an element needs a new style, it is easy to override. Ds are the most specific selector in CSS, followed by classes, and finally, type

```
h1 {
  color: red;
}

.headline {
  color: firebrick;
}

```

In the example code above, the color of the heading would be set to firebrick, as the class selector is more specific than the type selector. If an ID attribute (and selector) were added to the code above, the styles within the ID selector’s body would override all other styles for the heading.

An HTML element can have multiple classes, in that case the style is merged (if defined with two different selector). However, if there are conflicts, the most specific one is taken from the browser (the more specific or the latest defined on).
In this example, blu is set

```
.red {
  color: red;
}

.blue {
  color: blue;
}

```


## Chaining
This is done by combining multiple selectors, which we will refer to as chaining. For instance, if there was a special class for <h1> elements, the CSS would look like below:

```
h1.special {
...
}

```

The code above would select only the <h1> elements with a class of special. If a <p> element also had a class of special, the rule in the example would not style the paragraph.

## Descendant
In the example below, .main-list selects the element with the.main-list class (the <ul> element). The descendant <li>‘s are selected by adding li to the selector, separated by a space. This results in .main-list li as the final selector.

```
.main-list li {
...
}

```

