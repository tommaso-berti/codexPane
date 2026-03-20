# 0. Runtime environment


## Browser console
Along with HTML and CSS, JavaScript (JS) makes up one of the core languages in <u>[web development](https://www.codecademy.com/catalog/subject/web-development)</u>. JS code is normally added using the HTML <script> element for executing in web browsers, but most modern browsers also provide a console as part of their developer tools where we can directly write and run JS, typically for testing and debugging purposes. The console is essentially a REPL (<u>[Read-Evaluate-Print-Loop](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)</u>) that allows us to execute JS within the context of the page, such as modifying the page’s <u>[DOM (](https://www.codecademy.com/resources/blog/what-is-dom/)</u><u>[Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)</u>) or logging to the console. The console itself is also the place to view the messages that were logged by JS code, as well as any other information that the browser had documented, including network requests and security errors.Along with HTML and CSS, JavaScript (JS) makes up one of the core languages in <u>[web development](https://www.codecademy.com/catalog/subject/web-development)</u>. JS code is normally added using the HTML <script> element for executing in web browsers, but most modern browsers also provide a console as part of their developer tools where we can directly write and run JS, typically for testing and debugging purposes. The console is essentially a REPL (<u>[Read-Evaluate-Print-Loop](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)</u>) that allows us to execute JS within the context of the page, such as modifying the page’s <u>[DOM (](https://www.codecademy.com/resources/blog/what-is-dom/)</u><u>[Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)</u>) or logging to the console. The console itself is also the place to view the messages that were logged by JS code, as well as any other information that the browser had documented, including network requests and security errors.

clear() first to clear the console.


## **Runtime Environment**
A *runtime environment* is where your program will be executed. It determines what global objects your program can access and it can also impact how it runs. This article covers the two JavaScript runtime environments:
* the runtime environment of a browser (like <u>[Chrome](https://www.google.com/chrome/)</u>, or <u>[Firefox](https://www.mozilla.org/en-US/firefox/)</u>)
* the Node runtime environment

### **A Browser’s Runtime Environment**
The most common place where JavaScript code is executed is in a browser. For example, using any <u>[text editor](https://www.codecademy.com/articles/visual-studio-code)</u>, you could create a file on your own computer called **my_website.html** and put the following HTML code inside:

```
<!-- my_website.html -->
<html>
  <body>
    <h1> My Website </h1>
    <script> window.alert('Hello World'); </script>
  </body>
</html>

```

Save your file, then open your favorite browser. Most browsers will allow you to load websites that you have created locally by going to the menu File > Open File > **my_website.html**.
Upon loading, the embedded <script></script> will execute and the window.alert() method will create a pop-up box in your browser with the text "Hello World". How is this possible? Where did the window.alert() method come from and how can it control your browser?
The answer is that you are executing this code in the *browser’s runtime environment*. The <u>[window.alert()](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert)</u> method is built into this environment and any program executed in a browser has access to this method. In fact, the <u>[window](https://developer.mozilla.org/en-US/docs/Web/API/Window)</u> object provides access to a huge amount of data and functionality relating to the open browser window beyond just .alert().
Applications created for and executed in the browser are known as *front-end* applications. For a long time, JavaScript code could only be executed in a browser and was used exclusively for creating front-end applications. In order to create *back-end* applications that could run on a computer WITHOUT a browser, you would need to use other programming languages such as Java or PHP.


### **The Node Runtime Environment**
In 2009, the *Node runtime environment* was created for the purpose of executing JavaScript code without a browser, thus enabling programmers to create *full-stack* (front-end and back-end) applications using only the JavaScript language.
Node is an entirely different runtime environment, meaning that browser-environment data values and functions, like window.alert(), can’t be used. Instead, the Node runtime environment gives back-end applications access to a variety of features unavailable in a browser, such as access to the server’s file system, database, and network.
For example, suppose you created a file called **my-app.js**. We can check to see the directory that this file is located in using the Node runtime environment variable process:

```
// my-app.js
console.log(process.env.PWD);

```

*Notice that we are using* console.log *now instead of* window.alert() *since the* window *object isn’t available*
process is an object containing data relating to the JavaScript file being executed. process.env is an object containing environment variables such as process.env.PWD which contains the current working directory (and stands for “**P**rint **W**orking **D**irectory”).
To execute the JavaScript code in this file, first make sure that you have <u>[set up Node on your computer](https://www.codecademy.com/articles/setting-up-node-locally)</u>. Then, open up a <u>[terminal](https://www.codecademy.com/learn/learn-the-command-line)</u> and run the following command:

```
$ node my-app.js
/path/to/working/directory

```

The node command tells your computer to execute the my-app.js file in the Node environment. You can also use the node command without a file argument to open up the Node **R**ead-**E**val-**P**rint-**L**oop (REPL):

```
$ node
> process.env.HOME
'/home/ccuser'

```

