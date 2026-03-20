# 1.1. Js Binary search


## **Finding the Middle Index**
A key step in each <u>[binary search](https://www.codecademy.com/resources/docs/general/algorithm/binary-search)</u> iteration is to find the middle value of the current list context. In practice, we do this by tracking the first and last indices, then finding their average.
The first <u>[index](https://www.codecademy.com/resources/docs/general/database/index)</u> we check will always be the middle value of the original list. Because of this, we start by setting the following first (left) and last (right) indices. Below, we show a 
<u>[pseudocode](https://www.codecademy.com/resources/docs/general/pseudocode)</u> example of how to set these <u>[variables](https://www.codecademy.com/resources/docs/general/julia/variables)</u>.

```
function binarySearch (arr, target)
  left = 0
  right = length of arr
  . . .

```

Because we pass in an <u>[array](https://www.codecademy.com/resources/docs/general/data-structures/array)</u> of length  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     11
 </span>, the  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     right
 </span> variable is set to  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     11
 </span>.
Next, we calculate the middle index of the array:

```
function binarySearch (arr, target)
  left = 0
  right = length of arr

  indexToCheck = the floor integer of (left + right) / 2
  . . .

```

The above function will calculate the middle index of the array by calculating the average of  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     right
 </span> and  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     left
 </span> and rounding it to the floor integer.
So, the first index the function checks is  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     5
 </span>.

## **Checking the Middle Index**
Below, we use <u>[pseudocode](https://www.codecademy.com/resources/docs/general/pseudocode)</u> to display two additional steps that will check if the  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     target
 </span> value is found.

```
function binarySearch (arr, target)
  left = 0
  right = length of arr

  indexToCheck = the floor integer of (left + right) / 2
    
  checking = value of arr at indexToCheck

  if checking is the target
    return indexToCheck

```

In the example above, we set a variable called  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     checking
 </span> to the value in  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     arr
 </span> at the position  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     indexToCheck
 </span>. Then, we return the <u>[index](https://www.codecademy.com/resources/docs/general/database/index)</u> if it is equal to the target value.

## **Iterative Checking**
Let’s consider how to extend the function to iteratively check sublists when the middle value is not equal to target.
Remember, in our <u>[algorithm](https://www.codecademy.com/resources/docs/general/algorithm)</u>, the function continues to execute until the left and right indices converge or the target is found. In practice, we can implement this with the following  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     while
 </span> condition.

```
while right is greater than left
 indexToCheck = the floor integer of (left + right) / 2
 checking = value of arr at indexToCheck

 if checking is the target
   then return indexToCheck

```

Unfortunately, the above code will execute infinitely because our right and left <u>[variables](https://www.codecademy.com/resources/docs/general/julia/variables)</u> do not converge from one iteration to the next. To address this issue, in addition to checking if the current value is the target value, we need to adjust the  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     right
 </span> or  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     left
 </span> index with each iteration.

```
while right is greater than left
  indexToCheck = the floor integer of (left + right) / 2 
  checking = value of arr at indexToCheck

  if checking is the target
    then return indexToCheck
  if target is greater than checking
    then set left to indexToCheck + 1
  else
    set right to indexToCheck

```

In the above code, we set the left or right index to a new value based on whether target is greater than or less than checking. The above while loop will continue to execute until the left index is greater than the right index.

### Full example

```
const binarySearch = (arr, target) => {
  let left = 0;
  let right = arr.length;
  
  while (right > left) {
    const indexToCheck = Math.floor((left + right) / 2);
    const checking = arr[indexToCheck];
    console.log(`indexToCheck equals: ${indexToCheck}`)
  
    if (checking === target) {
      return indexToCheck;
    } else if (target > checking) {
      left = indexToCheck + 1;
    } else {
      right = indexToCheck;
    }
  }
  return null;
}

const searchable = [1, 2, 7, 8, 22, 28, 41, 58, 67, 71, 94];
const target = 2;

const targetIndex = binarySearch(searchable, target);

console.log(`The target index is ${targetIndex}.`);

module.exports = {binarySearch};

```

