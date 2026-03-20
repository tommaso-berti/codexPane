# 3. Loops

## 
## For loop
A for loop contains three expressions separated by ; inside the parentheses:
- an *initialization* starts the loop and can also be used to declare the iterator variable.
- a *stopping condition* is the condition that the iterator variable is evaluated against— if the condition evaluates to true the code block will run, and if it evaluates to false the code will stop.
- an *iteration statement* is used to update the iterator variable on each loop.

```
for (let counter = 0; counter < 4; counter++) {
  console.log(counter);
}

```


## **for…of loop**
The for...of statement executes a loop that operates on a sequence of values sourced from an <u>[iterable object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol)</u>. Iterable objects include instances of built-ins such as <u>[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)</u>, <u>[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)</u>, <u>[TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)</u>, <u>[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)</u>, <u>[Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)</u>, <u>[NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)</u> (and other DOM collections), as well as the <u>[arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)</u> object, <u>[generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)</u> produced by <u>[generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)</u>, and user-defined iterables.

```
const hobbies = ['singing', 'eating', 'quidditch', 'writing'];
for (const hobby of hobbies) {
  console.log(`I enjoy ${hobby}.`);
}

```


## While loop
The syntax of a while loop is ideal when we don’t know in advance how many times the loop should run.

```
let counterTwo = 1;
while (counterTwo < 4) {
  console.log(counterTwo);
  counterTwo++;
}

```


## Do…while
In some cases, you want a piece of code to run at least once and then loop based on a specific condition after its initial run. This is where the do...while statement comes in.

```
let countString = '';
let i = 0;

do {
  countString = countString + i;
  i++;
} while (i < 5);

console.log(countString);

```

Note that the while and do...while loop are different! Unlike the while loop, do...while will run at least once whether or not the condition evaluates to true.

## Break
The break keyword allows programs to “break” out of the loop from within the loop’s block. Useful when we need the loop to stop early if a certain condition is met

```
for (let i = 0; i < 99; i++) {
  if (i > 2 ) {
     break;
  }
  console.log('Banana.');
}

console.log('Orange you glad I broke out the loop!');

```


## Continue
The continue statement is used to skip one iteration of the loop.

```
const strangeBirds = ['Shoebill', 'Cockatrice', 'Basan', 'Cow', 'Terrorbird', 'Parotia', 'Kakapo'];
for (const bird of strangeBirds) {
  if  (bird === 'Cow'){
    continue;
  }
  console.log(bird);
}

//results
Shoebill
Cockatrice
Basan
Terrorbird
Parotia
Kakapo

```



