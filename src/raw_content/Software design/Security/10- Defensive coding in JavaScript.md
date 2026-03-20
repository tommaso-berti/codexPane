# 10. Defensive coding in JavaScript


## **The eval method: Dangers and Alternatives**
The <u>[eval()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval)</u> function in JavaScript takes a <u>[string](https://www.codecademy.com/resources/docs/general/data-types/string)</u> as an <u>[argument](https://www.codecademy.com/resources/docs/general/argument)</u> and executes it as Javascript source code. Consider the following examples:

```
// This user input causes an infinite loop to run
const user_input = "while(true) ;";
eval(user_input);

// This user input closes the application
const user_input = "process.exit(0)";
eval(user_input);

```

The functions, setInterval(), setTimeout(), and new Function() use eval() in their implementations, and should be used with the same caution.

We might be able to mitigate this risk with npm packages like <u>[safe-eval](https://www.npmjs.com/package/safe-eval)</u> and <u>[expression-eval](https://www.npmjs.com/package/expression-eval)</u>. Both allow us to limit which methods and properties are available to eval(). Strings passed to safe-eval must be an expression, not a statement. This prevents injected code from being executed. The code below, for example, will throw an error since it does not have access to the process object.

```
// Using safeEval will throw an error
const user_input = "process.exit(0)";
safeEval(user_input);

```

Best practices with  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     eval
 </span> are:
* Avoid using it altogether!
* If you must use it, use a safer version, and only allow trusted, non-user input.

## **The exec method: Dangers and Alternatives**
The exec() method takes a <u>[string](https://www.codecademy.com/resources/docs/general/data-types/string)</u> as an <u>[argument](https://www.codecademy.com/resources/docs/general/argument)</u> and runs it as a shell command, enabling shell syntax within JavaScript. The danger is that unrestricted commands can access, modify, and delete files. For example:

```
user_input = "cat *.js";
exec(user_input);

```

 <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     exec()
 </span>, combined with the user input above, allows an attacker to print out all the JavaScript files in the current directory.
The <u>[execFile()](https://nodejs.org/api/child_process.html#child_process_child_process_execfile_file_args_options_callback)</u> method is an alternative that works similarly to exec() but requires separation of the commands and its arguments. This prevents piped commands and path variable access. Consider the following example:

```
import { exec, execFile } from "child_process";

// Spawns a shell with the input as is
exec("ls -lah /tmp");

// Requires a command and specified arguments to execute
execFile("ls", ["-lah", "/tmp"]);

```

The arguments for the command ls must be separated in the execFile() method call. This separation ensures that an attacker cannot inject their malicious commands. Whereas exec will allow for additional unintended commands in the input, execFile will detect an error.

## **Dangers and Secure Use of the fs Module**
The file system, or fs, module in Node.js enables file system operations. It gives us access to methods like:
* chmod() to change file permissions
* mkdir() to create directories
* rmdir() to delete directories
And many more
The fs module coupled with improperly sanitized user input gives attackers access to our entire file system and exposes it to path traversal and file inclusion vulnerabilities. Take a look at the code below:

```
const user_input = "./example.txt";
fs.unlinkSync(user_input);

```

The above example uses unlink() to delete the file defined by the user’s input. It could be any file on our system! To mitigate the risk, we can tweak our code to restrict traversal <u>[scope](https://www.codecademy.com/resources/docs/general/scope)</u> to a directory of our choice:

```
const user_input = "example.txt"
const root_directory = process.cwd();   // Hard-code path to restrict scope
const filePath = path.join(root_directory , fileName);
fs.unlinkSync(filePath);

```

We use the join() <u>[method](https://www.codecademy.com/resources/docs/general/method)</u> of the path variable to combine our desired directory with the user-provided file name. Hiding the directory the <u>[server](https://www.codecademy.com/resources/docs/general/server)</u> is operating on makes it tougher to reach valuable information.

## **Dangers and Secure Use of Regular Expressions**
<u>[Regular Expressions](https://en.wikipedia.org/wiki/Regular_expression)</u> are used in almost every single programming language to validate whether user input adheres to an expected condition. Attackers can make use of insecure regex expressions to trigger a <u>[Regular expression Denial of Service](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)</u> (ReDoS).
The RegEx engine can take a large amount of time on poorly defined Regex expressions. Consider the RegEx ([0-9]+)+\#. The table below shows how the number of backtracking steps increases exponentially as the location of the unmatched character increases.
| String               | Number of Digits     | Number of Steps      |
|----------------------|----------------------|----------------------|
| 123#                 | 3                    | 6                    |
| 123456789123456789…# | 180                  | 6                    |
| 1c#                  | 1                    | 5                    |
| 1234567o#            | 7                    | 755                  |
| 123456789123456d#    | 15                   | 196587               |
| 1234567891234567e#   | 16                   | TIMEOUT ERROR        |

To prevent this danger, we can use the <u>[validator](https://www.npmjs.com/package/validator)</u> npm package. It provides a library of <u>[string](https://www.codecademy.com/resources/docs/general/data-types/string)</u> validators and sanitizers for things like IP addresses, emails, and phone numbers. For Regex expression we must write ourselves, we can use tools like the <u>[safe-regex](https://www.npmjs.com/package/safe-regex)</u> npm package to detect dangerous regular expressions.

## **Secure Your Code: Strict Mode**
Using <u>[strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)</u> throws errors that would otherwise be silent, which can help reveal vulnerabilities. To invoke strict mode, simply put "use strict"; in single or double quotes on top of your JavaScript file.
For example, strict mode catches assignments to undefined variables:

```
// Runs fine without strict mode
x = "codecademy";

// Throws “ReferenceError” with strict mode
"use strict";
x = "codecademy";

// Runs fine with strict mode if the variable is declared with let, var, or const
"use strict";
var x = "codecademy";

```


## **Secure Your Code: Static Code Analysis**
<u>[Static Code Analysis](https://en.wikipedia.org/wiki/Static_program_analysis)</u> evaluates a code without executing it. A <u>[lint](https://en.wikipedia.org/wiki/Lint_(software))</u>, or linter, is a static code analysis tool used to improve source code by finding and flagging programming errors, bugs, and patterns that may compromise security. Some of the most popular JavaScript linters are:
* <u>[ESLint](https://eslint.org/)</u><u>[JSLint](https://www.jslint.com/)</u><u>[JSHint](https://jshint.com/)</u>We can customize the linter rules to fit our needs using configuration files or third-party plugins.  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     <u>[eslint-plugin-security](https://www.npmjs.com/package/eslint-plugin-security)</u>
 </span> is a plugin that adds rules to detect several security vulnerabilities including all of the aforementioned security risks in this lesson.





































