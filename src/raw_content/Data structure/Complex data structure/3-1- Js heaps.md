# 3.1. Js heaps


A **heap** data structure is a specialized tree data structure that satisfies the heap condition:
* In a max-heap, for any given element, its parent’s value is greater than or equal to its value.
* In a min-heap, for any given element, its parent’s value is less than or equal to its value.
A heap data structure is commonly implemented as a <u>[binary](https://www.codecademy.com/resources/docs/general/binary)</u> tree.

Heaps enable solutions for complex problems such as finding the shortest path (Dijkstra’s Algorithm) or efficiently sorting a dataset (heapsort).

Min-heap in JavaScript

```
class MinHeap {
  constructor() {
    this.heap = [ null ];
    this.size = 0;
  }

  popMin() {
    if (this.size === 0) {
      return null
    }
    console.log(`\n.. Swap ${this.heap[1]} with last element ${this.heap[this.size]}`);
    this.swap(1, this.size);
    const min = this.heap.pop();
    this.size--;
    console.log(`.. Removed ${min} from heap`);
    console.log('..',this.heap);
    this.heapify();
    return min;
  }

  add(value) {
    console.log(`.. adding ${value}`);
    this.heap.push(value);
    this.size++;
    this.bubbleUp();
    console.log(`added ${value} to heap`, this.heap);
  }

  bubbleUp() {
    let current = this.size;
    while (current > 1 && this.heap[getParent(current)] > this.heap[current]) {
      console.log(`.. swap ${this.heap[current]} with parent ${this.heap[getParent(current)]}`);
      this.swap(current, getParent(current));
      console.log('..', this.heap);
      current = getParent(current);
    }
  }

  heapify() {
    let current = 1;
    let leftChild = getLeft(current);
    let rightChild = getRight(current);

    while (this.canSwap(current, leftChild, rightChild)) {
      while (this.canSwap(current, leftChild, rightChild)) {
      if (this.exists(leftChild) && this.exists(rightChild)) {
        if (this.heap[leftChild] < this.heap[rightChild]) {
          this.swap(current, leftChild);
          current = leftChild;
        } else {
          this.swap(current, rightChild);
          current = rightChild;
        }        
      } else {
        this.swap(current, leftChild);
        current = leftChild;
      }
      leftChild = getLeft(current);
      rightChild = getRight(current);
    }
      leftChild = getLeft(current);
      rightChild = getRight(current);
    }
  }

  exists(index) {
    return index <= this.size;
  }

  canSwap(current, leftChild, rightChild) {
    // Check that one of the possible swap conditions exists
    return (
      this.exists(leftChild) && this.heap[current] > this.heap[leftChild]
      || this.exists(rightChild) && this.heap[current] > this.heap[rightChild]
    );
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

}

const getParent = current => Math.floor((current / 2));
const getLeft = current => current * 2;
const getRight = current => current * 2 + 1;

module.exports = MinHeap;

```

## 
This class implements a **Min Heap** using an **array**.
A **Min Heap** has this property:

```
parent ≤ children

```

So the **smallest value is always at the root**.

## **Internal Structure**

```
this.heap = [null];
this.size = 0;

```

The heap array starts with  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     null
 </span> so indexing starts at **1** instead of **0**.
Example heap:

```
index: 0  1  2  3  4  5
heap: [x, 3, 5, 7, 8, 9]

```

Tree representation:

```
        3
      /   \
     5     7
    / \
   8   9

```


## **Constructor**

```
constructor() {
  this.heap = [ null ];
  this.size = 0;
}

```

Initializes:
* heap array
* heap size

## **add(value)**

```
add(value)

```

Adds a new value to the heap.
Steps:
1. Push value at end
2. Increase size
3. Restore heap property with **bubbleUp**Example:

```
Add 2

        3
      /   \
     5     7

```

becomes

```
        2
      /   \
     3     7
    /
   5

```


## **bubbleUp()**
Restores heap property after insertion.

```
while (current > 1 && parent > current)

```

Process:
1. Compare node with parent
2. If smaller → swap
3. Move up
Example:

```
Insert 1

       3
      /
     5

```

Steps:

```
1 inserted → swap with 5
1 → swap with 3

```

Result:

```
       1
      / \
     3   5

```


## **popMin()**

```
popMin()

```

Removes the **minimum element** (root).
Steps:
1. Swap root with last element
2. Remove last element
3. Decrease size
4. Restore heap using **heapify**Example:

```
Heap
      2
     / \
    5   7

```

After removal:

```
swap 2 and 7

      7
     /
    5

```

Then heapify:

```
swap 7 and 5

      5
     /
    7

```


## **heapify()**
Restores heap property **from the root downward**.
Steps:
1. Compare node with children
2. Swap with **smallest child**Continue downward
Key rule:

```
swap with the smaller child

```

Example:

```
        20
       /  \
      5    10

```

Swap with **5**, not 10.
Result:

```
        5
       / \
      20 10

```


## **exists(index)**

```
exists(index)

```

Checks if node exists in heap.

```
index <= size

```


## **canSwap()**
Determines if a swap is needed.
Conditions:

```
parent > leftChild
OR
parent > rightChild

```

Meaning heap property is broken.

## **swap(a,b)**
Swaps two elements.

```
[this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];

```

Example:

```
swap(1,2)

```


## **Index Helper Functions**
Heap relationships:
## **Parent**

```
parent = floor(index / 2)

```

## **Left child**

```
left = index * 2

```

## **Right child**

```
right = index * 2 + 1

```

Example:

```
index 1
left 2
right 3

```


## **Complexity**
| Operation  | Time       |
|------------|------------|
| Insert     | O(log n)   |
| Remove min | O(log n)   |
| Peek min   | O(1)       |

Because heap height is:

```
log₂(n)

```

