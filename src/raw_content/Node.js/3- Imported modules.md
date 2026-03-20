# 3. Imported modules


## The OS Module
When developing or debugging an app, it can be helpful to have information about the computer, operating system, and network on which the program is running. Before Node, this information could not be retrieved using JavaScript due to the language being confined to the browser
Unlike process and console, the os module is not global, so it must be imported into a file in order to gain access to its methods. We can include the os module like this:

```
const os = require('os');

```

With the  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     os
 </span> module saved to the  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     os
 </span> variable, we can access methods such as:
* type — returns the computer’s operating system
* arch — returns the operating system <u>[CPU](https://www.codecademy.com/resources/docs/general/computer-hardware/cpu)</u> architecture
* networkInterfaces — returns information about the network interfaces of the computer, such as IP and MAC addresses
* homedir — returns the current user’s home directory
* hostname — returns the hostname of the operating system
* uptime — returns the system uptime, in seconds

## **The Util Module**
Developers sometimes use the term **utility function** to describe outlier functions that are used to maintain code and debug certain aspects of a program’s functionality. Utility functions don’t necessarily create new features in a program, but we can think of them as internal tools used to maintain and debug code.

```
const util = require('util');

```


### **util.types**
One important object is types, which provides methods for runtime type-checking in Node.

```
const util = require('util');

const today = new Date();
const earthDay = 'April 22, 2022';

console.log(util.types.isDate(today));
console.log(util.types.isDate(earthDay));

```

There is also a shortcut for directly importing the types object. This is particularly useful if you plan to use type-checking functions, but not any other functionality from util.

```
const types = require('util/types');

console.log(types.isAsyncFunction(async () => {})); // Prints: true

```


### **util.promisify**
Another important util method is .promisify(), which turns callback functions into promises. As you likely know, asynchronous programming is essential to Node.js. In the beginning, this asynchrony was achieved using error-first callback functions, which are still very prevalent in the Node ecosystem today. But since promises are often preferred over callbacks, and especially nested callbacks, Node offers a way to turn these into promises. Let’s take a look:

```
function getUser(id, callback) {
  return setTimeout(() => {
    if (id === 5) {
      callback(null, { nickname: 'Teddy' });
    } else {
      callback(new Error('User not found'));
    }
  }, 1000);
}

function callback (error, user) {
  if (error) {
    console.error(error.message);
    return;
  }

  console.log(`User found! Their nickname is: ${user.nickname}`);
}

getUser(1, callback); // Prints: User not found
getUser(5, callback); // Prints: User found! Their nickname is: Teddy

```


Here we have a function that queries a database for a specified user ID. getUser methods are very common in back-end applications, and many will also support error-first callbacks. Since a database query typically takes longer to run than other operations, we simulate the query using setTimeout(), which executes a callback function after 1000 milliseconds (or 1 second).
If the user with the specified ID is found, the callback function is executed with null passed in as the argument for the error <u>parameter</u>, and an object containing the returned user information is passed in as an argument for the user parameter.
If the user is not found, the callback function is executed, passing in a new Error as the argument for the error parameter. A second argument for user is not necessary since the function will return in the case of an error.
This way of handling this function may seem a bit convoluted these days, but with .promisify(), we can easily change it into a modern, cleaner, and more maintainable version of itself:

```
const util = require('util');

const getUserPromise = util.promisify(getUser);

async function tryToGetUser(id) {
  try {
    const user = await getUserPromise(id);
    console.log(`User found! Their nickname is: ${user.nickname}`);
  } catch(e) {
    console.error('User not found');
  }
}

tryToGetUser(1); // Prints: User not found
tryToGetUser(5); // Prints: User found! Their nickname is: Teddy

```

We declare a getUserPromise variable that stores the getUser method turned into a promise using the .promisify() method. With that in place, we’re able to use getUserPromise() with async/await syntax (or we could also use the .then() and .catch() methods) to resolve the promise returned or catch any errors.

## **The Events Module**
In traditional imperative programming, we give the computer a series of instructions to execute in a pre-defined order. In contrast, when we write web applications, we often need to write logic to handle situations without knowing exactly when they’ll occur. For example, when programming a website, we might provide functionality for a click event without knowing when a user will trigger it. When Node was created, it applied this same concept of event-driven principles to the back-end environment.
Node provides an EventEmitter class, which we can access by importing the events core module:

```
// import the 'events' core module
let events = require('events');
// Ccreate an instance of the EventEmitter class
let myEmitter = new events.EventEmitter();

```

Each event emitter instance has an on method, which assigns a **listener** callback function to a named event. The on method takes the name of the event as a string as its first argument and, as its second argument, the listener callback function.
Each event emitter instance also has an emit method, which announces that a named event has occurred. The emit method takes the name of the event as a string as its first argument and, as its second argument, the data that should be passed into the listener callback function.

```
let newUserListener = (data) => {
  console.log(`We have a new user: ${data}.`);
};

// assign the newUserListener function as the listener callback for 'new user' events:
myEmitter.on('new user', newUserListener)

// emit a 'new user' event
myEmitter.emit('new user', 'Lily Pad') // newUserListener will be invoked with 'Lily Pad'

//output
We have a new user: Lily Pad.

```


## **The Buffer Module**
In Node.js, the Buffer module is used to handle binary data. A Buffer object represents a fixed amount of memory that cannot be resized. Buffer objects are similar to an array of integers, where each element in the array is a byte of data, represented by a two-digit hexadecimal value. In decimal values, a two-digit hexadecimal value will represent an integer between 0 and 255, inclusive.

```
const { Buffer } = require('buffer');

```

The Buffer module provides various methods for handling binary data, such as alloc, toString, from, and concat.

### alloc
The  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     .alloc()
 </span> method creates (or allocates) a new  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     Buffer
 </span> object with a specified size.  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     .alloc()
 </span> accepts three arguments:
* size (required): the number of bytes the buffer will hold
* fill (optional): a value to fill the buffer with, accepts strings and integers, among a few other types — defaults to 0
* encoding (optional): the text encoding that should be used to interpret the fill <u>[argument](https://www.codecademy.com/resources/docs/general/argument)</u> when it is a <u>[string](https://www.codecademy.com/resources/docs/general/data-types/string)</u> value. defaults to 'utf-8'

```
const buffer = Buffer.alloc(5);
console.log(buffer); // Prints: <Buffer 00 00 00 00 00>

```


### toString
The  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     .toString()
 </span> method translates the  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     Buffer
 </span> object into a human-readable string. It accepts three optional arguments:
* encoding (optional): the text encoding that should be used to transform the buffer into a string. defaults to 'utf-8'
* start (optional): the byte offset to begin transforming the Buffer object, inclusive — default is 0, the beginning of the buffer
* end (optional): the byte offset to end transforming the Buffer object, exclusive — default is the length of the buffer
As with arrays, the elements of  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     Buffer
 </span> objects are zero-indexed, incrementing by  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     1
 </span> — we can use these indices to specify the  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     start
 </span> and  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     end
 </span> values. The default  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     start
 </span> and  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     end
 </span> values will result in the entire  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     Buffer
 </span> object being transformed into a string.

```
const buffer = Buffer.alloc(5, 'a');
console.log(buffer.toString()); // Prints: aaaaa

```


### from
he  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     .from()
 </span> method is provided to create a new  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     Buffer
 </span> object from the specified string, array, or buffer. The  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     .from()
 </span> method has several different signatures for the various input types it can take, but we will focus on the <u>[signature for creating a buffer from a string](https://nodejs.org/api/buffer.html#static-method-bufferfromstring-encoding)</u>, which accepts two arguments:
* string (required): an object from which the buffer will be made
* encoding (optional): the text encoding of the provided string — defaults to 'utf-8'

```
const buffer = Buffer.from('hello');
console.log(buffer); // Prints: <Buffer 68 65 6c 6c 6f>

```


### concat
The  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     .concat()
 </span> method joins an array of  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     Buffer
 </span> objects into a single  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     Buffer
 </span> object.  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     .concat()
 </span> comes in handy because a  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     Buffer
 </span> object can’t be resized. This method accepts two arguments:
* list (required): an array containing Buffer objects
* totalLength (optional): specifies the exact total length of the concatenated buffer — if the concatenated length is greater, the result is truncated, and if it is less, the remaining indices are filled with zeroes
When totalLength is not specified, the result will simply be the length of all the elements of list joined together.

```
const buffer1 = Buffer.from('hello'); // <Buffer 68 65 6c 6c 6f>
const buffer2 = Buffer.from('world'); // <Buffer 77 6f 72 6c 64>
const array = [buffer1, buffer2];
const bufferConcat = Buffer.concat(array, 9);

console.log(bufferConcat); // Prints: <Buffer 68 65 6c 6c 6f 77 6f 72 6c>
console.log(bufferConcat.toString()); // Prints: helloworl

```


## The FS Module
All of the data on a computer is organized and accessed through a file system. When running JavaScript code on a browser, it’s important for a script to only have limited access to a user’s file system. This technique of isolating some applications from others is known as “sandboxing”. Sandboxing protects users from malicious programs and invasions of privacy.
In the back-end, however, it is essential to interact with the file system in a less restricted way. The Node fs core module is an API for interacting with the **f**ile **s**ystem. It was modeled after the <u>[POSIX](https://en.wikipedia.org/wiki/POSIX)</u> standard for interacting with the file system.
 <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     fs
 </span> provides multiple APIs for handling file data in different ways:
* a Callback API: methods that take error-first callback functions to handle file data asynchronously
* a Promises API: methods that return a Promise to handle file data asynchronously, via fs.promises, which can be used with async/await or .then()/.catch() syntax
* a Synchronous API: methods that synchronously handle file data

```
const { readFile } = require('fs');

let readDataCallback = (err, data) => {
  if (err) {
    console.log(`Something went wrong: ${err}`);
  } else {
    console.log(`Provided file contained: ${data}`);
  }
};

readFile('./file.txt', 'utf-8', readDataCallback);

```

Let’s walk through the example above:
* We destructure the readFile method from the fs module import (it is NOT globally available, so must be imported).
* We define an error-first callback function that expects an error to be passed as the first <u>[argument](https://www.codecademy.com/resources/docs/general/argument)</u> and data as the second. If an error is present, the function will print Something went wrong: ${err} — otherwise, it will print Provided file contained: ${data}.
* We invoke the .readFile() method with three arguments:
	* The first argument is a <u>[string](https://www.codecademy.com/resources/docs/general/data-types/string)</u> that contains a path to the file file.txt.
	* The second argument is a string specifying the file’s <u>[character encoding](https://en.wikipedia.org/wiki/Character_encoding)</u> (usually ‘utf-8’ for text files). Note that while this <u>[parameter](https://www.codecademy.com/resources/docs/general/parameter)</u> is optional, the default value is null, which yields the data as a Buffer. To get the data as text, we must specify 'utf-8'.
	* The third argument is the callback function to be invoked when the asynchronous task of reading from the file system is complete. Node will pass the contents of file.txt into the provided callback as its second argument.
Here’s how the same functionality would be implemented through the Promises API:

```
// shortcut for importing methods from the Promise API
const { readFile } = require('fs/promises');

readFile('./file.txt', 'utf-8')
  .then(data => {
    console.log(`Provided file contained: ${data}`);
  })
  .catch(err => {
    console.log(`Something went wrong: ${err}`);
  })

```

And using the Synchronous API:

```
const { readFileSync } = require('fs');

let data;
try {
  data = readFileSync('./file.txt', 'utf-8')
  console.log(`Provided file contained: ${data}`);
} catch (err) {
  console.log(`Something went wrong: ${err}`);
}

```


## **Readable Streams**
In more realistic scenarios, data isn’t processed all at once but rather sequentially, piece by piece, in what is known as a **stream**. Streaming data is often preferable since you don’t need enough RAM to process all the data at once nor do you need to have all the data on hand to begin processing it.
One of the simplest uses of streams is reading and writing to files line-by-line. To read files line-by-line, we can use the .createInterface() method from the readline core module. .createInterface() returns an EventEmitter set up to emit 'line' events:

```
const readline = require('readline');
const fs = require('fs');

const myInterface = readline.createInterface({
  input: fs.createReadStream('text.txt')
});

myInterface.on('line', (fileLine) => {
  console.log(`The line read: ${fileLine}`);
});

```

Let’s walk through this sample code:
* We import the readline and fs core modules
* We create a variable named myInterface and set it equal to the returned value from invoking readline.createInterface() with an object containing our designated input.
* We set our input to fs.createReadStream('text.txt'), which will create a stream that reads data from text.txt.
* Next, we assign a listener callback to execute when line events are emitted. A 'line' event will be emitted after each line from the file is read.
* Our listener callback will log to the console The line read: <FILE_LINE>, where <FILE_LINE> is the line just read.

## **Writeable Streams**
In the previous exercise, we were reading data from a stream, but we can also write to streams! We can create a writeable stream to a file using the fs.createWriteStream() method:

```
const fs = require('fs')

const fileStream = fs.createWriteStream('output.txt');

fileStream.write('This is the first line!\n'); 
fileStream.write('This is the second line!\n');
fileStream.end();

```

*Note: The* .write() *method does not add newline characters at the end of each line, so we made sure to insert them ourselves!*
In the code above, we set the output file as output.txt. Then we .write() lines to the file. Unlike a readable stream, which ends when it has no more data to read, a writable stream could remain open indefinitely. We can indicate the end of a writable stream with the .end() method.

## **The prompt-sync Module**
When writing JavaScript that runs in Node.js, it is sometimes useful to collect **input directly from the user**, in the same way that the browser’s  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     prompt()
 </span> function works. Unlike browsers, however, **Node.js does not natively provide a prompt API**.
To allow synchronous user input, we can use the third-party module  <span style="font-family: .AppleSystemUIFontMonospaced-Semibold; font-size: 12.0;">
     **prompt-sync**
 </span>.
 <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     prompt-sync
 </span> is a small utility that provides a **synchronous** prompt function for Node, allowing programs to pause and wait while the user types something into the terminal. This makes it especially helpful for command-line games, interactive scripts, or situations where asynchronous input (like  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     readline
 </span>) is not ideal.
Before using it, it must be installed:

```

npm install prompt-sync

```


### **Using prompt-sync**
Here’s the basic usage:

```
const prompt = require('prompt-sync')();
const name = prompt('What is your name? ');
console.log(`Hello, ${name}!`);

```


### **Importing the module**

```
const prompt = require('prompt-sync')();

```

* require('prompt-sync') **returns a function**.
* Immediately invoking that function (()) returns the **prompt function** that we will use to collect user input.
You can also pass an options object—for example, to enable Ctrl+C handling:

```
const prompt = require('prompt-sync')({ sigint: true });

```

With  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     sigint: true
 </span>, pressing **Ctrl+C** stops the script instead of printing  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     ^C
 </span>.

### **How the Prompt Function Works**
Once imported,  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     prompt()
 </span> behaves similarly to the browser’s  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     prompt()
 </span>:

```
const age = prompt("Enter your age: ");
console.log(`You are ${age} years old.`);

```

### 
### **Important Characteristics:**
* **Synchronous**: the program *stops and waits* for input.
* **Returns a string** (you must convert to numbers manually):

```
const number = Number(prompt('Enter a number: '));

```

* **Displays the provided text** as a message to the user.

### **Common Usage Examples:**
**Input validation**

```
let choice;
while (choice !== 'y' && choice !== 'n') {
  choice = prompt('Continue? (y/n): ');
}

```

**Reading numeric input**

```
const width = parseInt(prompt('Enter width: '), 10);

```

**Using options (e.g., enabling Ctrl+C exit)**

```
const prompt = require('prompt-sync')({ sigint: true });

```












