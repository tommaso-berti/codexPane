# 15. Grid

[https://codepip.com/games/grid-garden/](https://codepip.com/games/grid-garden/)
[https://css-tricks.com/snippets/css/complete-guide-grid/](https://css-tricks.com/snippets/css/complete-guide-grid/)

## **Creating a Grid**
To set up a grid, you need to have both a *grid container* and *grid items*. The grid container will be a parent element that contains grid items as children and applies overarching styling and positioning to them.
To turn an HTML element into a grid container, you must set the element’s display property to one of two values:
* grid — for a block-level grid.
* inline-grid — for an inline grid.

## **Creating Columns**
By default, grids contain only one column. If you were to start adding items, each item would be put on a new row. We can define the columns of our grid by using the CSS property grid-template-columns. Below is an example of this property in action:

```
.grid {
  display: grid;
  width: 500px;
  grid-template-columns: 100px 200px;
}

```

This property creates two changes. First, it defines the number of columns in the grid; in this case, there are two. Second, it sets the width of each column. The first column will be 100 pixels wide and the second column will be 200 pixels wide. We can also define the size of our columns as a percentage of the entire grid’s width.

## **Creating Rows**
To specify the number and size of the rows, we are going to use the property grid-template-rows.

```
.grid {
  display: grid;
  width: 500px;
  grid-template-columns: 100px 200px;
  grid-template-rows: 100px 50% 20px;
}

```


### **grid-template**
When using grid-template, the values before the slash will determine the size of each row. The values after the slash determine the size of each column. In this example, we’ve made two rows and three columns of varying sizes.

```
grid-template: 200px 300px / 20% 10% 70%;

```


## **Fraction**
CSS Grid introduced a new relative sizing unit — fr, like fraction. By using the fr unit, we can define the size of columns and rows as a fraction of the grid’s length and width. This unit was specifically created for use in CSS Grid. Using fr makes it easier to prevent grid items from overflowing the boundaries of the grid

```
grid-template: 2fr 1fr 1fr / 1fr 3fr 1fr;

```

It is possible to use fr with other units as well. When this happens, each fr represents a fraction of the *available* space.
In this example, 60 pixels are taken up by the second column. Therefore the first and third columns have 40 available to split between them. Since each gets one fraction of the total, they both end up being 20 pixels wide.

```
.grid {
  display: grid;
  width: 100px;
  grid-template-columns: 1fr 60px 1fr;
}

```


## repeat()

```
.grid {
  display: grid;
  width: 300px;
  grid-template-columns: repeat(3, 100px);
}

```

The repeat function will duplicate the specifications for rows or columns a given number of times. In the example above, using the repeat function will make the grid have three columns that are each 100 pixels wide
The second parameter of repeat() can have multiple values. This code will create four columns where the first and third columns will be 20 pixels wide and the second and fourth will be 50 pixels wide.

```
grid-template-columns: repeat(2, 20px 50px)

```


## minmax()
If you have a 100-pixel wide image in your grid, you probably don’t want its column to get thinner than 100 pixels! The minmax() function can help us solve this problem.
In this example, the first and third columns will always be 100 pixels wide, no matter the size of the grid. The second column, however, will vary in size as the overall grid resizes. The second column will always be between 100 and 500 pixels wide.

```
.grid {
  display: grid;
  grid-template-columns: 100px minmax(100px, 500px) 100px;
}

```


## row-gap() column-gap()
The CSS properties row-gap and column-gap will put blank space between every row and column in the grid.

```
row-gap: 20px;
column-gap: 10px;

gap: 20px 10px;

```


## **Multiple Row Items**
Using the CSS properties grid-row-start and grid-row-end, we can make single grid items take up multiple rows. Remember, we are no longer applying CSS to the outer grid container; we’re adding CSS to the elements sitting inside the grid!

```
.item {
  grid-row-start: 1;
  grid-row-end: 3;
  grid-row: 1 / 3;
}

```

Row grid lines and column grid lines start at 1 and end at a value that is 1 greater than the number of rows or columns the grid has. For example, if a grid has 5 rows, the grid row lines range from 1 to 6. If a grid has 8 rows, the grid row lines range from 1 to 9.
The value for grid-row-start should be the row at which you want the grid item to begin. The value for grid-row-end should be one greater than the row at which you want the grid item to end. An element that covers rows 2, 3, and 4 should have these declarations: grid-row-start: 2 and grid-row-end: 5.
When an item spans multiple rows or columns using these properties, it will also include the gap if any exists.

## **Multiple Column Items**
grid-column-start, grid-column-end and grid-column work identically to the row properties
When using these properties, we can use the keyword span to start or end a column or row, relative to its other end. Look at how span is used in the code below:

```
.item {
  grid-column: 4 / span 2;
}

```

This is telling the item element to begin in column four and take up two columns of space. So item would occupy columns four and five. It produces the same result as the following code blocks:

```
.item {
  grid-column: 4 / 6;
}

```


## grid-area
This property will set the starting and ending positions for both the rows and columns of an item.

```
.item {
  grid-area: 2 / 3 / 4 / span 5;
}

```

grid-area takes four values separated by slashes. The order is important! This is how grid-area will interpret those values.
* grid-row-start
* grid-column-start
* grid-row-end
* grid-column-end


# Advanced CSS grid

## grid-template-areas
The grid-template-areas property allows you to name sections of your web page to use as values in the grid-row-start, grid-row-end, grid-column-start,grid-column-end, and grid-area properties. This property is declared on grid containers.

```
<div class="container">
  <header>Welcome!</header>
  <nav>Links!</nav>
  <section class="info">Info!</section>
  <section class="services">Services!</section>
  <footer>Contact us!</footer>
</div>

```



```
.container {
  display: grid;
  max-width: 900px;
  position: relative;
  margin: auto;
  grid-template-areas: "header header"
                       "nav nav" 
                       "info services"
                       "footer footer";
  grid-template-rows: 300px 120px 800px 120px;
  grid-template-columns: 1fr 3fr; 
}

header {
  grid-area: header;
} 

nav {
  grid-area: nav;
} 

.info {
  grid-area: info;
} 

.services {
  grid-area: services;
}

footer {
  grid-area: footer;
} 

```

* In the example above, the HTML creates a web page with five distinct parts.
* In the .container ruleset, the grid-template-areas declaration creates a 2-column, 4-row layout.
* The grid-template-rows declaration specifies the height of each of the four rows from top to bottom: 300 pixels, 120 pixels, 800 pixels, and 120 pixels.
* The grid-template-columns declaration uses the fr value to cause the left column to use one fourth of the available space on the page and the right column to use three-fourths of the available space on the page.
* In each ruleset below .container, we use the grid-area property to tell that section to cover the portion of the page specified. The header element spans the first row and both columns. The nav element spans the second row and both columns. The element with class .info spans the third row and left column. The element with class .services spans the third row and right column. The footer element spans the bottom row and both columns.

## Overlap elements
When overlapping elements, it is generally easiest to use the <u>[grid-area](https://www.codecademy.com/courses/learn-css/lessons/advanced-css-grid/exercises/grid-area)</u> property with grid row names. The z-index property tells the browser to render an element on top of another so that it is visible.


# HORIZONTAL AXIS

## justify-items **(positions grid items within their column, container level)**
justify-items is a property that positions grid items along the inline, or row, axis. This means that it positions items from left to right across the web page. This property is declared on grid containers.
It accepts these values:
* start — aligns grid items to the left side of the grid area
* end — aligns grid items to the right side of the grid area
* center — aligns grid items to the center of the grid area
* stretch — stretches all items to fill the grid area

```
main {
  display: grid;
  grid-template-columns: repeat(3, 400px);
  justify-items: center;
}

```

In the example above, we use justify-items to adjust the positioning of some elements on this web page.
* There is a grid container with three columns that are each 400 pixels wide.
* The container has three grid items that do not have a specified width.
* Without setting the justify-items property, these elements will span the width of the column they are in (400 pixels).
* By setting the justify-items property to center, the .card <div>s will be centered inside of their columns. They will only be as wide as necessary to contain their content (the words Card 1, etc).
* If we specify a width for the .card elements, they will not stretch the width of their column.

## justify-content **(positions the column along the row axis, container level)**
Use justify-content to position the entire grid along the row axis. This property is declared on grid containers.
* start — aligns the grid to the left side of the grid container
* end — aligns the grid to the right side of the grid container
* center — centers the grid horizontally in the grid container
* stretch — stretches the grid items to increase the size of the grid to expand horizontally across the container
* space-around — includes an equal amount of space on each side of a grid element, resulting in double the amount of space between elements as there is before the first and after the last element
* space-between — includes an equal amount of space between grid items and no space at either end
* space-evenly — places an even amount of space between grid items and at either end

```
main {
  display: grid;
  width: 1000px;
  grid-template-columns: 300px 300px;
  grid-template-areas: "left right"; 
  justify-content: center;
}

```

In the example above, the grid container is 1000 pixels wide, but we only specified two columns that are 300 pixels each. This will leave 400 pixels of unused space in the grid container. justify-content: center; positions the columns in the center of the grid, leaving 200 pixels on the right and 200 pixels on the left of the grid.


## VERTICAL AXIS

## **align-items (positions grid items within their rows, container level)**
align-items is a property that positions grid items along the block, or column axis. This property is declared on grid containers.
align-items accepts these values:
* start — aligns grid items to the top side of the grid area
* end — aligns grid items to the bottom side of the grid area
* center — aligns grid items to the center of the grid area
* stretch — stretches all items to fill the grid area

```
main {
  display: grid;
  grid-template-rows: repeat(3, 400px);
  align-items: center;
}

```

In the example above, we use align-items to adjust the positioning of some elements on this web page.
* There is a grid container with three rows that are 400 pixels tall.
* The container has three grid items that do not have a specified height.
* Without setting the align-items property, these elements will span the height of the row they are in (400 pixels).
* By setting the align-items property to center, the .card <div>s will be centered vertically inside of their rows. They will only be as tall as necessary to contain their content (the words Card 1, etc).
* If we specify a height for the .card elements, they will not stretch the height of their row even if align-items: stretch; is set.

## **align-content (positions the rows along the column axis, container level)**
align-content positions the rows along the column axis, or from top to bottom, and is declared on grid containers.
* start — aligns the grid to the top of the grid container
* end — aligns the grid to the bottom of the grid container
* center — centers the grid vertically in the grid container
* stretch — stretches the grid items to increase the size of the grid to expand vertically across the container
* space-around — includes an equal amount of space on each side of a grid element, resulting in double the amount of space between elements as there is before the first and after the last element
* space-between — includes an equal amount of space between grid items and no space at either end
* space-evenly — places an even amount of space between grid items and at either end

```
main {
  display: grid;
  height: 600px;
  grid-template-rows: 200px 200px;
  grid-template-areas: "top"
                       "bottom"; 
  align-content: center;
}

```

* In the example above, the grid container is 600 pixels tall, but we only specified two rows that are 200 pixels each. This will leave 200 pixels of unused space in the grid container.
* align-content: center; positions the rows in the center of the grid, leaving 100 pixels at the top and 100 pixels at the bottom of the grid.

## justify-self / align-self (item level)
- justify-self specifies how an individual element should position itself with respect to the row axis. This property will override justify-items for any item on which it is declared.
- align-self specifies how an individual element should position itself with respect to the column axis. This property will override align-items for any item on which it is declared.
These properties are declared on grid items. They both accept these four properties:
* start — positions grid items on the left side/top of the grid area
* end — positions grid items on the right side/bottom of the grid area
* center — positions grid items on the center of the grid area
* stretch — positions grid items to fill the grid area (default)
align-self and justify-self accept the same values as align-items and justify-items

# 


# IMPLICIT/EXPLICIT grid (tutto quello prima con la definizione statica delle colonne è explicit grid. Idea, creare delle tag colorate con icona come implicit grid, explicit grid da mettere nelle card con le proprietà che riguardano l’una o l’altra o entrambe. Aggiungere anche le tag per dove sono usate le proprietà: container o item level. Da mettere nel bottom della card?)

## Implicit grid
The implicit grid is an algorithm built into the specification for CSS Grid that determines default behavior for the placement of elements when there are more than fit into the grid specified by the CSS.
The default behavior of the implicit grid is as follows: items fill up rows first, adding new rows as necessary. New grid rows will only be tall enough to contain the content within them. In the next exercise, you’ll learn how to change this default behavior.

## grid-auto-rows / grid-auto-columns (grid container)
grid-auto-rows specifies the height of implicitly added grid rows. grid-auto-columns specifies the width of implicitly added grid columns
These values are accepted
* pixels (px)
* percentages (%)
* fractions (fr)
* the repeat() function

```
body {
  display: grid;
  grid: repeat(2, 100px) / repeat(2, 150px); 
  grid-auto-rows: 50px;
}

```

In the example above, there are 5 <div>s. However, in the body ruleset, we only specify a 2-row, 2-column grid — four grid cells.
The fifth <div> will be added to an implicit row that will be 50 pixels tall.
If we did not specify grid-auto-rows, the rows would be auto-adjusted to the height of the content of the grid items.

```
grid-auto-rows: 50px 100px;

```

The rows added will alternate with the defined dimensions. The odd rows will be 50px, the even one 100px

## grid-auto-flow 
It specifies whether new elements should be added to rows or columns, and is declared on grid containers.
grid-auto-flow accepts these values:
* row — specifies the new elements should fill rows from left to right and create new rows when there are too many elements (default)
* column — specifies the new elements should fill columns from top to bottom and create new columns when there are too many elements
* dense — this keyword invokes an algorithm that attempts to fill holes earlier in the grid layout if smaller elements are added
You can pair row or column with dense, like this: grid-auto-flow: row dense;.

```
body {
  display: grid;
  gap: 5px;
  grid: repeat(2, 100px) / repeat(2, 150px);
  grid-auto-rows: 45px;
  grid-auto-columns: 65px;
  grid-auto-flow: column;
}

```

The fifth grid item is added to a new, implicit column. The width of this implicit column is dictated by grid-auto-columns, making the fifth item 65px wide — narrower than the other grid items.
Note that with grid-auto-flow: column added to the grid, new items will be added to the existing, explicitly defined rows. Because of this, new items will have the same height as all the items within the explicit grid, 100px, as defined by the grid property.


















