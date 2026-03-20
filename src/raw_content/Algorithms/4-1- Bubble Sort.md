# 4.1. Bubble Sort


Bubble sort is an introductory sorting algorithm that iterates through a list and compares pairings of adjacent elements.
According to the sorting criteria, the algorithm swaps elements to shift elements towards the beginning or end of the list.
By default, a list is sorted if for any element  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     e
 </span> and position  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     1
 </span> through  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     N
 </span>:
 <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     e1
 </span> <=  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     e2
 </span> <=  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     e3
 </span> …  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     eN
 </span>, where  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     N
 </span> is the number of elements in the list.
For example, bubble sort transforms a list:

```
[5, 2, 9, 1, 5]

```

to an ascending order, from lowest to highest:

```
[1, 2, 5, 5, 9]

```

We implement the algorithm with two loops.
The first loop iterates as **long as the list is unsorted** and we assume it’s unsorted to start.
Within this loop, another iteration moves through the list. For each pairing, the algorithm asks:
In comparison, is the first element larger than the second element?
If it is, we swap the position of the elements. The larger element is now at a greater index than the smaller element.
When a swap is made, we know the list is still unsorted. The outer loop will run again when the inner loop concludes.
The process repeats until the largest element makes its way to the last index of the list. The outer loop runs until no swaps are made within the inner loop.

## **Algorithm Analysis**
Each pass through the list will place the next largest value in its proper place.
We are performing  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     n-1
 </span> comparisons for our inner loop. Then, we must go through the list  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     n
 </span> times in order to ensure that each item in our list has been placed in its proper order.
The  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     n
 </span> signifies the number of elements in the list. In a worst case scenario, the inner loop does  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     n-1
 </span> comparisons for each  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     n
 </span> element in the list.
Therefore we calculate the algorithm’s efficiency as:

```
O(
```


```
*n*
```


```
(
```


```
*n*
```


```
−1))=O(
```


```
*n*
```


```
(
```


```
*n*
```


```
))=O(
```


```
*n*
```


```
)

```

When calculating the run-time efficiency of an algorithm, we drop the constant ( <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     -1
 </span>), which simplifies our inner loop comparisons to  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     n
 </span>.
This is how we arrive at the algorithm’s runtime:  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     O(n^2)
 </span>.
