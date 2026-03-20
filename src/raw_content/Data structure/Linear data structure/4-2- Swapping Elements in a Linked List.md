# 4.2. Swapping Elements in a Linked List

## 
In a singly linked list, each node only stores a reference to the next node.
Unlike arrays, we:
* Do not have index-based access
* Cannot directly swap elements
* Must carefully update pointers
To swap two nodes, we must:
* Find both nodes
* Track their previous nodes
* Update all affected pointers correctly

## **Goal**
Given:
* A linked list list
* Two values data1 and data2
Swap the nodes containing those values.

## **Overall Strategy**
To perform the swap, we must track four references:
* node1 → node containing data1
* node2 → node containing data2
* node1Prev → node before node1
* node2Prev → node before node2

## **Step 1 — Find Both Nodes and Their Previous Nodes**
We traverse the list starting from  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     list.head
 </span>.
Example pattern:

```
let node1 = list.head;
let node1Prev = null;

while (node1 !== null) {
  if (node1.data === data1) {
    break;
  }
  node1Prev = node1;
  node1 = node1.getNextNode();
}

```

We repeat the same logic for  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     node2
 </span>.
At the end:
* node1 and node2 point to the matching nodes
* node1Prev and node2Prev store their preceding nodes

## **Step 2 — Handle Missing Nodes (Edge Case)**
If either value is not found:

```
if (node1 === null || node2 === null) {
  console.log('Swap not possible - one or more elements are not in the list.');
  return;
}

```

This prevents errors when accessing  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     .getNextNode()
 </span> on  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     null
 </span>.

## **Step 3 — Handle Identical Values (Edge Case)**
If both values are the same:

```
if (data1 === data2) {
  console.log('Elements are the same - no swap needed.');
  return;
}

```

There is no need to continue.

## **Step 4 — Update the Previous Nodes' Pointers**
We now update the nodes that point to  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     node1
 </span> and  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     node2
 </span>.
For  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     node1Prev
 </span>:

```
if (node1Prev === null) {
  list.head = node2;
} else {
  node1Prev.setNextNode(node2);
}

```

If  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     node1Prev
 </span> is  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     null
 </span>, then  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     node1
 </span> was the head.
So we update the list’s head to  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     node2
 </span>.
We repeat the same logic for  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     node2Prev
 </span>:

```
if (node2Prev === null) {
  list.head = node1;
} else {
  node2Prev.setNextNode(node1);
}

```

At this point, all incoming pointers are correct.

## **Step 5 — Swap the Next Pointers**
Now we swap the outgoing pointers using a temporary variable:

```
let temp = node1.getNextNode();
node1.setNextNode(node2.getNextNode());
node2.setNextNode(temp);

```

This mirrors how swapping works in arrays, but instead of swapping values, we swap references.

## **Final Complete Function**

```
function swapNodes(list, data1, data2) {
  if (data1 === data2) {
    console.log('Elements are the same - no swap needed.');
    return;
  }

  let node1Prev = null;
  let node2Prev = null;
  let node1 = list.head;
  let node2 = list.head;

  while (node1 !== null) {
    if (node1.data === data1) break;
    node1Prev = node1;
    node1 = node1.getNextNode();
  }

  while (node2 !== null) {
    if (node2.data === data2) break;
    node2Prev = node2;
    node2 = node2.getNextNode();
  }

  if (node1 === null || node2 === null) {
    console.log('Swap not possible - one or more elements are not in the list.');
    return;
  }

  if (node1Prev === null) {
    list.head = node2;
  } else {
    node1Prev.setNextNode(node2);
  }

  if (node2Prev === null) {
    list.head = node1;
  } else {
    node2Prev.setNextNode(node1);
  }

  let temp = node1.getNextNode();
  node1.setNextNode(node2.getNextNode());
  node2.setNextNode(temp);
}

```


## **Time and Space Complexity**
## **Time Complexity**
Worst case:
* Both while loops traverse the entire list.
* Each loop is O(n).
Overall time complexity:
O(n)
(Constants are dropped in Big-O notation.)

## **Space Complexity**
The function creates only a fixed number of variables:
* node1
* node2
* node1Prev
* node2Prev
* temp
Space complexity:
O(1)

## **Key Concepts to Remember**
* In singly linked lists, you must update both:
	* Incoming pointers (previous nodes)
	* Outgoing pointers (next references)
* Always handle edge cases:
	* Nodes not found
	* Identical values
	* Swapping the head node
* Never lose references before reassigning pointers

If you want, I can also write a visual memory diagram explanation for exam preparation.
