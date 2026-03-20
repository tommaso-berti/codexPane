# 3. Form imput


## <form></form>
Just like a physical form, an HTML <form> element is responsible for collecting information to send somewhere else.

```
<form action="/example.html" method="POST">
</form>

```

In the above example, we’ve created the skeleton for a <form> that will send information to example.html as a POST request:
- *action* attribute determines where the information is sent.
- *method* attribute is assigned a HTTP verb that is included in the HTTP request.
## 
## <input>
The <input> element has a type attribute which determines how it renders on the web page and what kind of data it can accept.(self closing tag)
When we create an <input> element with type="text", it renders a text field that users can type into. Note that the default value of type is "text". It’s also important that we include a name attribute for the <input> — without the name attribute, information in the <input> won’t be sent when the <form> is submitted

```
<input type="text" name="first-text-field">

```


## Default value
We could also assign a default value for the value attribute so that users have a pre-filled text field when they first see the rendered form like so:

```
<form action="/example.html" method="POST">
  <input type="text" name="first-text-field" value="already pre-filled">
</form>

```

When the form is submitted wit a custom string “important details”, the text: "first-text-field=important details" is sent to /example.html because the value of the name attribute is "first-text-field" and the value of value is "important details".

## <label></label>
The <label> element has an opening and closing tag and displays text that is written between the opening and closing tags. To associate a <label> and an <input>, the <input> needs an id attribute. We then assign the for attribute of the <label> element with the value of the id attribute of <input>

```
<form action="/example.html" method="POST">
  <label for="meal">What do you want to eat?</label>
  <br>
  <input type="text" name="food" id="meal">
</form>

```


## Text

```
<input type="text" name="first-text-field">

```


## Password
An <input type ="password"> element will replace input text with another character like an asterisk (*) or a dot (•).

```
<form>
  <label for="user-password">Password: </label>
  <input type="password" id="user-password" name="user-password">
</form>

```


## Number
By setting type="number" for an <input> we can restrict what users type into the input field to just numbers (and a few special characters like -, +, and .). We can also provide a step attribute which creates arrows inside the input field to increase or decrease by the value of the step attribute.

```
<form>
  <label for="years"> Years of experience: </label>
  <input id="years" name="years" type="number" step="1">
</form>

```


## Range
To set the minimum and maximum values of the slider we assign values to the min and max attribute of the <input>. We could also control how smooth and fluid the slider works by assigning the step attribute a value. Smaller step values will make the slider move more fluidly, whereas larger step values will make the slider move more noticeably. 

```
<form>
  <label for="volume"> Volume Control</label>
  <input id="volume" name="volume" type="range" min="0" max="100" step="1">
</form>

```


## Checkbox

```
<form>
  <p>Choose your pizza toppings:</p>
  <label for="cheese">Extra cheese</label>
  <input id="cheese" name="topping" type="checkbox" value="cheese">
  <br>
  <label for="pepperoni">Pepperoni</label>
  <input id="pepperoni" name="topping" type="checkbox" value="pepperoni">
</form>

```


## Radio buttons
Use when only one value should be selected on different options

```
<form>
  <p>What is sum of 1 + 1?</p>
  <input type="radio" id="two" name="answer" value="2">
  <label for="two">2</label>
  <br>
  <input type="radio" id="eleven" name="answer" value="11">
  <label for="eleven">11</label>
</form>

```


## **Dropdown**
Used to select multiple values

```
<form>
  <label for="lunch">What's for lunch?</label>
  <select id="lunch" name="lunch">
    <option value="pizza">Pizza</option>
    <option value="curry">Curry</option>
    <option value="salad">Salad</option>
    <option value="ramen">Ramen</option>
    <option value="tacos">Tacos</option>
  </select>
</form>

```

If a user selected Pizza from the dropdown list, the information would be sent as "lunch=pizza".

## Details
Used to select multiple value with the possibility to search values with the keyboard. If no results are found, the value inserted by the user is still sent

```
<form>
  <label for="city">Ideal city to visit?</label>
  <input type="text" list="cities" id="city" name="city">

  <datalist id="cities">
    <option value="New York City"></option>
    <option value="Tokyo"></option>
    <option value="Barcelona"></option>
    <option value="Mexico City"></option>
    <option value="Melbourne"></option>
    <option value="Other"></option>  
  </datalist>
</form>


```


## Textarea
Used for long text, with the possibility to go into a new line

```
<form>
  <label for="blog">New Blog Post: </label>
  <br>
  <textarea id="blog" name="blog" rows="5" cols="30">
      Default text
  </textarea>
</form>

```


## Submit
Create a button to submit the form

```
<form>
  <input type="submit" value="Send">
</form>

```

