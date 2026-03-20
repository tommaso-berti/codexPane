# 1. Learn Binary Search

[83B6B627-E190-4FB6-A83A-45169AA47A43](attachments/83B6B627-E190-4FB6-A83A-45169AA47A43.mov)
Binary search requires a sorted data-set. We then take the following steps:
**1.** Check the middle value of the dataset.
* If this value matches our target we can return the <u>[index](https://www.codecademy.com/resources/docs/general/database/index)</u>.
**2.** If the middle value is *less than our target*:
* Start at step 1 using the *right half* of the list.
**3.** If the middle value is *greater than our target*:
* Start at step 1 using the *left half* of the list.

## **Time Complexity of Binary Search**
In each iteration, we are **cutting the list in half.** The time complexity is O(log N).
In the worst case:
* Comparison 1: We look at the middle of all 64 elements
* Comparison 2: If the middle is not equal to our search value, we would look at 32 elements
* Comparison 3: If the new middle is not equal to our search value, we would look at 16 elements
* Comparison 4: If the new middle is not equal to our search value, we would look at 8 elements
* Comparison 5: If the new middle is not equal to our search value, we would look at 4 elements
* Comparison 6: If the new middle is not equal to our search value, we would look at 2 elements
When there’s  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     2
 </span> elements, the search value is either one or the other, and thus, there is at most  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     6
 </span> comparisons in a sorted list of size  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     64
 </span>.

