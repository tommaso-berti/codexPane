# 5. Managing Environment Variables, API Keys, and Files in Node.js

# 5. **Managing Environment Variables, API Keys, and Files in Node.js**

## **Environment Variables**
An *environment variable* is no different than other <u>[variables](https://www.codecademy.com/resources/docs/general/julia/variables)</u> we use while programming. It is used to store information we want to reference in a program. The only difference is that it’s a key-value pair whose value is set and stored outside a program, usually by the operating system or the production environment. Environment variables can prevent the secret development keys and passwords from getting out. They also reward us with more efficient coding in the long run. Take a look at some example environment variables below:

```
DB_HOST=123.45.678.90
DB_USER=root
DB_PASS=123456
API_KEY=V3rYPubl1cK3y

```

Be wary that environment variables are not recommended for every situation because they are global variables. On a large-scale application, global variables can be hard to keep track of. We will introduce the main use cases and best practices for environment variables.

## **Environment Variables vs Config Variables**
Environment variables and config variables share some similarities; choosing one comes down to the developer’s preference and environment. While a <u>**[config.json](https://www.npmjs.com/package/config)**</u> file allows us to have a greater variety of <u>[data types](https://www.codecademy.com/resources/docs/general/data-types)</u> and complex <u>[data structures](https://www.codecademy.com/resources/docs/general/data-structures)</u>, the data in a **.env** file is generally more intelligible. Moreover, some online hosting platforms natively support environment variables. At the end of the day, they both accomplish the same purpose: keeping your information secure.

## **Create an Environment Variable**
We must initialize them in a file called **.env** (note the dot in the beginning). We can create this file by running the command  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     touch .env
 </span>.
In **.env**, one environment variable is written per line and follows the format:  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     NAME=VALUE
 </span>. Lines starting with  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     #
 </span> are treated as comments. Each word in an environment variable is capitalized and is separated by a non-space character. By convention, words are separated by an underscore  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     _
 </span>.

## **Import Environment Variables using dotenv**
[https://github.com/motdotla/dotenv#readme](https://github.com/motdotla/dotenv#readme)
<u>[Node.js](https://www.codecademy.com/resources/docs/general/node-js)</u>  stores all the environment <u>[variables](https://www.codecademy.com/resources/docs/general/julia/variables)</u> into a global variable called  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     process.env
 </span>. We can use a npm package called <u>[dotenv](https://www.npmjs.com/package/dotenv)</u> to load all our environment variables from **.env** to  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     process.env
 </span>, allowing us to access them in our program.
You’d normally have to use the command  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     npm install dotenv
 </span> to install the dotenv package. Since we already have it installed, we will skip this step. To load the environment variables from  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     .env
 </span>, we can do this in our JavaScript file:

```
// Imports the npm package
import dotenv from "dotenv"; 
// Loads environment variables into process.env
dotenv.config(); 

Copy to Clipboard

```

 <span style="text-align: center;">
     
```


```


 </span>We can then use the  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     process.env
 </span> variable to access all the environment variables available to us. Note that all environment variables will be imported as strings.

```
// Prints “Sonia Kaur”
console.log(process.env.ADMIN_NAME); 
// Prints “admin#1337”
console.log(process.env.ADMIN_USERNAME); 

```

**Use Case: Database Credentials**
Hiding database credentials is one of the most common and important use cases for environment variables. Whether the database is hosted online or locally, it is generally a good idea to keep database credentials in the .env file rather than hard-coding it. This ensures our database is not exposed on accidental pushes to a git repository and allows for quick configuration when distributing or deploying our project on a different environment.

While the credentials may differ depending on the database, the following are typically present in each database:
* Host IP address
* Port
* Username
* Password

### **Use Case: API Keys**
Another important and common use case of environment <u>[variables](https://www.codecademy.com/resources/docs/general/julia/variables)</u> is <u>[API](https://www.codecademy.com/resources/docs/general/api)</u>  keys. An *API* key is a unique identifier used to authenticate a user or most commonly, an application, to specific software.

### **.gitignore**
We need to handle **.env** files with care and uploading them to a public repository is not the way to go. It’s easy to accidentally stage our **.env** file and push it to our remote Github repository.
This is where we can take advantage of <u>**[.gitignore](https://git-scm.com/docs/gitignore)**</u>. **.gitignore** is a plain text file just like **.env**. In **.gitignore**, each line corresponds to a file, directory, or pattern we would like to ignore when staging. This means those files won’t be pushed to our <u>[GitHub](https://www.codecademy.com/resources/docs/general/github)</u> repository where other developers might see them.
In **.gitignore**, we can add the name of the file we’d like to ignore like so:

```
# Windows OS file
thumbs.db

# macOS OS metafile
.DS_Store

```

We can ignore directories the same way. Writing node_modules/ in **.gitignore** will ignore all directories with the name, **node_modules**, and all subdirectories and files inside them. The forward slash / is necessary to just ignore directories. Otherwise, it will ignore files named **node_modules** as well.
We can also use regular expression patterns in **.gitignore** to ignore types of files.

### **Environment Variables and Project Collaboration**
What can we do if we are working as part of a team or we want to share our project with others without revealing the sensitive information in our environment variables?
The best practice here is to include a sample **.env** file in the public repository as a template for the next person. This would usually be named **sample.env** or **example.env**. This file contains the names of all the environment <u>[variables](https://www.codecademy.com/resources/docs/general/julia/variables)</u> we need to run a project but their values are empty.
Writing comments to explain each variable is recommended and it helps to group related variables. Other developers can simply add their credentials and rename this file to **.env**. Take a look at the **example.env** file in the workspace.
It’s also best practice to provide instructions for obtaining someone’s own credentials or <u>[API](https://www.codecademy.com/resources/docs/general/api)</u> keys in the project **README.md** file. Take a look at the **README.md** in the workspace for an example.









































