# 1. The Node REPL

[https://nodejs.org/docs/latest/api/](https://nodejs.org/docs/latest/api/)

[REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) is an abbreviation for read–eval–print loop. It’s a program that loops, or repeatedly cycles, through three different states: a read state where the program reads input from a user, the eval state where the program evaluates the user’s input, and the print state where the program prints out its evaluation to a console. Then it loops through these states again.
When you install Node, it comes with a built-in JavaScript REPL. You can access the REPL by typing the command node (with nothing after it) into the terminal and hitting enter. A > character will show up in the terminal, indicating the REPL is running and prompting your input. The Node REPL will evaluate your input line by line.
# 
The Node environment contains a number of Node-specific global elements in addition to those <u>[built into the JavaScript language](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)</u>. Every Node-specific global property sits inside the <u>[the Node ](https://nodejs.org/api/globals.html)</u> <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     <u>[global](https://nodejs.org/api/globals.html)</u>
 </span><u>[ object](https://nodejs.org/api/globals.html)</u>. This object contains a number of useful properties and methods that are available anywhere in the Node environment.

```
console.log(global)

```


## **Running a Program with Node**
Node was designed with server-side web development in mind and has a lot of thoughtful functionality towards that end. At its most simple, however, it provides the ability to run JavaScript programs on our own computers instead of just in the browser’s console or embedded in HTML.

```
// Inside myProgram.js
console.log('Hello World');

```

To execute the program

```
$ node myProgram.js

```



































