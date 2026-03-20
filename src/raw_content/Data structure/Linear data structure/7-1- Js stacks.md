# 7.1. Js stacks


Stacks in JavaScript

```
const LinkedList = require('./LinkedList');

class Stack {
  constructor(maxSize = Infinity) {
    this.stack = new LinkedList();
    this.maxSize = maxSize;
    this.size = 0;
  }

  hasRoom() {
    return (this.size < this.maxSize);  
  }
  
  isEmpty() {
    return (this.size === 0);  
  }
  
  push(value) {
    if (this.hasRoom()) {
      this.stack.addToHead(value);
      this.size++;      
    } else {
      throw new Error('Stack is full');
    }
  }

  pop() {
    if (!this.isEmpty()) {
      const value = this.stack.removeHead();
      this.size--;
      return value;
    } else {
      console.log('Stack is empty!');
    }
  }

  peek() {
    if (!this.isEmpty()) {
      return this.stack.head.data;
    } else {
      return null;
    }
  }
}

module.exports = Stack;

```


## **General concept**
A **Stack** is a data structure that follows the rule:
**LIFO — Last In, First Out**
The last element added is the first element removed.
Example:

```
push(A)
push(B)
push(C)

Stack:
C
B
A

```

If we remove an element:

```
pop()

```

Result:

```
B
A

```

Operations happen at only one end:
**top of the stack**
This implementation stores elements using a **LinkedList**.
The Stack keeps track of:
* stack → the LinkedList storing the nodes
* size → number of elements currently in the stack
* maxSize → maximum allowed elements

## **constructor()**

```
constructor(maxSize = Infinity) {
  this.stack = new LinkedList();
  this.maxSize = maxSize;
  this.size = 0;
}

```

Creates a new stack.
Initial state:

```
stack → empty LinkedList
size → 0
maxSize → capacity limit

```

If no size is provided:

```
maxSize = Infinity

```

Meaning the stack is **unbounded**.
Example:

```
const s = new Stack(3);

```

Maximum of **3 elements** allowed.

## **hasRoom()**

```
hasRoom() {
  return (this.size < this.maxSize);
}

```

Checks whether the stack can accept another element.
Returns:

```
true  → if size < maxSize
false → if stack is full

```

Example (maxSize = 3):

```
Stack size = 2
hasRoom() → true

Stack size = 3
hasRoom() → false

```

Key idea:
Prevents **stack overflow**.

## **isEmpty()**

```
isEmpty() {
  return (this.size === 0);
}

```

Checks if the stack has no elements.
Returns:

```
true  → if stack is empty
false → if elements exist

```

Example:

```
Stack: []
isEmpty() → true

Stack: [A B]
isEmpty() → false

```

Key idea:
Used to prevent removing from an empty stack (**underflow**).

## **push(value)**

```
push(value) {
  if (this.hasRoom()) {
    this.stack.addToHead(value);
    this.size++;
  } else {
    throw new Error('Stack is full');
  }
}

```

Adds a new element to the stack.
Steps:
1. Check if the stack has room

```
this.hasRoom()

```

1. Insert element at the **head of the LinkedList**
```
this.stack.addToHead(value)

```

The head represents the **top of the stack**.
1. Increase the stack size
```
this.size++

```

Example:
Before:

```
[A B]

```

push(C)
After:

```
[C A B]

```

Top element:

```
C

```

Time complexity:

```
O(1)

```


## **pop()**

```
pop() {
  if (!this.isEmpty()) {
    const value = this.stack.removeHead();
    this.size--;
    return value;
  } else {
    throw new Error('Stack is empty');
  }
}

```

Removes the top element from the stack.
Steps:
1. Check if the stack is not empty

```
!this.isEmpty()

```

1. Remove the head of the LinkedList

```
this.stack.removeHead()

```

1. Decrease the size

```
this.size--

```

1. Return the removed value
Example:
Before:

```
[C B A]

```

pop()
After:

```
[B A]

```

Returned value:

```
C

```


## **peek()**

```
peek() {
  if (!this.isEmpty()) {
    return this.stack.head.data;
  } else {
    return null;
  }
}

```

Returns the top element **without removing it**.
Steps:
1. Check if the stack is empty
2. If not empty, return the value stored in the head node
Example:

```
Stack:
C
B
A

peek() → C

```

Stack remains unchanged.

## **module.exports**

```
module.exports = Stack;

```

Exports the Stack class so it can be used in other files.
Example:

```
const Stack = require('./Stack');

```


## **Example usage**

```
const stack = new Stack(3);

stack.push('A');
stack.push('B');
stack.push('C');

stack.pop();

```

Result:

```
push A
push B
push C
pop → C

```

Final stack:

```
B
A

```


## **Key ideas to remember**
Stack properties:

```
stack   → LinkedList storing nodes
size    → current number of elements
maxSize → maximum capacity

```

Stack operations:

```
push → add to top
pop  → remove from top
peek → view top element

```

Stack rule:

```
LIFO
Last In → First Out

```

