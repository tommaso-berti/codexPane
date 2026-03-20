# 3.2. Space Complexity


Asymptotic notation is often used to describe the runtime of a program or algorithm, but it can also be used to describe the space, or memory, that a program or algorithm will need.
Think about a simple function that takes in two numbers and returns their sum:

```
function addNumbers(a, b) {
  return a + b;
}

```

This function has a space complexity of  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     O(1)
 </span>, because the amount of space it needs will not change based on the input. While this function also has a constant runtime of  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     O(1)
 </span>, most functions do not have matching space and time complexities:

```
function simpleLoop(inputArray) {
  for (let i = 0; i < inputArray.length; i++) { 
    console.log(i);
  }
}

```

As we know, a simple  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     for
 </span> loop that goes through every element in an array of size n has a linear runtime of  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     O(n)
 </span>. However, this function takes  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     O(1)
 </span> space since no new variables are being created and therefore no more space must be allocated.
A recursive function that is passed the same array or object in each call doesn’t add to the space complexity if the array or object is passed by reference (which it is in JavaScript).
Like with time complexity, space complexity denotes space growth in relation to the input size. It’s also important to note that space complexity usually refers to any additional space that will be needed, and doesn’t count the space of the input. So a function could have 10 arrays passed into it, but if all it does inside is print  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     'Hello World!'
 </span>, then it still takes  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     O(1)
 </span> space.

Space complexity is important to consider alongside time complexity when comparing data structures and algorithms. While two functions may have very similar runtimes, one could use less space. Consider the  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     doubleArray()
 </span> function from above. It has a runtime of  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     O(n)
 </span>, and takes  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     O(n)
 </span> space. Could we optimize it to have a better space complexity?

```
function doubleInPlace(inputArray) { 
  for (let i = 0; i < inputArray.length; i++) {
    inputArray[i] *= 2;
  }
  return inputArray;
}


```

 <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     doubleInPlace()
 </span> does the same thing as  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     doubleArray()
 </span> and in the same amount of time, but only takes  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     O(1)
 </span> space, simply because it doesn’t create a new array. As you move forward, remember that just because a program has the best runtime possible, doesn’t mean it can’t still be optimized.
