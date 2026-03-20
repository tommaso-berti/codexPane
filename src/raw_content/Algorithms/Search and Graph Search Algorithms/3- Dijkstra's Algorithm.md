# 3. Dijkstra's Algorithm


Fortunately, there is an <u>[algorithm](https://www.codecademy.com/resources/docs/general/algorithm)</u> that computes the shortest distance from a given vertex to the rest of the vertices in a graph. This is called ***Dijkstra’s Algorithm***.
Dijkstra’s Algorithm works as following:
1. Instantiate a <u>[dictionary](https://www.codecademy.com/resources/docs/general/data-structures/dictionary)</u> that will eventually map vertices to their distance from the start vertex
4. Assign the start vertex a distance of 0 in a min heap
5. Assign every other vertex a distance of infinity in a min heap
6. Remove the vertex with the smallest distance from the min heap and set that to the current vertex
7. For the current vertex, consider all of its adjacent vertices and calculate the distance to them as **(distance to the current vertex) + (edge weight of current vertex to adjacent vertex)**.
10. If this new distance is less than the current distance, replace the current distance.
11. Repeat 4 and 5 until the heap is empty
12. After the heap is empty, return the distances

## Complexity
How efficient is Dijkstra’s algorithm? Let’s break it into different parts:
* Searching through the graph
* Keeping track of distances
Just like breadth-first search and depth-first search, to search through an entire graph, in the worst case, we would go through all of the edges and all of the vertices resulting in a <u>[runtime](https://www.codecademy.com/resources/docs/general/runtime)</u> of O(E + V).
For Dijkstra’s, we use a min-heap to keep track of all the distances. Searching through and updating a min-heap with V nodes takes O(log V) because in each layer of the min-heap, we reduce the number of nodes we are looking at by a factor of 2.
In the worst case, we would update the min-heap every iteration. Since there are at most E + V iterations of Dijkstra’s and it takes log V to update a min-heap in the worst case, then the runtime of Dijkstra’s is **O((E+V)log V)**.
