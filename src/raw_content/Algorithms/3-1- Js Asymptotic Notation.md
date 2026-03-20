# 3.1. Js Asymptotic Notation

# 3.1. Js **Asymptotic Notation**

## Analyzing Algorithm Runtime
To determine runtime, we usually analyze:
* **Number of loops****Number of iterations****Operations performed relative to input size (n)**
## **Example: Dividing by Two**

```
while (n > 1) {
  n = n / 2;
}

```

Each iteration **halves the input**.
Example:
| n          | iterations |
|------------|------------|
| 1          | 0          |
| 2          | 1          |
| 4          | 2          |
| 8          | 3          |
| 16         | 4          |

This pattern follows:

```
log₂(n)

```

So the runtime is:

```
O(log n)

```

Algorithms that **halve the input each iteration** usually have **logarithmic complexity**.

## **Linked List Example – Finding Maximum**
Algorithm steps:
1. Start at the head of the list
2. Traverse the list
3. Keep track of the maximum value
Example pattern:

```
while (current.getNextNode() !== null)

```

Since the list is traversed **once**, runtime is:

```
O(n)

```

Where  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     n
 </span> = number of nodes.

## **Sorting a Linked List**
Algorithm process:
1. Create a new linked list
2. Find the **maximum element**Insert it at the **head of the new list**Remove it from the original list
7. Repeat until the original list is empty
Important detail:
* findMax() itself is **O(n)**Since  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     findMax()
 </span> is called **inside a loop that runs n times**, we get:

```
O(n * n) = O(n²)

```

This is **quadratic complexity**.

## **Queue vs Stack Runtime**
## **Queue (FIFO – First In First Out)**
Removing the first inserted element:

```
O(1)

```

Because it is **already at the front**.

## **Stack (FILO – First In Last Out)**
Removing the first inserted element requires reaching the **bottom of the stack**.

```
O(n)

```

Because the structure must be traversed.

## **Linked List vs Hash Map Search**
## **Linked List Search**
To find a value:

```
Traverse the entire list

```

Runtime:

```
O(n)

```


## **Hash Map Search**
Hash maps store data using **key-value pairs** and a **hash function**.
Finding a value by key normally takes:

```
O(1)

```


## **Hash Collisions**
Sometimes **multiple keys hash to the same index**.
Two common collision strategies:
## **Separate Chaining**
Each bucket stores a **linked list** of values.
Worst case:

```
O(n)

```

If all elements are in the same bucket.

## **Open Addressing (Linear Probing)**
If a collision occurs, the algorithm searches the **next available index**.
Worst case:

```
O(n)

```

If the correct value is near the end of the array.

## **Key Big-O Patterns**
| Pattern                     | Complexity                  |
|-----------------------------|-----------------------------|
| Single traversal            | O(n)                        |
| Two nested loops            | O(n²)                       |
| Input halved each iteration | O(log n)                    |
| Direct access (hash map)    | O(1)                        |

