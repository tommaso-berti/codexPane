# 12. Creating a React App (using Vite)

# 12. **Creating a React App (using Vite)**

We’ve previously recommended using create-react-app (CRA) to bootstrap a React project. Since then, the React team has <u>[sunsetted](https://react.dev/blog/2025/02/14/sunsetting-create-react-app)</u> this tool. This article focuses on using <u>[Vite](https://vite.dev/)</u>, pronounced “veet”, the modern build tool that has become the preferred non-framework lightweight solution for React development.

## **Getting Ready**
To use Vite, you’ll need Node v18+ or 20+, so make sure to install the correct version before proceeding!
However, npm is separate from Node.js and tends to update more frequently. As a result, even if you’ve just installed Node (and therefore npm), it’s a good idea to update your npm. Luckily, npm knows how to update itself!
To upgrade to the latest version of npm on *nix (OSX, Linux, etc.), you can run this command in your terminal:

```
sudo npm install -g npm@latest

```


## **Setting Up the Boilerplate Application**
Using a build tool like Vite allows us to quickly generate a boilerplate React application with all the necessary configuration.
Using Vite provides several benefits:
* a consistent project structure you’ll recognize across different React projects
* an optimized build process out-of-the-box
* a fast development server with hot module replacement
* modern frontend tooling with minimal configuration
To create a new Vite project, you can use npm’s create command, which runs the <u>[create-vite](https://www.npmjs.com/package/create-vite)</u> package without installing it globally first. When you run the command, npm will ask for your permission to download and execute the package. This approach keeps your global dependencies clean and ensures you’re always using the latest version of the tool.

```
npm create vite@latest
```


```


```

After running the command, follow the interactive prompts:
* enter your project name (e.g., my-react-app)
* select React as your framework
* choose your preferred variant (JavaScript or TypeScript)
You can also specify these options directly in the command:

```
# npm
npm create vite@latest my-react-app -- --template react

```

Per creare la struttura React dentro a una cartella già esistente si può usare 

```
npm create vite@latest . -- --template react

```


**Recap**

```
> npx
> create-vite

│

```

 <span style="font-family: Menlo-Regular;">
     
```
◇
```


 </span>
```
  Project name:
│  my-react-app
│

```

 <span style="font-family: Menlo-Regular;">
     
```
◇
```


 </span>
```
  Select a framework:
│  React
│

```

 <span style="font-family: Menlo-Regular;">
     
```
◇
```


 </span>
```
  Select a variant:
│  JavaScript
│

```

 <span style="font-family: Menlo-Regular;">
     
```
◇
```


 </span>
```
  Scaffolding project in /Users/codecademy/Desktop/vite/my-react-app...
│
└  Done. Now run:

 cd my-react-app
 npm install
 npm run dev
```


```


```

Following the instructions, change directory into your project folder (cd my-react-app), then run the command to install your dependencies (npm install, yarn, or pnpm install).

## **React App Structure**

```
└── 
```

 <span style="font-family: .AppleColorEmojiUI;">
     
```
📁
```


 </span>
```
my-react-app
    ├── 
```

 <span style="font-family: .AppleColorEmojiUI;">
     
```
📁
```


 </span>
```
public
    │   └── vite.svg
    ├── 
```

 <span style="font-family: .AppleColorEmojiUI;">
     
```
📁
```


 </span>
```
src
    │   ├── App.css
    │   ├── App.jsx
    │   ├── 
```

 <span style="font-family: .AppleColorEmojiUI;">
     
```
📁
```


 </span>
```
assets
    │   │   └── react.svg
    │   ├── index.css
    │   └── main.jsx
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── vite.config.js
```


```


```

Vite uses a modern build system that transforms the directories and files here into optimized static assets. Visitors to your site are served those static assets.

### **Key Directories**
/node_modules
This directory contains all the dependencies and sub-dependencies specified in your package.json file. You don’t need to modify anything here, and it’s automatically added to .gitignore since these files don’t need to be committed to your repository.
/public
This directory contains static assets that will be served directly without being processed by Vite. Files in this directory will be copied to the build directory during production. It contains:
* vite.svg - The Vite logo, which you can replace with your own favicon.
/src
This is where your React application code lives and where you’ll spend most of your time. The initial structure includes:
* /assets - a directory for storing static assets like images that will be processed by Vite
* App.jsx - the main React component of your application
* App.css - styles for the App component
* main.jsx - the entry point for your React application (this file serves the same purpose as index.js or index.jsx in other React setups)
* index.css - global styles for your application
Note: Throughout Learn React, we’ll refer to index.jsx as the entry point file, which is common in many React projects. In Vite’s default template, this file is named main.jsx instead, but it serves the exact same purpose. If you prefer to follow the lessons exactly, you can rename main.jsx to index.jsx and update the script reference in index.html accordingly.
### 
### **Key Files**
index.html Located in the root directory, this HTML file serves as the entry point for your application. Vite injects your JavaScript into it during the build process. You can directly edit this file to add meta tags, change the page title, or include additional scripts or styles.
package.json This file outlines all the settings for your React app, including:
* dependencies required for the application
* scripts for development, building, and previewing your app
* other metadata about your project
Here, you’ll find important scripts like:
* dev: starts the development server
* build: creates a production-ready build
* preview: serves the production build locally for testing
vite.config.js This is the configuration file for Vite, where you can customize the build tool’s behavior. By default, it simply includes the React plugin, but you can extend it to add features like:
* alias paths for imports
* custom build options
* additional plugins
* proxy settings for API requests
eslint.config.js This file configures ESLint for your project, which helps catch errors and enforce code style. The Vite template comes with a basic configuration that extends the React recommended rules.
.gitignore This file tells Git which files and directories to ignore when committing code, such as node_modules, build directories, and environment files.
As your React app grows, it is common to add a /components directory to organize components and component-related files and a /views directory to organize React views and view-related files.

## **Starting the React App Development Server**

```
npm run dev

```

# 
## **React DevTools Sandbox**
**[React DevTools](https://react-devtools-tutorial.vercel.app/)**
The provided link goes directly to an online sandbox environment to use the basic features of React DevTools. This is helpful if you would like some hands-on guidance in using React DevTools.
Use this tool as a readily available resource for implementation help!
