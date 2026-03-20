# 4. CRUD OPERATIONS










**db.*****collectionName.operator()***

## .find()

```
db.<collection>.find()

```


Find an element in a collection. First parameter is the filter, second is the projection (1 to keep, 0 to exclude)
Example

```
db.collectionName.find({attribute: value}, {pippo:1, pluto:0})

```


Notice the .find() method must be called on a specific collection. When we call .find() without arguments, it will match all of the documents in the specified collection. If our query is successful, MongoDB will return a cursor, an object that points to the documents matched by our query. Because our queries could potentially match large numbers of documents, MongoDB uses cursors to return our results in batches.
In other words, when we query collections using the .find() method, MongoDB will return up to the first set of matching documents. If we want to see the next batch of documents, we use the it keyword (short for iterate).

### Example
Find all the restaurants where the name of the street where the restaurant is located starts with the letter "C" or any alphanumeric character that comes before it.
You can query the embedded field using the .find() method with the $lte operator like so

```
db.<collection>.find({"<parent_field>.<embedded_field>": { $lte: <value> }})

```


