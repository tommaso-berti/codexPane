# 4. React components


React applications are made of **components.** A component is a small, reusable chunk of code that is responsible for one job. That job is often to render some HTML and re-render it when some data changes.

## Import React
The first React component we created in the last exercise started with importing react

```
import React from 'react';

```

This creates an object named React, which contains methods necessary to use the React library. React is imported from the 'react' package, which should be installed in your project as a dependency. With the object, we can start utilizing features of the react library!
In a React application, the **App.js** file typically is the top level of your application, and **index.js** is the entry point.

## **Import ReactDOM**

```
import ReactDOM from 'react-dom/client';

```

The methods imported from 'react-dom' interact with the DOM.
The methods imported from 'react' do not deal with the DOM at all. They don’t engage directly with anything that isn’t part of React.
The DOM is *used* in React applications, but it isn’t *part* of React. After all, the DOM is also used in countless non-React applications. Methods imported from 'react' are only for pure React purposes, such as creating components or writing JSX elements.
ReactDOM deals with DOM-specific methods that should be used in **index.js**, which is the entry point of our application.

## **Function Component**
It’s useful to think of components as smaller pieces of our interface. Combined, they are the building blocks that make up a React application. In a website, we can create a component for the search bar, another component for the navigation bar, and another component for the dashboard content itself. “e can use JavaScript functions to define a new React component. This is called a **function component**.

```
import React from 'react';

function MyComponent() {
  return <h1>Hello, I'm a functional React Component!</h1>;
}

export default MyComponent;

```

Function component names must start with capitalization and are conventionally created with PascalCase! Due to how JSX tags are compiled, capitalization indicates that it is a React component rather than an HTML tag. If it begins with a lowercase letter, React will begin looking for a built-in component such as div and input instead and fail.
Components in React are great because they are reusable. We can keep our component pieces separated, organized, and reusable by putting them into separate files and exporting them to where we need them.
To export them, we can prefix it with the export declaration and specify if it is a default or named export. In this case, we’ll stick with default. If you need a refresher on export, peruse the <u>[MDN web docs](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export)</u>.

```
export default MyComponent;

```

We can head into our **index.js** file to import our component from './App':

```
import MyComponent from './App';

```

## 
## **Using and Rendering a Component**
We can use it with an HTML-like syntax that resembles a self-closing tag:

```
<MyComponent />

```

If you need to nest other components in between, you may also use an opening and corresponding closing tag structure:

```
<MyComponent>
  <OtherComponent />
</MyComponent>

```

However, to render our component to the browser, we must rely on the .createRoot() and .render() methods from the react-dom library. This should be done in our entry point, **index.js**.
First, we call the createRoot method to create a React root container for displaying content. React applications typically have a single root DOM node, and everything inside it is managed by React DOM.

```
ReactDOM.createRoot(document.getElementById('app'));

```

* document.getElementById('app') returns a DOM element from **index.html**.
* .createRoot() receives the DOM element as the first argument and creates a root for it.
* .createRoot() returns a reference to the root container on which you can call methods like .render().
After the root is created, all that’s left to do is call the .render() method on the returned root and display the React component like so:

```
ReactDOM.createRoot(document.getElementById('app')).render(<MyComponent />);

```

In an application fully built with React, you will only need to do this once. Once this is set up, React will manage the DOM of your application, and any updates to the UI is taken care of efficiently. Adding more components should take place in your top-level **App.js** file.
## 
## **Use Multiline JSX in a Component**
A multi-line JSX expression should always be wrapped in parentheses! That is why QuoteMaker‘s return statement has parentheses around it.

```
import React from 'react';
function QuoteMaker() {
    return (
      <blockquote>
        <p>
          The world is full of objects, more or less interesting; I do not wish to add any more.
        </p>
        <cite>
          <a target="_blank"
            href="https://en.wikipedia.org/wiki/Douglas_Huebler">
            Douglas Huebler
          </a>
        </cite>
      </blockquote>
    );
};
export default QuoteMaker;

```


## **Use a Variable Attribute in a Component**

```
import React from 'react';
const redPanda = {
  src: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Endangered_Red_Panda.jpg',
  alt: 'Red Panda',
  width:  '200px'
};
function RedPanda(){
    return (
      <div>
        <h1>Cute Red Panda</h1>
        <img 
          src={redPanda.src}
          alt={redPanda.alt}
          width={redPanda.width} />
      </div>
    );
}
export default RedPanda;

```


## **Putting Logic in a Function Component**

```
function RandomNumber() {
  //First, some logic that must happen before returning
  const n = Math.floor(Math.random() * 10 + 1);
  //Next, a return statement using that logic: 
  return <h1>{n}</h1>
}

```


## **Use a Conditional in a Function Component**

```
import React from 'react';
function TodaysPlan() {
    let task;
    let apocalypse = false;
    if (!apocalypse) {
      task = 'learn React.js'
    } else {
      task = 'run around'
    }
    return <h1>Today I am going to {task}!</h1>;
}
export default TodaysPlan;

```


## **Event Listener and Event Handlers in a Component**

```
function MyComponent(){
  function handleHover() {
    alert('Stop it.  Stop hovering.');
  }
  return <div onHover={handleHover}></div>;
}

```

In the above example, the event handler is handleHover(). It is passed as a prop to the JSX element <div>. We’ll discuss more on props in a later lesson, but for now, understand that props are information passed to a JSX tag.
Event handler functions are defined inside the function component and, by convention, start with the word “handle” followed by the type of event it is handling. 
The handleHover() function is passed without the parentheses we would typically see when calling a function. This is because passing it as handleHover indicates it should only be called once the event has happened. Passing it as handleHover() would trigger the function immediately, so be careful!

## **Returning Another Component**

```
function PurchaseButton() {
  return <button onClick={()=>{alert("Purchase Complete")}}>Purchase</button>
}
function ItemBox() {
  return (
    <div>
      <h1>50% Sale</h1>
      <h2>Item: Small Shirt</h2>
      <PurchaseButton />
    </div>
  );
}

```


## **Apply a Component in a Render Function**
We can treat it as the Button component is a child of the parent App component. By breaking a component into extracted smaller components, we can reuse the individual parts when necessary.

```
import Button from './Button'
function App() {
  return <Button />;
}
export default App;

```

