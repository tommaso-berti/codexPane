# 6. Flow of HTML


## Position
Notice the block-level elements in the image above take up their own line of space and therefore don’t overlap each other. In the browser to the right, you can see block-level elements also consistently appear on the left side of the browser. This is the default position for block-level elements.

The default position of an element can be changed by setting its position property. The position property can take one of five values:
* static - the default value (it does not need to be specified)
* Relative
* <u>[absolute](https://www.codecademy.com/resources/docs/css/position/absolute)</u>fixed
* sticky

### Relative
The relative position based on its static default one. Better than using a margin top/bottom/… because it move the whole content in which it is defined without afflicting other content

```
.green-box {
  background-color: green;
  position: relative;
  top: 50px;
  left: 120px;
}

```

* Top
* Right
* Bottom
* Left
In the example above, the element of green-box class will be moved down 50 pixels, and to the right 120 pixels, **from its default static position**. The image below displays the new position of the box.

### Absolute
When an element’s position is set to absolute, all other elements on the page will ignore the element and act like it is not present on the page (the element bases its position on the first element that is not position:static. If this element  does not exist, its base its position on the html content tag)

### Fixed
We can *fix* an element to a specific position on the page (regardless of user scrolling) by setting its position to fixed, and accompanying it with the familiar offset properties top, right, bottom, left. If we changed the position of the header to fixed, we removed it from the flow of the html document, so the other content go under the header
Since static and relative positioned elements stay in the normal flow of the document, when a user scrolls the page (or parent element) these elements will scroll too. And since fixed and absolute positioned elements are removed from the document flow, when a user scrolls, these elements will stay at their specified offset position.

### Sticky
The sticky value is another position value that keeps an element in the document flow as the user scrolls, but *sticks* to a specified position as the page is scrolled further.

### Z-Index
Controls how far back or how far forward an element should appear on the web page when elements overlap. This can be thought of as the *depth* of elements, with deeper elements appearing behind shallower elements. The z-index property does *not* work on static elements

## Display
The default display for some elements, such as <em>, <strong>, and <a>, is called *inline*. Inline elements have a box that wraps tightly around their content, only taking up the amount of space necessary to display their content and not requiring a new line after each element. The height and width of these elements cannot be specified in the CSS document. For example, the text of an anchor tag (<a>) will, by default, be displayed on the same line as the surrounding text, and it will only be as wide as necessary to contain its content. inline elements cannot be altered in size with the height or width CSS properties.
The CSS display property provides the ability to make any element an inline element. This includes elements that are not inline by default such as paragraphs, divs, and headings.

### Inline

```
h1 {
  display: inline;
}

```

The CSS in the example above will change the display of all <h1> elements to inline (from block). The browser will render <h1> elements on the same line as other inline elements immediately before or after them (if there are any). The item takes only the place of the content

### Block
Some elements are not displayed in the same line as the content around them. These are called *block-level* elements. These elements fill the entire width of the page by default, but their width property can also be set. Unless otherwise specified, they are the height necessary to accommodate their content.
Elements that are block-level by default include all levels of heading elements (<h1> through <h6>), <p>, <div> and <footer>. Make the item take the whole page width

**Inline-Block**
Inline-block display combines features of both inline and block elements. Inline-block elements can appear next to each other and we can specify their dimensions using the width and height properties. Images are the best example of default inline-block elements. In can stay on the same row different elements (like div or images)

## Float
The float property is often set using one of the values below:
* Left - move, or floats, the element as left as possible
* Right - move, or floats, the element as right as possible
## Clear
The float property can also be used to float multiple elements at once. However, when multiple floated elements have different heights, it can affect their layout on the page. Specifically, elements can “bump” into each other and not allow other elements to properly move to the left or right. The clear property specifies how elements should behave when they bump into each other on the page. It can take on one of the following values:
* left—the left side of the element will not touch any other element within the same containing element.
* right—the right side of the element will not touch any other element within the same containing element.
* both—neither side of the element will touch any other element within the same containing element.
* none—the element can touch either side.

```
div {
  width: 200px;
  float: left;
}

div.special {
  clear: left;
}

```

In the example above, all <div>s on the page are floated to the left side. The element with class special did not move all the way to the left because a taller <div> blocked its positioning. By setting its clear property to left, the special <div> will be moved all the way to the left side of the page.







