# 3. JSON


JSON, or JavaScript Object Notation, is a popular, language-independent, standard format for storing and exchanging data. Adopted by <u>[ECMA International](http://ecma-international.org/)</u>, an industry association founded in 1961 to standardize information and communication systems, <u>[JSON](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf)</u> has become the de facto standard that facilitates storing and sending data between all <u>[programming languages](https://www.codecademy.com/resources/blog/programming-languages/)</u>.

JSON is heavily used to facilitate data transfer in web applications between a client, such as a web browser, and a server. A typical example where such data transfer occurs is when you fill out a web form. The form data is converted from HTML to JavaScript objects to JSON objects and sent to a remote web server for processing. These transactions could be as simple as entering a search engine query to a multi-page job application.

When companies make their data public for other applications, like Spotify sharing its music library or Google sharing its map data, the information is formatted in JSON. This way, any application, regardless of language, can collect and parse the data.

## **JSON** Syntax
Since JSON is derived from the JavaScript programming language, its appearance is similar to that of JavaScript objects.

```
{
  "student": {
    "name": "Rumaisa Mahoney",
    "age": 30,
    "fullTime": true,
    "languages": [ "JavaScript", "HTML", "CSS" ],
    "GPA": 3.9,
    "favoriteSubject": null
  }
}

```

## 
## **JSON Data Types**
A JSON data type must be one of the following:
* string (double-quoted)
* number (integer or floating point)
* object (name-value pair)
* array (comma-delimited)
* boolean (true or false)
* null
Notably, JSON doesn’t cover every data type. Types that are not represented in JSON such as dates can be stored as a string and converted to a language-specific data structure. Here’s an acceptable internationally-recognized date format in <u>[ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html)</u>:

```
"2014-01-01T23:28:56.782Z"

```


## **JSON Object vs. JavaScript Object**
JSON

```
{
  "person": {  
    "name": "Kate",  
    "age": 30,  
    "hobbies": [ "reading", "writing", "cooking", "tennis" ] 
  }
}

```

JavaScript

```
{  
  person: {
    name: 'Kate',  
    age: 30,  
    hobbies: [ 'reading', 'writing', 'cooking', 'tennis' ] 
  }


```

Notice a slight difference between the two formats.
* The name portion in each JSON name-value pair and all string values must be enclosed in double-quotes while this is optional in JavaScript.
* JavaScript accepts string values that are single or double-quoted, however, some <u>[JavaScript style guides](https://javascript.plainenglish.io/javascript-style-guides-d5d25df8cb0f)</u> prefer one style over another.

## **Reading a JSON String**
In a typical web application, the JSON data that we receive from a web request comes in the form of a string. At other times, JSON data is stored in a file that is used for authentication, configuration, or database storage. These files typically have a **.json** extension, and they have to be opened in order to retrieve the JSON string in it. In either case, we will need to convert the string to a format that we can use in order to access its parts. Each programming language has its own mechanism to handle this conversion. In JavaScript, for example, we have a built-in JSON class with a method called <u>[.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)</u> that takes a JSON string as a parameter and returns a JavaScript object.

The following code converts a JSON string object, jsonData, into a JavaScript object, jsObject, and logs jsObject on the console.

```
const jsonData = '{ "book": { "name": "JSON Primer", "price": 29.99, "inStock": true, "rating": null } }';
const jsObject = JSON.parse(jsonData);
console.log(jsObject);

```

This will print out jsObject as follows:

```
{
  book: { name: 'JSON Primer', price: 29.99, inStock: true, rating: null }
}

```


## **Writing a JSON String**
Before we can send off our data across the web, we need to convert them to a JSON string. In JavaScript, we would use the built-in JSON class method, <u>[.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)</u> to transform our JavaScript object to a JSON string.
The following code converts a JavaScript object, jsObject, into a JSON string, jsonData.

```
const jsObject = { book: 'JSON Primer', price: 29.99, inStock: true, rating: null };
const jsonData = JSON.stringify(jsObject);
console.log(jsonData);

```

This will display the following output:

```
{ "book": "JSON Primer", "price": 29.99, "inStock": true, "rating": null }

```

























