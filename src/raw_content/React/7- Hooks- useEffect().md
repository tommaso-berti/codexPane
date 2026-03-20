# 7. Hooks: useEffect()

# 
We use the **Effect Hook** to run some JavaScript code after each render to:
* fetch data from a back-end service.
* subscribe to a stream of data.
* manage timers and intervals.
* read from and make changes to the DOM.
Components will re-render multiple times throughout their lifetime. These key moments present the perfect opportunity to execute these “side effects”.
There are three key moments when the Effect Hook can be utilized:
* When the component is first added, or *mounted*, to the DOM and renders.
* When the state or props change, causing the component to re-render.
* When the component is removed, or *unmounted*, from the DOM.

## **Function Component Effects**

```
import React, { useState, useEffect } from 'react';
function PageTitle() {
  const [name, setName] = useState('');
  useEffect(() => {
    document.title = `Hi, ${name}`;
  });
  return (
    <div>
      <p>Use the input field below to rename this page!</p>
      <input onChange={({target}) => setName(target.value)} value={name} type='text' />
    </div>
  );
}

```


The useEffect() function has no return value as the Effect Hook is used to call another function. We pass the callback function, or *effect*, to run after a component renders as the argument of the useEffect() function. In our example, the following effect runs after each time the PageTitle component renders:

```
() => { document.title = `Hi, ${name}`;}

```

Here, we assign Hi, ${name} as the value of <u>[document.title](https://developer.mozilla.org/en-US/docs/Web/API/Document/title)</u>.
The onChange event listener triggers the PageTitle component to be re-rendered every time the user types in the input. Consequently, this triggers useEffect() and changes the document’s title.
Notice how we use the current state inside of our effect. Even though our effect is called after the component renders, we still have access to the variables in the scope of our function component! When React renders our component, it will update the DOM as usual, and then run our effect after the DOM has been updated. This happens for every render, including the first and last one.
useEffect() is always triggered when the component PageTitle is re-rendered

## **Clean Up Effects**
Some effects require **cleanup**. For example, we might want to add event listeners to some element in the DOM, beyond the JSX in our component. When we add event listeners to the DOM, it is important to remove those event listeners when we are done with them to avoid memory leaks!

```
useEffect(()=>{
  document.addEventListener('keydown', handleKeyPress);
  // Specify how to clean up after the effect:
  return () => {
    document.removeEventListener('keydown', handleKeyPress);
  };
})

```

If our effect didn’t return a *cleanup function*, a new event listener would be added to the DOM’s document object every time that our component re-renders. Not only would this cause bugs, but it could cause our application performance to diminish and maybe even crash!
If our effect returns a function, then the useEffect() Hook always treats that as the cleanup function. React will call this cleanup function before the component re-renders or unmounts. Since this cleanup function is optional, it is our responsibility to return a cleanup function from our effect when our effect code could create memory leaks.

```
import React, { useState, useEffect } from "react";
export default function Counter() {
  const [clickCount, setClickCount] = useState(0);
  // your code here
  const increment = () => {
    setClickCount((prevClick) => prevClick + 1);
  };
  useEffect(() => {
    document.addEventListener("mousedown", increment);
    return () => {
      document.removeEventListener("mousedown", increment);
    };
  });
  return <h1>Document Clicks: {clickCount}</h1>;
}

```


## **Control When Effects Are Called**
It is common, when defining function components, to run an effect only when the component mounts (renders the first time), but not when the component re-renders. The Effect Hook makes this very easy for us to do! If we want to only call our effect after the first render, we pass an empty array to useEffect() as the second argument. This second argument is called the **dependency array**.
The dependency array is used to tell the useEffect() method when to call our effect and when to skip it. Our effect is always called after the first render but only called again if something in our dependency array has changed values between renders.

```
useEffect(() => {
  alert("component rendered for the first time");
  return () => {
    alert("component is being removed from the DOM");
  };
}, []); 

```


Without passing an empty array as the second argument thttps://www.piusport.net/template/shop/assets/img/logo/piusport-white.png?3o the useEffect() above, those alerts would be displayed before and after every render of our component, which is clearly not when those messages are meant to be displayed. Simply passing [] to the useEffect() function is enough to configure when the effect and cleanup functions are called!
Example:

```
import React, { useState, useEffect } from "react";
export default function Timer() {
  const [time, setTime] = useState(0);
  const [name, setName] = useState("");
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => {clearInterval(intervalId)}
  }, []);
  const handleChange = ({target}) => setName(target.value)
  return (
    <>
      <h1>Time: {time}</h1>
      <input value={name} onChange={handleChange} />
    </>
  );
}
```


```


```

This code defines a React component called Timer. It displays a timer that increases by one every second and an input box where the user can type a name. The timer uses the useEffect hook to start an interval when the component mounts, updating the time state every second. The interval is cleared when the component unmounts. The input box is controlled by the name state, which updates as the user types.

An empty dependency array signals to the Effect Hook that our effect never needs to be re-run, that it doesn’t depend on anything. Specifying zero dependencies means that the result of running that effect won’t change and calling our effect once is enough.
A dependency array that is not empty signals to the Effect Hook that it can skip calling our effect after re-renders unless the value of one of the variables in our dependency array has changed. If the value of a dependency has changed, then the Effect Hook will call our effect again!

```
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if the value stored by count changes
```


```


```


## **Fetch Data**
When our effect is responsible for fetching data from a server, we pay extra close attention to when our effect is called. Unnecessary round trips back and forth between our React components and the server can be costly in terms of:
* Processing
* Performance
* Data usage for mobile users
* API service fees
When the data that our components need to render doesn’t change, we can pass an empty dependency array so that the data is fetched after the first render. When the response is received from the server, we can use a state setter from the State Hook to store the data from the server’s response in our local component state for future renders. Using the State Hook and the Effect Hook together in this way is a powerful pattern that saves our components from unnecessarily fetching new data after every render!

## **Rules of Hooks**
There are two main rules to keep in mind when using Hooks:
* Only call Hooks at the top level.
* Only call Hooks from React functions.
React keeps track of the data and functions that we are managing with Hooks based on their order in the function component’s definition. For this reason, we always call our Hooks at the top level; we never call hooks inside of loops, conditions, or nested functions.
NO

```
if (userName !== '') {
  useEffect(() => {
    localStorage.setItem('savedUserName', userName);
  });
}

```

YES

```
useEffect(() => {
  if (userName !== '') {
    localStorage.setItem('savedUserName', userName);
  }
});

```

Secondly, Hooks can only be used in React Functions. We’ve been working with useState() and useEffect() in *function* components, and this is the most common use. The only other place where Hooks can be used is within custom hooks. <u>[Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks#custom-hooks-sharing-logic-between-components)</u> are incredibly useful for organizing and reusing stateful logic between function components.

## **Separate Hooks for Separate Effects**
Packaging data together can also add complexity to the code responsible for managing that data. Therefore, it is a good idea to separate concerns by managing different data with different Hooks.

```
// Handle both position and menuItems with one useEffect hook.
const [data, setData] = useState({ position: { x: 0, y: 0 } });
useEffect(() => {
  get('/menu').then((response) => {
    setData((prev) => ({ ...prev, menuItems: response.data }));
  });
  const handleMove = (event) =>
    setData((prev) => ({
      ...prev,
      position: { x: event.clientX, y: event.clientY }
    }));
  window.addEventListener('mousemove', handleMove);
  return () => window.removeEventListener('mousemove', handleMove);
}, []);

```

To the simplicity here, where we have separated concerns:

```
// Handle menuItems with one useEffect hook.
const [menuItems, setMenuItems] = useState(null);
useEffect(() => {
  get('/menu').then((response) => setMenuItems(response.data));
}, []);

// Handle position with a separate useEffect hook.
const [position, setPosition] = useState({ x: 0, y: 0 });
useEffect(() => {
  const handleMove = (event) =>
    setPosition({ x: event.clientX, y: event.clientY });
  window.addEventListener('mousemove', handleMove);
  return () => window.removeEventListener('mousemove', handleMove);
}, []);

```








































