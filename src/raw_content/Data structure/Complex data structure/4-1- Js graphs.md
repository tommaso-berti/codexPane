# 4.1. Js graphs


With three classes,  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     Edge
 </span>,  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     Vertex
 </span>, and  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     Graph
 </span>, we can implement a variety of <u>[graphs](https://www.codecademy.com/resources/docs/general/graphs)</u> that satisfy the requirements of many algorithms. Remember that a  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     Graph
 </span> consists of vertices and their corresponding edges.
* A Vertex can store any data.
* A Vertex maintains a list of connections to other vertices, represented by a list of Edge instances.
* A Vertex can add and remove edges going to another Vertex.
* A Graph stores all of its vertices, represented by a list of Vertex instances.
* A Graph knows if it is directed or undirected.
* A Graph knows if it is weighted or unweighted.
* A Graph can add and remove its own vertices.
* A Graph can add and remove edges between stored vertices.

## Graph
(Weighted and directional)

```
const Edge = require('./Edge.js');
const Vertex = require('./Vertex.js');

class Graph {
  constructor(isWeighted = false) {
    this.vertices = [];
    this.isWeighted = isWeighted;
  }

  addVertex(data) {
    const newVertex = new Vertex(data);
    this.vertices.push(newVertex);

    return newVertex;
  }

  removeVertex(vertex) {
    this.vertices = this.vertices.filter(v => v !== vertex);
  }

  addEdge(vertexOne, vertexTwo, weight) {
    const edgeWeight = this.isWeighted ? weight : null;

    if (vertexOne instanceof Vertex && vertexTwo instanceof Vertex) {
      vertexOne.addEdge(vertexTwo, edgeWeight);
      vertexTwo.addEdge(vertexOne, edgeWeight);
    } else {
      throw new Error('Expected Vertex arguments.');
    }
  }

  removeEdge(vertexOne, vertexTwo) {
    if (vertexOne instanceof Vertex && vertexTwo instanceof Vertex) {
      vertexOne.removeEdge(vertexTwo);
      vertexTwo.removeEdge(vertexOne);
    } else {
      throw new Error('Expected Vertex arguments.');
    }
  }

  print() {
    this.vertices.forEach(vertex => vertex.print());
  }
}

const trainNetwork = new Graph();
const atlantaStation = trainNetwork.addVertex('Atlanta');
const newYorkStation = trainNetwork.addVertex('New York');
trainNetwork.addEdge(atlantaStation, newYorkStation);

trainNetwork.print();

module.exports = Graph;

```


## Vertex

```
const Edge = require('./Edge.js');

class Vertex {
  constructor(data) {
    this.data = data;
    this.edges = [];
  }

  addEdge(vertex) {
    if (vertex instanceof Vertex) {
      this.edges.push(new Edge(this, vertex));
    } else {
      throw new Error('Edge start and end must both be Vertex');
    }
  }

  print() {
    const edgeList = this.edges.map(edge =>
        edge.weight !== null ? `${edge.end.data} (${edge.weight})` : edge.end.data);

    const output = `${this.data} --> ${edgeList.join(', ')}`;
    console.log(output);
  }
}

module.exports = Vertex;

```


## **Graph Structure Overview**
A **graph** is a data structure composed of:
* **Vertices (nodes)** – entities or points
* **Edges** – connections between vertices
Example:

```
Atlanta ---- New York

```

Atlanta and New York are vertices, and the line between them is an edge.

## **Graph Class**

```
class Graph {
  constructor(isWeighted = false) {
    this.vertices = [];
    this.isWeighted = isWeighted;
  }
}

```

### **Purpose**
The  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     Graph
 </span> class stores and manages the entire network of vertices and edges.
## 
### Properties
| Property                                | Meaning                                 |
|-----------------------------------------|-----------------------------------------|
| vertices                                | Array storing all vertices in the graph |
| isWeighted                              | Determines whether edges have weights   |

Example of a weighted edge:

```
CityA ---- CityB (distance = 500)

```


## **addVertex()**

```
addVertex(data) {
  const newVertex = new Vertex(data);
  this.vertices.push(newVertex);
  return newVertex;
}

```

### **Purpose**
Creates a new vertex and adds it to the graph.
## 
## **Example**

```
const atlantaStation = trainNetwork.addVertex('Atlanta');

```

Result:

```
Graph
 └── Atlanta

```


## **removeVertex()**

```
removeVertex(vertex) {
  this.vertices = this.vertices.filter(v => v !== vertex);
}

```

### Purpose
Removes a vertex from the graph.
Example:
Before:

```
Atlanta
New York
Boston

```

After removing New York:

```
Atlanta
Boston

```

Note: this implementation removes the vertex from the graph list but does not automatically remove edges pointing to it.

## **addEdge()**

```
addEdge(vertexOne, vertexTwo, weight)

```

### **Purpose**
Creates a connection between two vertices.

```
vertexOne.addEdge(vertexTwo, edgeWeight);
vertexTwo.addEdge(vertexOne, edgeWeight);

```

Because edges are added in both directions, the graph is **undirected**.
Example:

```
Atlanta ↔ New York

```

If the graph were directed, only one edge would be created.

## **removeEdge()**

```
removeEdge(vertexOne, vertexTwo)

```

### **Purpose**
Removes the connection between two vertices.
Example:
Before:

```
Atlanta ↔ New York

```

After removal:

```
Atlanta    New York

```


## **print()**

```
print() {
  this.vertices.forEach(vertex => vertex.print());
}

```

### **Purpose**
Displays the graph structure by printing each vertex and its connections.
Example output:

```
Atlanta --> New York
New York --> Atlanta

```


## **Vertex Class**

```
class Vertex {
  constructor(data) {
    this.data = data;
    this.edges = [];
  }
}

```

### **Properties**
| Property                               | Meaning                                |
|----------------------------------------|----------------------------------------|
| data                                   | The value stored in the vertex         |
| edges                                  | List of edges connected to this vertex |

## 
## **Vertex addEdge()**

```
addEdge(vertex) {
  if (vertex instanceof Vertex) {
    this.edges.push(new Edge(this, vertex));
  }
}

```

### **Purpose**
Creates an edge connecting the current vertex to another vertex.
Example:

```
Atlanta → New York

```

This edge is stored in Atlanta's  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     edges
 </span> list.

## **Vertex print()**

```
print() {
  const edgeList = this.edges.map(edge =>
      edge.weight !== null ? `${edge.end.data} (${edge.weight})` : edge.end.data);

  const output = `${this.data} --> ${edgeList.join(', ')}`;
  console.log(output);
}

```

### **Purpose**
Displays all vertices connected to the current vertex.
Example output:

```
Atlanta --> New York
New York --> Atlanta

```

If weighted:

```
Atlanta --> New York (1200)

```


## **Example Graph Creation**

```
const trainNetwork = new Graph();

const atlantaStation = trainNetwork.addVertex('Atlanta');
const newYorkStation = trainNetwork.addVertex('New York');

trainNetwork.addEdge(atlantaStation, newYorkStation);

trainNetwork.print();

```

Output:

```
Atlanta --> New York
New York --> Atlanta

```


## **Internal Representation**

```
Graph
 ├── Atlanta
 │     └── Edge → New York
 │
 └── New York
       └── Edge → Atlanta

```


## **Summary**
| Class                                        | Role                                         |
|----------------------------------------------|----------------------------------------------|
| Graph                                        | Manages all vertices and connections         |
| Vertex                                       | Represents a node in the graph               |
| Edge                                         | Represents a connection between two vertices |

**Additional Resources**:
* <u>[Visualizer: Graphs](https://visualgo.net/en/graphds?slide=1)</u><u>[Video: Introduction to Graph Theory](https://www.youtube.com/watch?v=5hPfm_uqXmw)</u><u>[GitHub Repo: Graph JS Practice](https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/graph)</u>**Code Challenges**:
* <u>[Beginner - Find the Town Judge](https://leetcode.com/problems/find-the-town-judge/)</u><u>[Beginner - Find Center of Star Graph](https://leetcode.com/problems/find-center-of-star-graph/)</u><u>[Intermediate - Clone Graph](https://leetcode.com/problems/clone-graph/)</u><u>[More Practice Problems](https://leetcode.com/problemset/all/?search=graph)</u>