# 3. JSX


The part that looks like HTML, <h1>Hello world</h1>, is something called JSX
Docs JavaScript XML (JSX) is a syntax extension of JavaScript that provides highly functional and reusable markup code. It is used to create DOM elements which are then rendered in the React DOM. JSX provides a neat visual representation of the UI.

```
const h1 = <h1>Hello world</h1>;

```

JSX  is a syntax extension for JavaScript. It was written to be used with React. JSX code looks a lot like HTML.If a JavaScript file contains JSX code, then that file will have to be *compiled*. This means that before the file reaches a web browser, a *JSX compiler* will translate any JSX into regular JavaScript.

## **Elements**
A basic unit of JSX is called a JSX *element*.

```
<h1>Hello world</h1>

```

JSX elements are treated as JavaScript *expressions*. They can go anywhere that JavaScript expressions can go. This means that a JSX element can be saved in a variable, passed to a function, stored in an object or array… you name it.

```
const navBar = <nav>I am a nav bar</nav>;

```

Object 

```
const myTeam = {
  center: <li>Benzo Walli</li>,
  powerForward: <li>Rasha Loa</li>,
  smallForward: <li>Tayshaun Dasmoto</li>,
  shootingGuard: <li>Colmar Cumberbatch</li>,
  pointGuard: <li>Femi Billon</li>
};

```


### **Attributes**
A JSX attribute is written using HTML-like syntax: a *name*, followed by an equals sign, followed by a *value*. The *value* should be wrapped in quotes, like this:

```
my-attribute-name="my-attribute-value"

const panda = <img src='images/panda.jpg' alt='panda' width='500px' height='500px'>;

```


### Classes
In JSX, you can’t use the word class! You have to use className instead. This is because JSX gets translated into JavaScript, and class is a reserved word in JavaScript.

```
<h1 className="big">Title</h1>

```


### Self closing tags
In JSX, you *have to* include the slash. If you write a self-closing tag in JSX and forget the slash, you will raise an error:

```
// Fine in JSX:
<br />

// NOT FINE AT ALL in JSX:
<br>

```


### **Nested JSX**
You can *nest* JSX elements inside of other JSX elements, just like in HTML. If a JSX expression takes up more than one line, then you must wrap the multi-line JSX expression in parentheses. A JSX expression must have exactly *one* outermost element. If you notice that a JSX expression has multiple outer elements, the solution is usually simple: wrap the JSX expression in a <div> element.

```
 **const theExample = (
   <a href="https://www.example.com">
     <h1>
       Click me!
     </h1>
   </a>
 );**
```


```


```

This cannot work

```
const paragraphs = (
  <p>I am a paragraph.</p> 
  <p>I, too, am a paragraph.</p>
);

```


## **Rendering**
To *render* a JSX expression means to make it appear on screen.
React relies on two things to render: what content to render and where to place the content.
Where to place the content

```
const container = document.getElementById('app')

```

We use createRoot() from the react-dom/client library, which creates a React root from container and stores it in root. root can be used to render a JSX expression. This is the “where to place the content” part of React rendering.

```
const root = createRoot(container)

```

Uses the render() method of root to render the content passed in as an argument. Here we pass an <h1> element, which displays Hello world. This is the “what content to render” part of React rendering.

```
root.render(<h1>Hello world</h1>)

```


### .render()
The render() method’s argument doesn’t need to be JSX, but it should *evaluate* to a JSX expression. The argument could also be a variable, so long as that variable evaluates to a JSX expression.

```
const toDoList = (
  <ol>
    <li>Learn React</li>
    <li>Become a Developer</li>
  </ol>
);

const container = document.getElementById('app');
const root = createRoot(container);
root.render(toDoList);

```

One special thing about a React root’s render() method is that it *only updates DOM elements that have changed*.
That means that if you render the exact same thing twice in a row, the second render will do nothing:

```
const hello = <h1>Hello world</h1>;

// This will add "Hello world" to the screen:
root.render(hello, document.getElementById('app'));

// This won't do anything at all:
root.render(hello, document.getElementById('app'));

```


## **Curly Braces**
Any code in between the tags of a JSX element will be read as JSX, not as regular JavaScript! JSX doesn’t add numbers—it reads them as text, just like HTML. You can do this by wrapping your code in *curly braces*. They are *markers* that signal the beginning and end of a JavaScript injection into JSX, similar to the quotation marks that signal the boundaries of a string.

```
<h1>{2 + 3}</h1>

```

When you inject JavaScript into JSX, that JavaScript is part of the same environment as the rest of the JavaScript in your file.
That means that you can access variables while inside of a JSX expression, even if those variables were declared outside of the JSX code block.

```
// Declare a variable:
const name = 'Gerdo';
// Access your variable inside of a JSX expression:
const greeting = <p>Hello, {name}!</p>;

```


## **Variable Attributes**

```
**// Use a variable to set the `height` and `width` attributes:
const sideLength = "200px";
const panda = (
  <img 
    src="images/panda.jpg" 
    alt="panda" 
    height={sideLength} 
    width={sideLength} />
);**

```

*Object properties* are also often used to set attributes:

```
const pics = {
  panda: "http://bit.ly/1Tqltv5",
  owl: "http://bit.ly/1XGtkM3",
  owlCat: "http://bit.ly/1Upbczi"
}; 

const panda = (
  <img 
    src={pics.panda} 
    alt="Lazy Panda" />
);

const owl = (
  <img 
    src={pics.owl} 
    alt="Unimpressed Owl" />
);

const owlCat = (
  <img 
    src={pics.owlCat} 
    alt="Ghastly Abomination" />
); 

```


## **Event Listeners**
JSX elements can have *event listeners*, just like HTML elements can. Programming in React means constantly working with event listeners.
You create an event listener by giving a JSX element a special *attribute*

```
function clickAlert() {
  alert('You clicked this image!');
}
<img onClick={clickAlert} />

```

An event listener attribute’s *name* should be something like onClick or onMouseOver: the word on plus the type of event that you’re listening for. Look through the <u>[common components list in React docs](https://react.dev/reference/react-dom/components/common#)</u> to browse supported event names.
An event listener attribute’s *value* should be a function. The above example would only work if clickAlert were a valid function that had been defined elsewhere:
Note that in HTML, event listener *names* are written in all lowercase, such as onclick or onmouseover. In JSX, event listener names are written in camelCase, such as onClick or onMouseOver.

## **Conditionals: Ternary operator**
Normal if…else can be used outside the JSX element (cannot be embedded inside { }). However, the preferred way is to use the ternary operator. The ternary operator works the same way in React as it does in regular JavaScript. However, it shows up in React surprisingly often.

```
const headline = (
  <h1>
    { age >= drinkingAge ? 'Buy Drink' : 'Do Teen Stuff' }
  </h1>
);

```


## **Conditionals: &&**
&& works best for conditionals that will sometimes do an action but other times do *nothing at all*.

```
const tasty = (
  <ul>
    <li>Applesauce</li>
    { !baby && <li>Pizza</li> }
    { age > 15 && <li>Brussels Sprouts</li> }
    { age > 20 && <li>Oysters</li> }
    { age > 25 && <li>Grappa</li> }
  </ul>
);

```


## **.map()**
The .map() array method comes up often in React.

```
const strings = ['Home', 'Shop', 'About Me'];
const listItems = strings.map(string => <li>{string}</li>);
<ul>{listItems}</ul>      //listItems is and array of <li> elements

```


## **Keys**
A key is a JSX attribute. The attribute’s *name* is key. The attribute’s *value* should be something unique, similar to an id attribute.

```
<ul>
  <li key="li-01">Example1</li>
  <li key="li-02">Example2</li>
  <li key="li-03">Example3</li>
</ul>

```

keys don’t do anything visible! React uses them internally to keep track of lists. If you don’t use keys when you’re supposed to, React might accidentally scramble your list items into the wrong order.
Not all lists need to have keys. A list needs keys if either of the following is true:
* The list items have *memory* from one render to the next. For instance, when a to-do list renders, each item must “remember” whether it was checked off. The items shouldn’t get amnesia when they render.
* A list’s order might be shuffled. For instance, a list of search results might be shuffled from one render to the next.

## **React.createElement**
The majority of React programmers do use JSX, but you should understand that it is possible to write React code without it.

```
const h1 = <h1>Hello world</h1>;

```

can be rewritten without JSX, like this:

```
const h1 = React.createElement(
  "h1",
  null,
  "Hello world"
);

```

Every JSX element is secretly a call to React.createElement().
Check out <u>[the React documentation on createElement()](https://react.dev/reference/react/createElement)</u> to learn more.











