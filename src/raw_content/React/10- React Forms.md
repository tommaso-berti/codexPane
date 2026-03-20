# 10. React Forms


In a regular HTML form, the state of the form is typically managed by the browser. It doesn’t update the server until the user hits *submit*.
Things work a bit differently in React. In a React form, the state of the form can be managed by the component, and updates are triggered by the onChange event. When the user interacts with an input, such as entering or deleting any characters, the onChange event fires and updates the component state.

When a user types in the <input> field, then that will trigger a *change* event, which will call handleUserInput(). That’s good!
handleUserInput() will set userInput equal to whatever text is currently in the <input> field. That’s also good!
There’s only one problem: you can set userInput to whatever you want, but <input>‘s value prop will not update.
In React, the value prop of an input element is used to control the value of the input and keep it in sync with the component’s state. Without setting the value prop, changes made to the input would not be reflected in the component’s state, leading to inconsistencies and potential bugs down the line.
To ensure that the input’s value matches the component state, we can set the value prop and use the onChange event to update the state with the new value. When the state is updated, the component re-renders, and the value prop is set to the new value from the component’s state
For example, if we had a login form with an email and password input, we would set the value prop for both inputs and update the component’s state whenever the user types in a new email or password. This way, the form data is always up to date with the user’s input.


```
import React, { useState } from "react";
import styles from "./Input.module.css";

function Input() {
  const [userInput, setUserInput] = useState("");
  function handleUserInput(e) {
    setUserInput(e.target.value);
  }
  return (
    <>
      <div className={styles.emailContainer}>
        <h2>Let's stay in touch.</h2>
        <p>
          Sign up for our newsletter to stay up-to-date on the latest products,
          receive exclusive discounts, and connect with other programmers who
          share your passion for all things tech.
        </p>
        <form>
          <label for="email">Email: </label>
          <input
            id="email"
            type="text"
            onChange={handleUserInput}
            value={userInput}
          />
        </form>
      </div>
      <div className={styles.inputDisplay}>
        <h2>Current User Input: </h2>
        <h4>{userInput}</h4>
      </div>
    </>
  );
}
export default Input;

```


## Controlled vs uncontrolled 
An *uncontrolled component* is a component that maintains its own internal state. A *controlled component* is a component that does not maintain any internal state. Since a controlled component has no state, it must be *controlled* by someone else.
Think of a typical <input type='text' /> element. It appears on the screen as a text box. If you need to know what text is currently in the box, then you can ask the <input> element, possibly with some code like this:
The important thing here is that the <input> element *keeps track of* its own text. You can access what its text is at any time. The fact that <input> keeps track of information makes it an *uncontrolled component*. It maintains its own internal state by remembering data about itself.
A controlled component, on the other hand, has no memory. If you ask it for information about itself, then it will have to get that information through props. Most React components are *controlled*.
In React, when you give an <input> element a value attribute, then something strange happens: the <input> element *becomes controlled*. It stops using its internal storage. This is a more “React” way of doing things.
You can find more information about <u>[controlled and uncontrolled components](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components)</u> in the React documentation.

### Example 1

```
import React, { useState } from "react";
function StudentForm() {
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    age: "",
    address: "",
    homeroom: "",
    studentId: "",
  });
  function handleUserInput(e) {
    setUserInput({ ...userInput, [e.target.id]: e.target.value });
  }
  return (
    <div>
      <h1 style={{ color: "red" }}>Student form</h1>
      <form>
        <label for="firstName">First name: </label>
        <input
          id="firstName"
          type="text"
          onChange={handleUserInput}
          value={userInput.firstName}
        />
        <label for="lastName">Last name: </label>
        <input
          id="lastName"
          type="text"
          onChange={handleUserInput}
          value={userInput.lastName}
        />
        <label for="age">Age: </label>
        <input
          id="age"
          type="number"
          onChange={handleUserInput}
          value={userInput.age}
        />
        <label for="address">Address: </label>
        ...
      </form>
      <h2>Stai inserendo questo valore</h2>
      <h4>{userInput.firstName}</h4>
      ....
    </div>
  );
}
export default StudentForm;

```


### Example 2

```
import React, { useState } from "react";

function FoodOrderForm() {
const [name, setName] = useState('')
const [phone, setPhone] = useState('')
const [address, setAddress] = useState('')
const [order, setOrder] = useState('')

const handleSubmit = (e) => {
  e.preventDefault();
  alert(`Order Successful! Your order was ${order}.Please show your confirmation number for pickup`)
}

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>Name</label>
      <input id='name' name="name" type='text' value={name} onChange={(e) => setName(e.target.value)}>
      </input>
      <label htmlFor='phone'>Phone</label>
      <input id='phone' name="phone" type='tel' value={phone} onChange={(e) => setPhone(e.target.value)}>
      </input>
      <label htmlFor='address'>Address</label>
      <input id='address' name="address" type='text' value={address} onChange={(e) => setAddress(e.target.value)}>
      </input>
      <label htmlFor='order'>Order</label>
      <input id='order' name="order" type='text' value={order} onChange={(e) => setOrder(e.target.value)}>
      </input>
      <button type='submit'>Submit Order</button>
    </form>
  )
}

export default FoodOrderForm;

```







































