# 2. Selectors


### Tag selector

```
p { 
  font-family: Verdana;
}

```


### Universal selector

```
* { 
  font-family: Verdana;
}

```


### Class selector
The class selector use the . before the name of the class. Class selector wins on tag selector.

```
.brand {
...
}

```


### ID selector
Unique, wins over the class selector

```
#large-title {
...
}

```


### Attribute selector
The most basic syntax is an attribute surrounded by square brackets. In the above example: [href] would target all elements with an href attribute and set the color to magenta.

```
[href]{
   color: magenta;
}

```

And it can get <u>[more granular](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors#syntax)</u> from there by adding type and/or attribute values. One way is by using type[attribute*=value]

```
<img src='/images/seasons/cold/winter.jpg'>
<img src='/images/seasons/warm/summer.jpg'>

img[src*='winter'] {
  color: lightgreen;
}

img[src*='summer'] {
  color: blue;
}

```

* The first ruleset looks for an img element with an attribute of src that contains the string 'winter', and sets the Preview content is loading height to 50px.
* The second ruleset looks for an img element with an attribute of src that contains the string 'summer', and sets the height to 100px.

### Pseudo-class selector
These are all examples of pseudo-class selectors in action! In fact, :focus, :visited, :disabled, and :active are all pseudo-classes. Factors such as user interaction, site navigation, and position in the document tree can all give elements a different state with pseudo-class.

```
p:hover {
  background-color: lime;
}

```

## 
## Chained selector

```
p {
  color: blue;
}

.main p {
  color: red;
}

```

Both of these CSS rules define what a <p> element should look like. Since .main p has a class and a p type as its selector, only the <p> elements inside the .main element will appear red. This occurs despite there being another more general rule that states <p> elements should be blue.

## Multiple selector
We can separate the selectors by a comma to apply the same style to both

```
h1, 
.menu {
  font-family: Georgia;
}

```


## Direct child
To specify a direct child the > char must be used.
This example will select all img of the class div

```
div img {

}

```

This example, instead, will select the img that is a direct child of the div

```
div > img {
    
}

```


## **pseudo-class**
The <u>[CSS pseudo-class :hover](https://developer.mozilla.org/en-US/docs/Web/CSS/:hover)</u> can be used to style elements on mouse hover. For instance, to change the color of link anchor text from blue to orange when a user hovers over it, the following CSS could be used:

```
a {
  color: blue;
}
a:hover {
  color: orange;
}

```


In addition to any text style changes when hovering over a link, the user’s cursor should change from the default appearance to a pointing hand. The <u>[CSS cursor property](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor#Examples)</u> is used to control this behavior. For example, to add this behavior to all <a> tags, the following rule could be used:

```
a {
  cursor: pointer;
}

```


The ordering of link state pseudo-class rules is important to reveal the proper information. When a user hovers and then clicks a link, those styles should always override the static styling surrounding a user’s history with the link (unvisited :link and :visited). The proper order of these rules is:
* :link
* :visited
* :hover
* :active

## pseudo-element

```
.breadcrumb li+li::before {
  padding: 10px;
  content: ">";
}

```

* The + is called the adjacent sibling combinator; it will only select two li‘s when they are immediately next to each other, with the same parent. The element that actually gets selected is the second element of this sibling pair.
* The ::before part of this selector creates a pseudo-element. The ::before pseudo-element is often used with the content property, to add content that will be displayed just before the selected element.
