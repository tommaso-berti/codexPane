# 5.1 Js Doubly Linked Lists

# 5.1 Js Doubly **Linked Lists**

Doubly linked list in JavaScript

```
const Node = require('./Node');

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  
  addToHead(data) {
    const newHead = new Node(data);
    const currentHead = this.head;
    if (currentHead) {
      currentHead.setPreviousNode(newHead);
      newHead.setNextNode(currentHead);
    }
    this.head = newHead;
    if (!this.tail) {
      this.tail = newHead;
    }
  }
  
  addToTail(data) {
    const newTail = new Node(data);
    const currentTail = this.tail;
    if (currentTail) {
      currentTail.setNextNode(newTail);
      newTail.setPreviousNode(currentTail);
    }
    this.tail = newTail;
    if (!this.head) {
      this.head = newTail;
    }
  }
  
  removeHead() {
    const removedHead = this.head;
    if (!removedHead) {
      return;
    }
    this.head = removedHead.getNextNode();
    if (this.head) {
      this.head.setPreviousNode(null);
    }
    if (removedHead === this.tail) {
      this.removeTail();
    }
    return removedHead.data;
  }
  
  removeTail() {
    const removedTail = this.tail;
    if (!removedTail) {
      return;
    }
    this.tail = removedTail.getPreviousNode();
    if (this.tail) {
      this.tail.setNextNode(null);
    }
    if (removedTail === this.head) {
      this.removeHead();
    }
    return removedTail.data;
  }
  
  removeByData(data) {
    let nodeToRemove;
    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.data === data) {
        nodeToRemove = currentNode;
        break;
      }
      currentNode = currentNode.getNextNode();
    }
    if (!nodeToRemove) {
      return null;
    }
    // Continue your .removeByData() method below:
   
  }
  
  printList() {
    let currentNode = this.head;
    let output = '<head> ';
    while (currentNode !== null) {
      output += currentNode.data + ' ';
      currentNode = currentNode.getNextNode();
    }
    output += '<tail>';
    console.log(output);
  }
}

module.exports = DoublyLinkedList;

```


## General concept
Each  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     Node
 </span> stores:
* data
* next pointer (to the next node)
* previous pointer (to the previous node)
Because nodes can move both directions, the list keeps both:
* head (first node)
* tail (last node)

## constructor()

```
constructor() {
  this.head = null;
  this.tail = null;
}

```

Creates an empty list.
* If the list is empty: head === null and tail === null.

## **addToHead(data)**

```
addToHead(data) {
  const newHead = new Node(data);
  const currentHead = this.head;

  if (currentHead) {
    currentHead.setPreviousNode(newHead);
    newHead.setNextNode(currentHead);
  }

  this.head = newHead;

  if (!this.tail) {
    this.tail = newHead;
  }
}

```

What it does:
* Creates a new node.
* If the list is not empty:
	* The old head’s previous becomes the new node.
	* The new node’s next becomes the old head.
* Sets head to the new node.
* If the list was empty, the new node is both head and tail.
Key idea:
* Inserting at the head requires adjusting both next and previous pointers.

## **addToTail(data)**

```
addToTail(data) {
  const newTail = new Node(data);
  const currentTail = this.tail;

  if (currentTail) {
    currentTail.setNextNode(newTail);
    newTail.setPreviousNode(currentTail);
  }

  this.tail = newTail;

  if (!this.head) {
    this.head = newTail;
  }
}

```

What it does:
* Creates a new node.
* If the list is not empty:
	* The old tail’s next becomes the new node.
	* The new node’s previous becomes the old tail.
* Sets tail to the new node.
* If the list was empty, the new node is both head and tail.
Key idea:
* Because the list has a tail, adding at the end is O(1): no traversal needed.

## **removeHead()**

```
removeHead() {
  const removedHead = this.head;
  if (!removedHead) {
    return;
  }

  this.head = removedHead.getNextNode();

  if (this.head) {
    this.head.setPreviousNode(null);
  }

  if (removedHead === this.tail) {
    this.removeTail();
  }

  return removedHead.data;
}

```

What it does:
* Saves the current head.
* If the list is empty, stops.
* Moves head to the next node.
* If the new head exists, sets its previous to null (because head has no previous).
* Handles the case where the removed head was also the tail (single-node list).
Important note:
* This implementation calls removeTail() when there was one node.
* It works, but it is a bit redundant because the pointers were already updated; Codecademy often uses this approach for simplicity.
Returns:
* The removed head node’s data.

## **removeTail()**

```
removeTail() {
  const removedTail = this.tail;
  if (!removedTail) {
    return;
  }

  this.tail = removedTail.getPreviousNode();

  if (this.tail) {
    this.tail.setNextNode(null);
  }

  if (removedTail === this.head) {
    this.removeHead();
  }

  return removedTail.data;
}

```

What it does:
* Saves the current tail.
* If the list is empty, stops.
* Moves tail to the previous node.
* If the new tail exists, sets its next to null (because tail has no next).
* Handles the case where the removed tail was also the head (single-node list).
Returns:
* The removed tail node’s data.

## **removeByData(data) (current state)**

```
removeByData(data) {
  let nodeToRemove;
  let currentNode = this.head;

  while (currentNode !== null) {
    if (currentNode.data === data) {
      nodeToRemove = currentNode;
      break;
    }
    currentNode = currentNode.getNextNode();
  }

  if (!nodeToRemove) {
    return null;
  }

  // missing logic here
}

```

What’s already correct:
* It traverses from head to tail until it finds the node with matching data.
* If not found, it returns null.
What is missing:
* If nodeToRemove is the head: call removeHead()
* Else if it is the tail: call removeTail()
* Otherwise (middle):
	* Link its previous node directly to its next node:
		* nextNode.setPreviousNode(previousNode)
		* previousNode.setNextNode(nextNode)
* Finally return the removed node (Codecademy usually returns the node object, not just data, in this method).
If you want, I can paste the exact missing block to finish  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     removeByData()
 </span> in the same style as your code.

## **printList()**

```
printList() {
  let currentNode = this.head;
  let output = '<head> ';

  while (currentNode !== null) {
    output += currentNode.data + ' ';
    currentNode = currentNode.getNextNode();
  }

  output += '<tail>';
  console.log(output);
}

```

What it does:
* Starts at head.
* Walks forward using getNextNode().
* Appends each node’s data to a string.
* Prints the list from head to tail.
Example output:
 <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     <head> A B C <tail>
 </span>
