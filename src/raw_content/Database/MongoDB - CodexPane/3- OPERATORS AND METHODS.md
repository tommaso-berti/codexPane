# 3. OPERATORS AND METHODS


## Operators
### < <= > >=
Tutti i seguenti operatori possono essere usati per numeri, date o anche stringhe
- $gt greater than
- $gte greater or equal than
- $lt lower than (also for string)
- $lte lower or equal then (also for string)
- $eq equal to

### Query on arrays
- If an array of values is specified, the array is matched with the given array with the exact values and order
- array : [“val1”, “val2”]
- If a single value is specified as a string, all arrays containing that element included will be returned
- array : “val1”
- $all -> returns all arrays with that given array elements without considering the order of values
- array : {$all : [“val1”, “val2”]}
- $elemMatch-> used in queries to specify multiple criteria on the elements of an array field, such that any returned documents have at least one array element that satisfies all the specified criteria.

- When a collection’s record has an embedded document, we can query the fields inside of it using dot notation (.) and wrapping the fields in quotation marks.


## Methods
* .sort() method to sort our query results by a particular field in ascending or descending order. We can include a projection in our query to include or exclude certain fields from our returned documents.
* The <u>[.count()](https://www.mongodb.com/docs/manual/reference/method/db.collection.count/?utm_campaign=academia_partners&utm_source=codecademy&utm_medium=referral)</u> method returns the number of documents that match a query.
* The <u>[.limit()](https://www.mongodb.com/docs/manual/reference/method/cursor.limit/?utm_campaign=academia_partners&utm_source=codecademy&utm_medium=referral)</u> method can be chained to the .find() method, and specifies the maximum number of documents a query will output.
* The <u>[$exists](https://www.mongodb.com/docs/manual/reference/operator/query/exists/?utm_campaign=academia_partners&utm_source=codecademy&utm_medium=referral)</u> operator can be included in a query filter to only match documents that contain the given field.
* The <u>[$ne](https://www.mongodb.com/docs/v6.0/reference/operator/query/ne/?utm_campaign=academia_partners&utm_source=codecademy&utm_medium=referral)</u> operator helps check if a field is not equal to a specified value.
* The <u>[$and](https://www.mongodb.com/docs/manual/reference/operator/query/and/?utm_campaign=academia_partners&utm_source=codecademy&utm_medium=referral)</u> and <u>[$or](https://www.mongodb.com/docs/manual/reference/operator/query/or/?utm_campaign=academia_partners&utm_source=codecademy&utm_medium=referral)</u> operators help perform AND or OR logic operators.
* Lastly, if you are looking for a way to make query outputs look a bit more “pretty”, you can use the <u>[.pretty()](https://www.mongodb.com/docs/manual/reference/method/cursor.pretty/?utm_campaign=academia_partners&utm_source=codecademy&utm_medium=referral)</u> method!
