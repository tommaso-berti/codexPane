# 3.1. Js Dijkstra's Algorithm

# 3.1. Js **Dijkstra's Algorithm**

Dijkstra’s <u>[Algorithm](https://www.codecademy.com/resources/docs/general/algorithm)</u> is used for evaluating the shortest paths between vertices in a graph. The general strategy is to iterate through the vertices in such a way that will always allow us to only consider the shorter path at each vertex and maintain every possible shortest path as we go.
We will first implement the algorithm to find the shortest distance to every vertex. Our implementation will take the following steps:
1. Evaluate the distances between the starting vertex and its neighbors
2. If the new distance to the neighbor is lower than the previous distance, record it, and queue up the neighbor
3. Dequeue the next vertex to evaluate
4. Repeat steps 2 - 3 until there are no more vertices left in the queue
In this exercise, we will set up the objects that will keep track of the shortest distances between the starting vertex and each other vertex, and the shortest paths.
We will be using a priority queue, which is a specialized heap data structure, to maintain the vertices we need to evaluate next. We’ll explain in a later exercise exactly what it is and the reason for using it instead of a regular queue.

## **Evaluate Paths to Starting Vertex’s Neighbors**
In the evaluation of each neighbor, we compare the distance of the new path to the distance of the previous path. If the distance of the new path is shorter, we will update our records of  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     distances
 </span> and  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     previous
 </span> vertices with the new path.
Every time we evaluate an edge between a vertex and its neighbor, the  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     if
 </span> condition ensures that the record will always maintain the shortest path among the evaluations so far. This is why we can use the previously recorded distance for comparison in our evaluation.

## **Evaluate All Paths**
Every time we discover a shorter path to a neighbor, we should queue up the neighbor to explore its connections and evaluate them.
This will accomplish two things:
1. Any paths that have not yet been explored will be explored.
2. For vertices that already have a path found, we will re-evaluate if the alternate path through the neighbor will result in a shorter distance.
We are guaranteed that every vertex is evaluated because whenever a path is found to a vertex, then it will be queued up, and its neighbors will be evaluated. The only way for a vertex to escape evaluation is if there are no connections to the vertex.
For our queue, we will use a priority queue. A priority queue is a specialized form of a min-heap, where the priority of a piece of data is stored alongside the data, and elements are popped based on the  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     priority
 </span> value. We have provided the  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     MinHeap.js
 </span> file for you in case you want a refresher on a basic heap data structure. In the meantime, take a look through  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     PriorityQueue.js
 </span> to familiarize yourself with the data structure. We mainly need the  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     .add()
 </span> <u>[method](https://www.codecademy.com/resources/docs/general/method)</u> to queue up elements with a priority, and the  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     .popMin()
 </span> method to grab the element with the lowest priority.
This priority queue is better than a regular queue since it allows us to evaluate the vertices with the shortest distances first. This way, we can avoid unnecessarily re-evaluating paths later in the queue since it is less likely that a longer path will result in a shorter distance.

## Shortest Path to a Target Vertex
Our current implementation of Dijkstra’s returns the shortest paths for all of the vertices in the graph. We can build upon this to create a function in shortestPath.js that reconstructs the full path to one vertex.
We will need to make a call to dijkstras() to get the map of distances and previous vertices. From there we can grab the target vertex’s shortest distance from distances and build the entire path using the previous vertices.
We cannot do this while dijkstras() continues to calculate the paths, because we cannot guarantee that the first encounter of the target vertex is the shortest path. Doing it after all the paths have been evaluated covers the possibility that an alternate path later in the queue will be shorter than the first one, particularly when there are negative distances.

```
const testGraph = require('./testGraph.js');
const dijkstras = require('./dijkstras.js');

const shortestPathBetween = (graph, startingVertex, targetVertex) => {
  const { distances, previous } = dijkstras(graph, startingVertex);
  
  const distance = distances[targetVertex.data];
  const path = [];

  let vertex = targetVertex;
  while(vertex) {
    path.unshift(vertex);
    vertex = previous[vertex.data];
  }

  return { distance, path };
};

// Retrieve shortest path between vertices A and G
const a = testGraph.getVertexByValue('A');
const g = testGraph.getVertexByValue('G');
const results = shortestPathBetween(testGraph, a, g);
console.log(results);

module.exports = shortestPathBetween;

```

### 
### Full example

```
const PriorityQueue = require('./PriorityQueue.js');
const testGraph = require('./testGraph.js');

const dijkstras = (graph, startingVertex) => {
  const distances = {};
  const previous = {};
  const queue = new PriorityQueue();

  queue.add({ vertex: startingVertex, priority: 0 });

  graph.vertices.forEach((vertex) => {
    distances[vertex.data] = Infinity;
    previous[vertex.data] = null;
  });

  distances[startingVertex.data] = 0;

  while (!queue.isEmpty()) {
    const { vertex } = queue.popMin();

    vertex.edges.forEach((edge) => {
      const alternate = edge.weight + distances[vertex.data];
      const neighborValue = edge.end.data;

      if (alternate < distances[neighborValue]) {
        distances[neighborValue] = alternate;
        previous[neighborValue] = vertex;

        queue.add({ vertex: edge.end, priority: distances[neighborValue] })
      }
    })
  }

  return { distances, previous };
};

const results = dijkstras(testGraph, testGraph.vertices[0]);
console.log(results);

module.exports = dijkstras;

```


## Review
We first need to initialize the two objects that we would use to keep track of the shortest paths from the starting vertex to every vertex in the graph. The previous object keeps track of the preceding vertices in the path, like a reverse linked-list. We can use it to reconstruct the entire path, but backwards. The distances object keeps track of how far each vertex is from the starting vertex.
Before we can start traversing through the edges in the graph, we must initialize each vertex’s distance and previous vertex. This is because up until now, we have not traversed down any paths to any of the vertices, so the initial distances should all be Infinity (and any actual paths are guaranteed to be less than the initial distance), and the previous vertices are all null. The only exception is the starting vertex where the distance from the starting vertex to itself is 0.

```
distances = {}
previous = {}

for every vertex in the graph:
   distances[vertex] = Infinity
   previous[vertex] = null

distances[starting vertex] = 0

```

Next, a priority queue is used to traverse through the graph. In order for a vertex to be queued, the path to that vertex must be smaller than what was previously recorded in distances. We can initially queue up the starting vertex because no other paths have been evaluated yet, so the “path” to itself is the shortest so far.
We continue to evaluate paths as long as there are vertices left in the queue. In order to evaluate new paths, we must dequeue a vertex from the queue and iterate through its neighbors. We then look at the distances to this vertex’s neighbors and the distance from the starting vertex to this vertex. The summation of these two distances is the full distance of the alternate path to the neighbor.

```
distances = {}
previous = {}
queue = priority queue

add the starting vertex to the queue

for every vertex in the graph:
   distances[vertex] = Infinity
   previous[vertex] = null

distances[starting vertex] = 0

while there are vertices in the queue:
   dequeue vertex from the queue

   for every neighbor in vertex:
      alternate = distances[vertex] + distance from vertex to neighbor

```

Finally, we must compare the distance of the alternate path to the distance of the current path to the vertex. If the alternate path turns out to be shorter, then we want to ditch the current path and replace it with the alternate path. This means we will have to replace the neighbor’s previous vertex to the vertex, and the neighbor’s distance with the alternate distance.
With the discovery of a shorter path to the neighbor, it raises the possibility of shorter paths to other vertices in the graph through this path. To cover this case, we should add the neighbor to the queue so we can explore its connected vertices.

```
distances = {}
previous = {}
queue = priority queue

add starting vertex to queue

for every vertex in the graph:
   distances[vertex] = Infinity
   previous[vertex] = null

distances[starting vertex] = 0

while there are vertices in the queue:
   dequeue vertex from queue

   for every neighbor in vertex:
      alternate = distances[vertex] + distance from vertex to neighbor

      if alternate < distances[neighbor]:
         distances[neighbor] = alternate
         previous[neighbor] = vertex
         add neighbor to queue

```

