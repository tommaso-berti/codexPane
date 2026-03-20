# 3. Hoisting


During the compilation phase of code execution, the JavaScript engine allocates memory to save the names of declared variables and functions by *hoisting* variable and function declarations to the top of their current scope.
Hoisting does not actually move your code around; instead, it:
* Finds all of the variable and function declarations in the code
* ‘Raises’ the variable names and function declarations to the top of their scope before code execution
* Immediately initializes function declarations
* Postpones handling *initialization*, or assignment of values, until the code is executed

## let and const

let and const differ from var in how they initialize as well; while the names are hoisted, they are not initialized. So calling a variable in your code before it is initialized results in a ReferenceError. This is one of the reasons let and const are preferable, as a ReferenceError will immediately alert you to the problem in your code. With var variables, you would need to implement unit tests to handle undefined values.