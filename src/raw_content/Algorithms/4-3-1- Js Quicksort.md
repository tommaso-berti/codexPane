# 4.3.1. Js Quicksort


Like merge sort, the input <u>[array](https://www.codecademy.com/resources/docs/general/data-structures/array)</u> is partitioned into smaller parts and then combined after the elements have been rearranged. Unlike merge sort, which requires additional memory for auxiliary arrays, quicksort is space-saving because it deploys in-place sorting.

As <u>[runtime](https://www.codecademy.com/resources/docs/general/runtime)</u> performance goes, quicksort requires more comparisons to sort a larger input than mergesort. Like <u>[bubble sort](https://www.codecademy.com/resources/docs/general/algorithm/bubble-sort)</u>, quicksort has a worst-case runtime of  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     O(N^2)
 </span>. This can happen when QuickSort’s input data set comprises:
* pre-sorted numbers
* backward-sorted numbers
* all similar elements along with a poorly chosen pivot element that produces a partition of zero or one element
On average, like merge sort, the runtime of quicksort is O(N * log N) if partition sizes are roughly equal.

The basic idea of the quicksort algorithm is to:
* Split the initial unsorted data set into a left partition and a right partition.
* Sort each partition recursively until there is only one element left.
* Return the sorted array.

We use a pivot element to divide our unsorted array into two parts. The elements in these parts must meet these conditions after partitioning:
* All elements in the left partition must be less than or equal to the pivot element.
* All elements in the right partition must be greater than or equal to the pivot element.
Determining the pivot <u>[index](https://www.codecademy.com/resources/docs/general/database/index)</u> is done through a procedure called partitioning. Our algorithm uses an array to store the dataset and stipulates the boundary of the dataset with left and right pointers. 
The <u>[pseudocode](https://www.codecademy.com/resources/docs/general/pseudocode)</u> for our quicksort algorithm is as follows:

```
If there is more than one element left in the array:
  Find the pivot index through partitioning

  If the left pointer is less than the pivot index:
    Call quicksort() on the portion of the array between the left pointer and the pivot. 

  If the pivot index is less than the right pointer:
    Call quicksort() on the portion of the array between the pivot index and the right pointer.

Return the sorted array

```


## **Partitioning - The Pivot Element**
This procedure utilizes two internal indices,  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     leftIndex
 </span> and  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     rightIndex
 </span> that move in opposite directions. These indices are used for:
* computing the pivot element
* comparing the elements located at each index with the pivot element
* determining the pivot index, the desired location of the pivot element in the set after elements have been swapped, if any
The basic idea of partitioning is as follows:
* Start with the middle element
* While you haven’t looked through the whole array (leftIndex is still < rightIndex)
	* Move leftIndex up until you find something greater than the pivot.
	* Move rightIndex down until you find something less than the pivot.
	* Swap those elements and move the indices in by one step to continue checking if swaps are necessary.
* Return the last left element index
An initial pivot element can be arbitrarily chosen at the beginning of the partitioning process to be one of the following by default:
* first element of the array
* last element of the array
* middle element of the array
* random element of the array
The final location of the pivot element will be determined at the end of the partitioning process.
In some quicksort implementations, the first or last element is commonly picked as the pivot element. In our JavaScript implementation, we will use the middle element instead because it provides a better average runtime. To do this, we will need both  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     leftIndex
 </span> and  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     rightIndex
 </span>.

```
pivot = the average of the sum of leftIndex and rightIndex rounded down 

```

## 
## **Partitioning - The Left and Right Indices**
The leftIndex and rightIndex of a set or subset are going to set the bounds of the partition. For the first iteration, both indices mark the entire span of the original data set. In the following illustrations, L and R represent leftIndex and rightIndex respectively.

```
[ 3, 1, 4, 2, 8, 9 ]
  L     P        R

```

The pivot element for this set will be 4 as it is located near the halfpoint of the data set, as indicated by P.
Next, we want to compare the element at leftIndex with the pivot element, 4. As long as it is less than the pivot, meaning that it is in the correct half of the partition, we want to move the leftIndex forward one step to the right.

```
3 < 4, move L forward
[ 3, 1, 4, 2, 8, 9 ]
     L  P        R
1 < 4, move L forward
[ 3, 1, 4, 2, 8, 9 ]
        L        R
        P
4 = 4, stop

```

We stop leftIndex at position 2 because the element at <u>[index](https://www.codecademy.com/resources/docs/general/database/index)</u> 2 (4) is not less than the pivot element 4. Next, we switch focus to the rightIndex and compare the element at rightIndex with the pivot element, 4. As long as it is greater than the pivot, we want to move the rightIndex backward one step to the left.

```
[ 3, 1, 4, 2, 8, 9 ]
        L        R
        P
9 > 4, move R backward
[ 3, 1, 4, 2, 8, 9 ]
        L     R
        P
8 > 4, move R backward
[ 3, 1, 4, 2, 8, 9 ]
        L  R
        P
2 < 4, stop

```

We stop the rightIndex at position 3 because the element at 3 (2) is not greater than the pivot element 4. This tells us that 2 does not belong in its current position because it should be on the left of the pivot element 4. In this case, we need to swap the elements at leftIndex and rightIndex.

## Partitioning - Swapping
Recall that our leftIndex and rightIndex were at 2 and 3 respectively. They cannot move any further because their respective elements are greater than or less than the pivot element. When this happens, we need to swap those elements so that they will end up on the correct side of the partition.

```
[ 3, 1, 4, 2, 8, 9 ]
        L  R
        P
swap 4 and 2
[ 3, 1, 2, 4, 8, 9 ]
        L  R
        P

```

After we swap them, we move L forward and R backward.

```
Move L forward and R backward
[ 3, 1, 2, 4, 8, 9 ]
        R  L
        P

```

We return to our outer while loop condition to check if leftIndex (3) is less than or equal to rightIndex (2). In this case, 3 > 2, so we exit the while loop.
At this juncture, the elements that are less than the pivot are to the left of it and the elements that are greater than the pivot are to the right of it. We can stop partitioning and return the leftIndex which points to the pivot element 4. Hence, our pivot <u>[index](https://www.codecademy.com/resources/docs/general/database/index)</u> is 3 which is also the leftIndex.

## Recursive Quicksort
Now that we have finished implementing  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     partition()
 </span>, let’s implement the  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     quicksort()
 </span> function, which is recursive. This function takes in three parameters:
* Input array
* Left pointer
* Right pointer
The base case for this function is when the <u>[array](https://www.codecademy.com/resources/docs/general/data-structures/array)</u> has one element, meaning that it is sorted. As a result, the array is returned. Our JavaScript implementation does in-place sorting, hence, the array size does not change. A one-element array is symbolized by both left and right pointers pointing to the same element.

Our  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     quicksort()
 </span> function will start by calling the  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     partition()
 </span> function with the input array bounded by the left and right pointers as long as the left pointer is less than the right pointer.
The recursive steps are executed after partitioning:
* Call quicksort() to process only the left partition bounded by the left pointer and (pivot <u>[index](https://www.codecademy.com/resources/docs/general/database/index)</u> - 1) to exclude the pivot element from the left partition.
* Call quicksort() to process only the right partition bounded by the pivot index and the right pointer.
Continuing from the example in the last exercise, recall that we returned a pivot index, P, that points to pivot element  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     4
 </span> at index  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     3
 </span> as pointed to by L.

```
[ 3, 1, 2, 4, 8, 9 ]
        R  L
           P

```

Recall that the initial left pointer, which we will call  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     leftBound
 </span>, is  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     0
 </span> and the initial right pointer,  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     rightBound
 </span>, is  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     5
 </span>.
Recursively call  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     quicksort()
 </span> with the array  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     [ 3, 1, 2, 4, 8, 9 ]
 </span>, left pointer  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     0
 </span> and right pointer  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     2
 </span> for the left partition  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     [ 3, 1, 2 ]
 </span> which excludes the pivot index,  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     3
 </span>.
Similarly, we will recursively call  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     quicksort()
 </span> with the array  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     [ 3, 1, 2, 4, 8, 9 ]
 </span>, left pointer  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     3
 </span> and right pointer  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     5
 </span> for the right partition  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     [ 4, 8, 9 ]
 </span> which includes the pivot index,  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     3
 </span>.

### Full example

```
const swap = require('./swap');

const quicksort = () => {

}

const partition = (array, leftIndex, rightIndex) => {
  const pivot = array[Math.floor((rightIndex + leftIndex) / 2)];
  while (leftIndex <= rightIndex) {
    while (array[leftIndex] < pivot) {
      leftIndex++;
    }
    while (array[rightIndex] > pivot) {
      rightIndex--;
    }
    if (leftIndex <= rightIndex) {
      swap(array, leftIndex, rightIndex);
      leftIndex++;
      rightIndex--;
    }
  }
  return leftIndex;
}

module.exports = {
  partition,
  quicksort
};

```





















































