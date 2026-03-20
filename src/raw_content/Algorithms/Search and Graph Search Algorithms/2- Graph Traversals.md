# 2. Graph Traversals


Using <u>[graphs](https://www.codecademy.com/resources/docs/general/graphs)</u> to model complex networks is pretty swell, but one way that graphs can really come in handy is with *graph search* algorithms. You can use a graph search <u>[algorithm](https://www.codecademy.com/resources/docs/general/algorithm)</u> to traverse the entirety of a graph data structure in search of a specific vertex value.
There are two common approaches to using a graph search to progress through a graph:
* depth-first search, known as *DFS* follows each possible path to its end
* breadth-first search, known as *BFS* broadens its search from the point of origin to an ever-expanding circle of neighboring vertices
To enable searching, we add vertices to a list, *visited*. This list is pretty important because it keeps the search from visiting the same vertex multiple times! This is particularly vital for cyclical graphs where you might otherwise end up in an infinite loop.
So how do you calculate the <u>[runtime](https://www.codecademy.com/resources/docs/general/runtime)</u> for graph search algorithms?
In an upper bound scenario, we would be looking at every vertex and every edge. Because of this, the big O runtime for both depth-first search and breadth-first search is O(vertices + edges).

## **Depth-First Search (DFS) Conceptual**
Depth-first search algorithms check the values along a path of vertices before moving to another path.
While this isn’t exactly ideal when you want to find the shortest path between two points, DFS can be very helpful for determining *if* a path even exists.
In order to accomplish this path-finding feat, DFS implementations use either a stack data structure or, more commonly, recursion to keep track of the path the search is on and the current vertex.
In a stack implementation, the most recently added vertex is popped off the stack when the search has reached the end of the path. Meanwhile, in a recursive implementation, the DFS function is recursively called for each connected vertex.

## **Breadth-First Search (BFS) Conceptual**
Breadth-first search, known as *BFS*, checks the values of all neighboring vertices before moving into another level of depth.
This is an incredibly inefficient way to find just *any* path between two points, but it’s an excellent way to identify the *shortest path* between two vertices. Because of this, BFS is helpful for figuring out directions from one place to another.
Unlike DFS, BFS graph search implementations use a queue data structure to keep track of the current vertex and vertices that still have unvisited neighbors. In BFS graph search a vertex is dequeued when all neighboring vertices have been visited.

## **Graph Search Traversal Order**
What if you don’t need to find a path, but you *do* need to get a list of all the values in a graph?
Well, it turns out that in addition to path-finding, depth-first search is pretty adept at organizing vertices (or vertex values) with a clear order of visitation from beginning to end.
There are three main traversal orders that you’ll come across for graph traversal:
* *Preorder*, in which each vertex is added to the “visited” list and added to the output list BEFORE getting added to the stack
* *Postorder*, in which each vertex is added to the “visited” list and added to the output list AFTER it is popped off the stack
* Reverse Post-Order (also known as *Topological Sort*), which returns an output list that is exactly the reverse of the post-order list
