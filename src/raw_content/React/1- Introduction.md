# 1. Introduction


# **Web Apps**
A web application is an application software that does not require installation and can instead be accessed from a remote server via web browser. Web applications are made for interaction, allowing users to send and consume data between the browser and the web server. This interaction can be as simple as logging in to an account, or as complex as making a payment with your credit card.
If a website could be said to be defined by its content, then a web application would be defined by its interaction with the user. As such, web applications are significantly more complicated than static websites, both in general architecture and features.

## **Architecture**
In order to facilitate this complex flow of data, web applications are usually designed with different layers. The most common design paradigm is a three-layered design consisting of a presentation layer (web browser), application layer (server), and storage layer (database). In this system, the presentation layer is responsible for relaying user data to the application layer, which can process that data and do any number of things, including passing it to the storage layer for “safe-keeping.”
Many times, web applications can grow to be very complex. In these cases, a three-layered design may fall short. This may necessitate the introduction of additional layers to handle this complexity. For instance, the introduction of an integration layer between the application and storage layers can help provide a uniform interface for data access, allowing the application layer to be insulated from changes that occur to the storage layer implementation.
If you’re interested in learning more about the technology that’s behind your favorite web applications, install the <u>[Wappalyzer chrome extension](https://www.wappalyzer.com/)</u>. If you navigate to a site, you can click on it and it will give you a list of the different technologies used to build it.

## **Multi-Page Applications**
Whether talking about delivering content through static websites or interactivity through web applications, the article is referring to a multi-page file structure that lives on a server. Each time new data is needed for the browser view, a request is sent to the server, which returns a new set of page files. For a static website, this approach is generally fine, but web applications that require faster and more complicated interaction sometimes struggle to keep up.

## **SPA (Single-Page Application)**
SPAs combine the content of traditional websites with the smooth user experience of mobile applications. Learning to develop and maintain SPAs is an exciting venture that challenges developers to improve the web experience for users all over the world.
The name single-page application generally refers to the application consisting of one page that is constantly updated by JavaScript. Requests to the server are now quicker since they contain just the data needed to update the view. SPAs are full applications, running in the browser yet still connected to a server to update any application data.
The file stays constant while logic from the client-side JavaScript changes only what is needed to update the view. Requests for data are retrieved a lot quicker than files that need to be processed on a server and then rendered in the browser. SPAs focus on speed when it comes to user interaction and browser rendering times.
### 
### **SPA Frameworks**
In practice, the complexity of SPAs scales rapidly so just using JavaScript is not recommended. Luckily, there are several tools available to help with the creation of a SPA. These tools help with many tasks from controlling the view of the page to managing the application build.
* <u>[React](https://reactjs.org/)</u> is a popular JavaScript library for building single-page applications. It focuses on creating components that can render themselves differently based on an application’s current state and user data.
* <u>[Vue.js](https://vuejs.org/)</u> is a framework that uses templating within a single HTML file while the application logic controls what is rendered. This approach is sometimes thought to be more traditional and therefore easier to learn.
* Other libraries and frameworks include <u>[AngularJS](https://angular.io/)</u>, <u>[Ember.js](https://emberjs.com/)</u>, <u>[ExtJS](https://www.sencha.com/products/extjs/)</u>, <u>[Knockout.js](https://knockoutjs.com/)</u>, and <u>[Meteor.js](https://www.meteor.com/)</u>. While all of these share similar goals, they each take different approaches to building SPAs.
### 
### **SPA Pros and Cons**
### **Pros**
* SPAs are fast. The main selling point of a SPA is that it feels like a desktop or mobile application. By eliminating requests for new files and only relying on smaller amounts of data from the server, SPAs provide a real-time interface with their users.
* Reuse of code is a big bonus when using SPAs because it saves time within a project and across multiple projects. Many SPA libraries and frameworks advise that components be general enough that they can be reused from project to project.
* SPAs provide an easier path to migrate code to a mobile application. With a SPA, the back-end of the application feeds data to the decoupled front-end interface. This separation of tasks allows the creation of a mobile app UI while maintaining the back-end logic of the application.
### Cons
* SPAs require more files to run at startup so the load time of the application can be longer. This is something to consider if a user will not want to visit a site that takes too long to load. SPA load time can be minimized through strategically loading resources throughout the run of an application.
* Search Engine Optimization (SEO) has some pitfalls when it comes to SPAs. Search engines, like Google or DuckDuckGo, index pages of a website to rank the content. This can be difficult with only one page that may not have content until it is loaded by JavaScript. SEO is an ever-changing world so strategies already exist to mitigate these downsides.
* SPAs may not function as expected within the browser. For example, the back button or browsing history can act differently while using a single-page application. This can be frustrating for users who are expecting certain functionality within their browsers.


