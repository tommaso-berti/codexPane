# 14. Breadcrumb navigation


As you saw in the introduction, it is difficult to understand where you are on a website that lacks breadcrumb navigation. By adding it to a site, users can get a quick feel for where they are on a site.
It also hints at the breadth of the site. If a user sees something like “Fashion > Shoes” in the breadcrumb structure, they could reasonably expect the site contains other clothing items or accessories besides shoes.
Breadcrumbs are usually displayed as a horizontal list of pages and take up minimal space. Users expect to find them in the header, left-aligned, and below any primary navigation. Typically they are separated with a “>” or a “/“ symbol. The breadcrumb item selected by the user is typically kept highlighted (this will help the user to understand which page they are on).
In general, the rule of not adding anything extraneous to the design applies here. If the site only contains a few pages or if the pages in the breadcrumbs are already available through primary navigation, there is little reason to include breadcrumbs in the design.

## CSS pseudo-element.

```
.breadcrumb li+li::before {
  padding: 10px;
  content: ">";
}

```

* The + is called the adjacent sibling combinator; it will only select two li‘s when they are immediately next to each other, with the same parent. The element that actually gets selected is the second element of this sibling pair.
* The ::before part of this selector creates a pseudo-element. The ::before pseudo-element is often used with the content property, to add content that will be displayed just before the selected element.

## Style a breadcrumb like an arrow

```
.breadcrumb {
  /* Aligns the breadcrumb to the left */
  text-align: left;
}

.breadcrumb li {
  /* Floats list items to the left to display them in a row */
  float: left;
}

.breadcrumb a {
  /* Sets text color, background, and removes underline */
  color: #fff;
  background: darkcyan;
  text-decoration: none;
  /* Positions the element relative to its normal position */
  position: relative;
  /* Sets height and centers text vertically */
  height: 30px;
  line-height: 30px;
  /* Centers text horizontally */
  text-align: center;
  /* Adds space between breadcrumb items */
  margin-right: 15px;
  /* Adds padding inside the breadcrumb */
  padding: 0 5px;
}

.breadcrumb a::before,
.breadcrumb a::after {
  /* Creates pseudo-elements before and after each link */
  content: "";
  position: absolute;
  /* Sets border color and style */
  border-color: darkcyan;
  border-style: solid;
  /* Sets border width to create arrow shape */
  border-width: 15px 5px;
}

.breadcrumb a::before {
  /* Positions the "tail" of the arrow */
  left: -10px;
  /* Makes the left border transparent to form the tail */
  border-left-color: transparent;
}

.breadcrumb a::after {
  /* Positions the "head" of the arrow */
  left: 100%;
  /* Makes all borders transparent except the left to form the head */
  border-color: transparent;
  border-left-color: darkcyan;
}

.breadcrumb a:hover {
  /* Changes background color on hover */
  background-color: blue;
}

.breadcrumb a:hover::before {
  /* Changes border color on hover, keeping the left transparent */
  border-color: blue;
  border-left-color: transparent;
}

.breadcrumb a:hover::after {
  /* Changes the left border color on hover */
  border-left-color: blue;
}

```

### 
## Abbreviate the breadcrumb
The number of steps can become large. To simplify the display, the beginning of the trail is often abbreviated:

```
... > About > Register

```

