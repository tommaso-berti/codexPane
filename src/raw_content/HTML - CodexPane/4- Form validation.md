# 4. Form validation

[https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation)

## Required
Sometimes we have fields in our <form>s which are not optional, i.e. there must be information provided before we can submit it. To enforce this rule, we can add the *required* attribute to an <input> element. Trying to send a form without filling a required field, an error will be returned and the form will not be sent

```
<form action="/example.html" method="POST">
  <label for="allergies">Do you have any dietary restrictions?</label>
  <br>
  <input id="allergies" name="allergies" type="text" required>
  <br>
  <input type="submit" value="Submit">
</form>

```


## Text lenght
Minlenght, maxlenght

## Matching a pattern
A regular expression is a sequence of characters representing a pattern. We can use that pattern to match a string, match parts of a string, confirm that data is formatted acceptably, or even replace parts of strings with different characters.
We could fully match all of the expressions with the pattern [^]*. To match the first four expressions, we could use a pattern like [hH]ello[^]*. The pattern [^]*\d{3}[^]*\d{3}-\d{4} will match the two example phone numbers.

```
<input id="code" name="code" type="text" required pattern="[cC]odecademy">

<input id="username" name="username" type="text" required minlength="3" maxlength="15" pattern="[a-zA-Z0-9]+">

```


## Client-side validation
If we’re creating a relatively simple website, it makes sense to code the form validation ourselves or use a simple vanilla JavaScript library—<u>[just-validate, for example](https://www.npmjs.com/package/just-validate)</u>. But most basic validation libraries will involve directly accessing or manipulating the DOM. This can get tricky when working with a framework that relies on a virtual DOM—like React or Vue. In those situations, it might be best to incorporate a library that works well with your specific framework. For example, the <u>[formik library](https://www.npmjs.com/package/formik)</u> is a lightweight library that simplifies validating forms in a React app.

## Back-end validation
No matter how complete the front-end validation of a website or application seems, validations must also be completed on the back-end or server-side. Front-end validations are easy to bypass—a malicious user can simply turn off JavaScript on their browser, for example. There’s also the potential for middleman attacks in which data is changed after the request is submitted by a user but before it arrives at the server. As a rule, the back-end should never trust the data it receives.Back-end validation has several advantages:
* It enables us to use validation code often on machines with more computing power.
* It allows us to write validation code that a user can’t see—if malicious users can’t see exactly *how* we validate the data, it’s much more difficult for them to find ways around it.
* We can validate the information against other data the front-end doesn’t have access to—for example, we can check our database to see if a given username is already in use.
There are two main ways to validate inputs on the server-side. The first takes place while the user is still inputting data into the form on the front-end. We can make asynchronous requests to the server with pieces of their data and send feedback directly to the user before they’ve submitted. This is slower than front-end validation and can be a design challenge from a user-experience perspective.
The second is once the form has been submitted. Back-end form validation is our application’s last defense against problematic data, and it’s essential to verify the validity and safety of data before adding it to a database. This is also an opportunity to “sanitize” the data: in order for our database to be useful, it’s important that all data within it is formatted consistently. This means that while we may want to be flexible about the formatting we require from a user, we likely want to transform inputs into a strict format before entering them in the database.
