# 6. Hooks: useState()


React Hooks, plainly put, are functions that let us manage the internal state of components and handle post-rendering side effects directly from our function components. Using Hooks, we can determine what we want to show the users by declaring how our user interface should look based on the state.

## **Update Function Component State**
Let’s get started with the **State Hook**, the most common Hook used for building React components. The State Hook is a named export from the React library

```
import React, { useState } from 'react';

```

When we call the useState() function, it returns an array with two values:
* The *current state*: The current value of this state.
* The *state setter*: A function that we can use to update the value of this state.
We can use these two values to track the current state of a data value or property and change it when we need to. To extract the two values from the array, we can assign them to local variables by using array destructuring. For example:

```
const [currentState, setCurrentState] = useState();

```

Example

```
import React, { useState } from "react";

function Toggle() {
  const [toggle, setToggle] = useState();

  return (
    <div>
      <p>The toggle is {toggle}</p>
      <button onClick={() => setToggle("On")}>On</button>
      <button onClick={() => setToggle("Off")}>Off</button>
    </div>
  );
}

```

Notice how the state setter function, setToggle(), is called by our onClick *event listeners*. To update the value of toggle and re-render this component with the new value, all we need to do is call the setToggle() function with the next state value as an argument.
With the State Hook, updating the state is as simple as calling a state setter function. Calling the state setter signals to React that the component needs to re-render, so the whole function defining the component is called again. The magic of useState() is that it allows React to keep track of the current value of the state from one render to the next!

## **Initialize State**
Like how you used the State Hook to manage a variable with string values, we can use the State Hook to manage the value of any primitive data type and even data collections like arrays and objects!
To initialize our state with any value we want, we simply pass the initial value as an argument to the useState() function call.

```
const [isLoading, setIsLoading] = useState(true);

```

There are three ways in which this code affects our component:
* During the first render, the *initial state argument* is used.
* When the state setter is called, React ignores the initial state argument and uses the new value.
* When the component re-renders for any other reason, React continues to use the same value from the previous render.
If we don’t pass an initial value when calling useState(), the current value of the state during the first render will be undefined. We prefer to explicitly initialize our state. If we don’t have the value needed during the first render, we can explicitly pass null instead of passively leaving the value as undefined.

## **Use State Setter Outside of JSX**

```
import React, { useState } from 'react';
export default function EmailTextInput() {
  const [email, setEmail] = useState('');
  const handleChange = (event) => {
    const updatedEmail = event.target.value;
    setEmail(updatedEmail);
  }
  return (
    <input value={email} onChange={handleChange} />
  );
}

```

* We use <u>[array destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)</u> to create our local state variable email and our local setter function setEmail().
* The local variable email is assigned the current state value at index 0 from the array returned by useState()
* The local variable setEmail() is assigned a reference to the state setter function at index 1 from the array returned by useState().
* It’s a convention to name the setter variable using the current state variable (in this example, email) with “set” prepended.
The JSX input tag has an event listener called onChange. This event listener calls an *event handler* each time the user types something in this element. In the example above, our event handler is defined inside of the definition for our function component, but outside of our JSX. Earlier in this lesson, we wrote our event handlers right in our JSX. Those inline event handlers work perfectly fine, but when we want to do something more interesting than just calling the state setter with a static value, it’s a good practice to separate that logic from our JSX. This separation of concerns makes our code easier to read, test, and modify.

It is better to simplify this

```
const handleChange = (event) => {
  const newEmail = event.target.value;
  setEmail(newEmail);
}

```

To

```
const handleChange = (event) => setEmail(event.target.value);

```

Or

```
const handleChange = ({target}) => setEmail(target.value);

```


## **Set From Previous State**
React state updates are *asynchronous*. This means that there are some scenarios where portions of your code will run before the state is finished updating. Consequently, it is best practice to update a state with a callback function, preventing accidental outdated values.

```
import React, { useState } from 'react';
export default function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(prevCount => prevCount + 1);
  return (
    <div>
      <p>Wow, you've clicked that button: {count} times</p>
      <button onClick={increment}>Click here!</button>
    </div>
  );
}

```

When the button is pressed, the increment() event handler is called. Inside this function, we use our setCount() state setter with a callback function. Because the next value of count depends on the previous value of count, we pass a callback function as the argument for setCount() instead of a value (as we’ve done in previous exercises). 

```
setCount(prevCount => prevCount + 1)

```

When our state setter calls the callback function, this *state setter callback function* takes our previous count as an argument. The value returned by this state setter callback function is used as the next value of count (in this case, prevCount + 1).

## **Arrays in State**

```
import React, { useState } from 'react';
//Static array of pizza options offered. 
const options = ['Bell Pepper', 'Sausage', 'Pepperoni', 'Pineapple'];
export default function PersonalPizza() {
  const [selected, setSelected] = useState([]);
  const toggleTopping = ({target}) => {
    const clickedTopping = target.value;
    setSelected((prev) => {
     // check if clicked topping is already selected
      if (prev.includes(clickedTopping)) {
        // filter the clicked topping out of state
        return prev.filter(t => t !== clickedTopping);
      } else {
        // add the clicked topping to our state
        return [clickedTopping, ...prev];
      }
    });
  };
  return (
    <div>
      {options.map(option => (
        <button value={option} onClick={toggleTopping} key={option}>
          {selected.includes(option) ? 'Remove ' : 'Add '}
          {option}
        </button>
      ))}
      <p>Order a {selected.join(', ')} pizza</p>
    </div>
  );
}

```

The options array contains *static data*, meaning that it does not change. It’s best practice to define static data models outside of function components since they don’t need to be recreated each time our component re-renders. In our JSX, we use the JavaScript .map() method to render a button for each of the toppings in our options array.
The selected array contains *dynamic data*, meaning that it changes, usually based on a user’s actions. We initialize selected as an empty array. When a button is clicked, the toggleTopping() event handler is called. Notice how this event handler uses information from the event object to determine which topping was clicked.
When updating an array in a state, we do not just add new data to the previous array. We replace the previous array with a brand new array. This means that any information that we want to save from the previous array needs to be explicitly copied over to our new array. That’s what this <u>[spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)</u> does for us: ...prev.

Example

```
import React, { useState } from "react";
import ItemList from "./ItemList";
import { produce, pantryItems } from "./storeItems";
export default function GroceryCart() {
  // declare and initialize state 
  const [cart, setCart] = useState([])
  const addItem = (item) => {
     setCart(prevCart => [item, ...prevCart])
   };
  const removeItem = (targetIndex) => {
    setCart(prevCart => 
      prevCart.filter((elem, index) => index!==targetIndex))
  };
  return (
    <div>
      <h1>Grocery Cart</h1>
      <ul>
        {cart.map((item, index) => (
          <li onClick={() => removeItem(index)} key={index}>
            {item}
          </li>
        ))}
      </ul>
      <h2>Produce</h2>
      <ItemList items={produce} onItemClick={addItem} />
      <h2>Pantry Items</h2>
      <ItemList items={pantryItems} onItemClick={addItem} />
    </div>
  );
}

```


## **Objects in State**
We can also use state with objects. When we work with a set of related variables, it can be very helpful to group them into an object

```
export default function Login() {
  const [formState, setFormState] = useState({});
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  return (
    <form>
      <input
        value={formState.firstName}
        onChange={handleChange}
        name="firstName"
        type="text"
      />
      <input
        value={formState.password}
        onChange={handleChange}
        type="password"
        name="password"
      />
    </form>
  );
}

```

* We use a state setter callback function to update a state based on the previous value.
* The spread syntax is the same for objects as for arrays: { ...oldObject, newKey: newValue }.
* We reuse our event handler across multiple inputs by using the input tag’s name attribute to identify which input the change event came from.
Anytime one of the input values is updated, the handleChange() function will be called. Inside this event handler, we use object destructuring to unpack the target property from our event object, then we use object destructuring again to unpack the name and value properties from the target object.
Inside our state setter callback function, we wrap our curly brackets in parentheses like so:

```
setFormState((prev) => ({ ...prev }))

```

This tells JavaScript that our curly brackets refer to a new object to be returned. We use ..., the spread operator, to fill in the corresponding fields from our previous state. Finally, we overwrite the appropriate key with its updated value.
Did you notice the square brackets around the name? This <u>[Computed Property Name](http://eloquentcode.com/computed-property-names-in-javascript)</u> allows us to use the string value stored by the name variable as a property key.

## **Separate Hooks for Separate States**
Managing dynamic data is much easier when we keep our data models as simple as possible.

```
function Subject() {
  const [state, setState] = useState({
    currentGrade: 'B',
    classmates: ['Hasan', 'Sam', 'Emma'],
    classDetails: {topic: 'Math', teacher: 'Ms. Barry', room: 201},
    exams: [{unit: 1, score: 91}, {unit: 2, score: 88}]
  })}

```

Shuld be managed as follows

```
function Subject() {
  const [currentGrade, setGrade] = useState('B');
  const [classmates, setClassmates] = useState(['Hasan', 'Sam', 'Emma']);
  const [classDetails, setClassDetails] = useState({topic: 'Math', teacher: 'Ms. Barry', room: 201});
  const [exams, setExams] = useState([{unit: 1, score: 91}, {unit: 2, score: 88}]);
  // ...
}

```

## 
















































