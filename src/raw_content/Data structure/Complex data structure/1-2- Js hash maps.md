# 1.2. Js hash maps


A value is stored at an array <u>[index](https://www.codecademy.com/resources/docs/general/database/index)</u> determined by plugging the key into a hash function. Because we always know exactly where to find values in a hash map, we have constant access to any of the values it contains.
This quick access to values makes a hash map a good choice of data structure whenever we need to store a lot of values but need a fast look-up time.
In JavaScript, objects are often used to map keys to values as in a hash map, but in this lesson, you’ll create your own implementation of a hash map by building out a  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     HashMap
 </span> class. You’ll build methods to hash and compress a given key, assign an index at which to store a value, and retrieve that value.
To implement a hash map, the  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     HashMap
 </span> constructor <u>[method](https://www.codecademy.com/resources/docs/general/method)</u> will create an empty array that will hold values. A hashing function will return an index in the array where the value will be stored.

Hash example in JavaScript

```
const LinkedList = require('./LinkedList');
const Node = require('./Node');
class HashMap {
  constructor(size = 0) {
    this.hashmap = new Array(size)
      .fill(null)
      .map(() => new LinkedList());
  }

  hash(key) {
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode += hashCode + key.charCodeAt(i);
    }
    return hashCode % this.hashmap.length;
  }

  assign(key, value) {
    const arrayIndex = this.hash(key);
    const linkedList = this.hashmap[arrayIndex];
    if (linkedList.head === null) {
      linkedList.addToHead({ key, value });
      return;
    }
    let current = linkedList.head;
    while (current) {
      if (current.data.key === key) {
        current.data = { key, value };
      }
      if (!current.getNextNode()) {
        current.setNextNode(new Node({ key, value }));
        break;
      }
      current = current.getNextNode();
    }
  }

  retrieve(key) {
    const arrayIndex = this.hash(key);
    let current = this.hashmap[arrayIndex].head;
    while (current) {
      if (current.data.key === key) {
        return current.data.value;
      }
      current = current.getNextNode();
    }
    return null;
  }
}

module.exports = HashMap;

```


## **Imports**

```
const LinkedList = require('./LinkedList');
const Node = require('./Node');

```

* Uses a **LinkedList** for collision handling.
* Each element in the hash map bucket is a **Node**.

## **Constructor**

```
constructor(size = 0) {
  this.hashmap = new Array(size)
    .fill(null)
    .map(() => new LinkedList());
}

```

Creates the hash table.
Steps:
1. Create an array with size
2. Fill it with null
3. Replace each position with a **LinkedList**Result:

```
hashmap
[ LinkedList, LinkedList, LinkedList, ... ]

```

Each array index = **bucket**.

## **Hash Function**

```
hash(key) {
  let hashCode = 0;
  for (let i = 0; i < key.length; i++) {
    hashCode += hashCode + key.charCodeAt(i);
  }
  return hashCode % this.hashmap.length;
}

```

Purpose: convert a **key → array index**
Steps:
1. Loop through the characters in the key
2. Convert each char to ASCII with charCodeAt
3. Combine values to produce a hash
4. Use **modulo (%)** to keep the index inside the array size
Example

```
key = "cat"

hashCode calculation
↓

index = hashCode % arrayLength

```


## **Assign (Insert / Update)**

```
assign(key, value)

```

Adds or updates a key-value pair.

## **Step 1 — Find bucket**

```
const arrayIndex = this.hash(key);
const linkedList = this.hashmap[arrayIndex];

```

Compute where the key should go.

## **Step 2 — If bucket empty**

```
if (linkedList.head === null) {
  linkedList.addToHead({ key, value });
  return;
}

```

Add node directly.

## **Step 3 — Traverse list**

```
let current = linkedList.head;
while (current)

```

Used when collisions occur.

## **Step 4 — Update existing key**

```
if (current.data.key === key) {
  current.data = { key, value };
}

```

If key already exists → overwrite value.

## **Step 5 — Append new node**

```
if (!current.getNextNode()) {
  current.setNextNode(new Node({ key, value }));
  break;
}

```

Reached end of list → add new node.
Collision example:

```
Index 3
↓

LinkedList
[key1,value1] → [key2,value2] → [key3,value3]

```


## **Retrieve**

```
retrieve(key)

```

Returns the value associated with a key.

## **Step 1 — Find bucket**

```
const arrayIndex = this.hash(key);

```


## **Step 2 — Start at list head**

```
let current = this.hashmap[arrayIndex].head;

```


## **Step 3 — Search linked list**

```
while (current)

```

Loop through nodes.

## **Step 4 — Match key**

```
if (current.data.key === key) {
  return current.data.value;
}

```

Return the value.

## **Step 5 — Move forward**

```
current = current.getNextNode();

```


## **Step 6 — Not found**

```
return null;

```

Key doesn't exist.

## **Collision Handling**
This implementation uses:
## **Separate Chaining**

```
array index
↓

LinkedList

```

Example:

```
hash("cat") → 3
hash("bat") → 3
hash("rat") → 3

```

Stored as:

```
3 → [cat,10] → [bat,7] → [rat,2]

```


## **Time Complexity**
| Operation | Average   | Worst     |
|-----------|-----------|-----------|
| Insert    | O(1)      | O(n)      |
| Lookup    | O(1)      | O(n)      |
| Delete    | O(1)      | O(n)      |

Worst case occurs if **all keys collide**.