# 2. Arrays


One way we can create an array is to use an *array literal*. An array literal creates an array by wrapping items in square brackets [].
Each element in an array has a numbered position known as its *index*. We can access individual items using their index, which is similar to referencing an item in a list based on the item’s position.
Arrays in JavaScript are *zero-indexed*, meaning the positions start counting from 0 rather than 1. Therefore, the first item in an array will be at position 0. Let’s see how we could access an element in an array:
cities[0] will access the element at index 0 in the array
You can also access individual characters in a string using bracket notation and the index. For instance, you can write:

```
const hello = 'Hello World';
console.log(hello[6]);
// Output: W

```

The console will display W since it is the character that is at index 6.
The line

```
seasons[3] = 'Autumn'; 

```

tells our program to change the item at index 3 of the seasons array to be 'Autumn' instead of what is already there.

Variables declared with the const keyword cannot be reassigned. However, elements in an array declared with const remain mutable. Meaning that we can change the contents of a const array, but cannot reassign a new array or a different value.

## Properties
One of an array’s built-in properties is length and it returns the number of items in the array

## Methods
.indexOf() - the indexOf() method of <u>[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)</u> instances returns the first index at which a given element can be found in the array, or -1 if it is not present.

```
const beasts = ["ant", "bison", "camel", "duck", "bison"];

console.log(beasts.indexOf("bison"));
// Expected output: 1

```


### Destructive
- One method, .push() allows us to add items to the end of an array. Here is an example of how this is used:
	.push() changes, or *mutates*, itemTracker. You might also see .push() referred to as a *destructive* array method since it changes the initial array.
- .pop() removes the last item of an array. If assigned to a variable, it returns the value of the last element removed.
- .splice(): Adding, removing, or replacing elements and returns an array of the deleted elements.
- .shift(): Removes the first element of an array
- .unshift(): Adds one or more elements to the beginning of an array

### Non-destructive
Does not modify the given array
* .join(): Creates a string by concatenating all elements of an array. 
* .slice(): Returns a shallow copy of a portion of the array in a new array. 
* .concat(): Returns a new array that is the combination of two or more arrays.

When you pass an array into a function, if the array is mutated inside the function, that change will be maintained outside the function as well. You might also see this concept explained as *pass-by-reference* since what we’re actually passing to the function is a reference to where the variable memory is stored and changing the memory.
