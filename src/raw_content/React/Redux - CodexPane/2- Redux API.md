# 2. Redux API


Building an application that follows the core principles of Redux can be done without external libraries. However, the dedicated <u>[Redux library](https://redux.js.org/)</u> provides some very useful tools for handling the most common aspects of building a Redux application and helps ensure that the core Redux principles are enforced.

## **Create a Redux Store**
The programmer could manually execute the reducer with the current state of the store and the desired action to perform like so:

```
let state = 'on';
state = lightSwitchReducer(state, { type: 'toggle' });
console.log(state); // Prints 'off'

```

However, this is the main responsibility of the store. The store is an object that enforces the one-way data flow model that Redux is built upon. It holds the current state inside, receives action dispatches, executes the reducer to get the next state, and provides access to the current state for the UI to re-render.
### 
### createStore()
Redux exports a valuable helper function for creating this store object called createStore(). The createStore() helper function has a single argument, a reducer function.

```
import { createStore } from 'redux'
const initialState = 'on';
const lightSwitchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'toggle':
      return state === 'on' ? 'off' : 'on';
    default:
      return state;
  }
}
const store = createStore(lightSwitchReducer);

```

### 
## **Dispatch Actions to the Store**
The store object returned by createStore() provides a number of useful methods for interacting with its state as well as the reducer function it was created with.

### store.dispatch()
The most commonly used method, store.dispatch(), can be used to dispatch an action to the store, indicating that you wish to update the state. Its only argument is an action object, which must have a type property describing the desired state change.

```
const action = { type: 'actionDescriptor' }; 
store.dispatch(action);

```

 Internally, when the store executes its reducer, it uses store.getState() as the state argument.

```
lightSwitchReducer(store.getState(), { type: 'toggle' });

```

### 
### store.get()
Returns the current value of the store’s.

## **Action Creators**
You are likely to dispatch actions of the same type multiple times or from multiple places. Typing out the entire action object can be tedious and creates opportunities to make an error.
An action creator is simply a function that returns an action object with a type property. They are typically called and passed directly to the store.dispatch() method, resulting in fewer errors and an easier-to-read dispatch statement.

```
const toggle = () => {
  return { type: "toggle" };
}
store.dispatch(toggle()); // Toggles the light to 'off'
store.dispatch(toggle()); // Toggles the light back to 'on'
store.dispatch(toggle()); // Toggles the light back to 'off'

```


## **Respond to State Changes**
In a typical web application, user interactions that trigger <u>[DOM events](https://developer.mozilla.org/en-US/docs/Web/Events)</u> ("click", "keydown", etc…) can be listened for and responded to using an <u>[event listener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)</u>.
Similarly, in Redux, actions dispatched to the store can be listened for and responded to using the store.subscribe() method. This method accepts one argument: a function, often called a *listener*, that is executed in response to changes to the store‘s state.

```
const reactToChange = () => console.log('change detected!');
store.subscribe(reactToChange);

```

In this example, each time an action is dispatched to the store, and a change to the state occurs, the subscribed listener, reactToChange(), will be executed.
Sometimes it is useful to stop the listener from responding to changes to the store, so store.subscribe() returns an unsubscribe function.

```
// lightSwitchReducer(), toggle(), and store omitted...

const reactToChange = () => {
  console.log(`The light was switched ${store.getState()}!`);
}
const unsubscribe = store.subscribe(reactToChange);

store.dispatch(toggle());
// reactToChange() is called, printing:
// 'The light was switched off!'

store.dispatch(toggle());
// reactToChange() is called, printing:
// 'The light was switched on!'

unsubscribe(); 
// reactToChange() is now unsubscribed

store.dispatch(toggle());
// no print statement!

console.log(store.getState()); // Prints 'off'

```

* In this example, the listener function reactToChange() is subscribed to the store.
* Each time an action is dispatched, reactToChange() is called and prints the current value of the light switch. It is common for callbacks subscribed to the store to use store.getState() inside them.
* After the first two dispatched actions, unsubscribe() is called causing reactToChange() to no longer be executed in response to further dispatches made to store.

## **Connect the Redux Store to a UI**
Example

```
//App.js
```


```


```


```
import React from "react";
import { increment, decrement } from "./store";

function App({ state, dispatch}) {
  // Dispatch increment action
  const incrementerClicked = () => {
      return dispatch(increment())
  }
  // Dispatch decrement action
  const decrementerClicked = () => {
    return dispatch(decrement())
  }
  return(
    <main>
      <p id='counter'>{state}</p>
      <button id='incrementer' onClick={incrementerClicked}>+</button>
      <button id='decrementer' onClick={decrementerClicked}>-</button>
    </main>
  )
}
export default App;


//Store.js
import { createStore } from 'redux';
// Action Creators
export function increment() { 
  return {type: 'increment'}
}
export function decrement() { 
  return {type: 'decrement'}
}
// Reducer / Store
const initialState = 0;
const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1; 
    case 'decrement':
      return state - 1; 
    default:
      return state;
  }
};  
export const store = createStore(countReducer);


//index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js"
import { store } from "./store.js"
const root = createRoot(document.getElementById("app"));

// Store State Change Listener
const render = () => {
  root.render(<App state={store.getState()} dispatch={store.dispatch}/>);
}
render();
store.subscribe(render)
// Subscribe to state changes
```


```


```













