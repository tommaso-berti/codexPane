# 9. Seek vs Scan

# 9. **Seek vs Scan**

SQL Server uses Seek and Scan, PostgreSQL uses Scan, Index Scan and Bitmap Heap Scan.

## Scan
A scan searches through every record in a database table/view to find the records being asked for. So in our example, if you wanted customers that have spent over $10k, the system would need to check every record to see if their order amount was over this threshold.

```
SELECT *
FROM customers;

```

Because the query is looking for every record in the table, the server will use a scan to search through every record.

## Seek
A seek uses an index to find the specific records being asked for by jumping to their location and either grabbing the data or, if it is a reference, using it to get the information.
When you search for rows where the amount spent is over $10K, now the system can jump almost immediately to the records you are searching for (barring some restrictions we will cover in a bit).
A seek can only be done when the database server has an organized way to search through the target table/view. This is done by having an index covering your search criteria. Make sure to plan your database tables/views with good indexes (including primary keys) to increase the chance that a seek can be used to improve the efficiency of queries.

```
SELECT *
FROM customers
WHERE city = 'Pittsburgh';

```

This would use a seek (assuming the customers table has an index on city and customers in ‘Pittsburgh’ don’t make up a large portion of all records), jumping almost instantly right to the specific record you are searching for.

## **When does the server decide to use one over the other?**
In general, the database server will use a seek or a scan based on the specific query and it makes its best guess of which way would be faster. This is part of the pre-processing that a server does before it actually runs any query you write. For instance, if you are doing a search on a primary key column for a limited subset of the entire table, the server will most likely use a seek to jump right to the records you are looking for. If you are looking up table records by a column(s) with no index or for a large percentage of the total table, the server will most likely use a scan. In these cases the system would have to look at all or almost all records anyway, so using a seek wouldn’t offer any benefit and could possibly take longer.

## **What is out of your hands**
The DB server decides if it should use a seek or scan. This means that even if you write your query to take advantage of a good index, the server might ignore this and run the query using a scan. But why would it do this? If you are examining over 50% - 70% of the records in the table then seeking no longer offers any advantage. If you are regularly skipping the benefits of your indexes, they might need to be reexamined to see if the costs outweigh the benefits.

```
SELECT *
FROM customers
WHERE customer_id > 100;

```

If our database has a reasonable number of clients, for instance in the thousands, then the system will ignore the seek option and instead scan through every record in the table. The server will predict that the number of rows returned will be large enough that seeking for each match would not be any faster.

## **Speeding up queries**
If you are searching the same set of records from a table/view more than once in a block of code, put the filtered rows into an object such as a temp table, table variable, or view depending on the situation. This will eliminate the need to have to search the table/view for the same set of records more than once.
As a small example, you could search for two different things in a database of book orders, both of which need the same set of customers and their orders, but then are restricted by the books. This could be written as:

```
SELECT
    c.first_name,
    c.last_name,
    b.title,
    b.original_language
FROM customers    AS c
INNER JOIN orders    AS o    ON o.customer_id = c.customer_id
INNER JOIN books    AS b    ON b.book_id = o.book_id
WHERE c.state_name = 'Texas'
    AND b.original_language = 'Czech';
    
SELECT
    c.first_name,
    c.last_name,
    b.title,
    b.original_language
FROM customers    AS c
INNER JOIN orders    AS o    ON o.customer_id = c.customer_id
INNER JOIN books    AS b    ON b.book_id = o.book_id
WHERE c.state_name = 'Texas'
    AND b.first_published  < 1990;

```

Alternatively, you could create a temp table and filter the customers and their orders first. Since you want the same set of information in both queries, this saves the server from repeating work. Here is how you could rewrite the above using a temp table.

```
CREATE TEMP TABLE myTemp(first_name VARCHAR(100), last_name VARCHAR(100), book_id INTEGER);

INSERT INTO myTemp (first_name, last_name, book_id)
SELECT
    c.first_name,
    c.last_name,
    o.book_id
FROM customers    AS c
INNER JOIN orders    AS o    ON o.customer_id = c.customer_id
WHERE c.state_name = 'Texas';

SELECT
    m.first_name,
    m.last_name,
    b.title,
    b.original_language
FROM myTemp    AS m
INNER JOIN books    AS b    ON b.book_id = m.book_id
    AND b.original_language = 'Czech';
    
SELECT
    m.first_name,
    m.last_name,
    b.title,
    b.original_language
FROM myTemp    AS m
INNER JOIN books    AS b    ON b.book_id = m.book_id
    AND b.first_published  < 1990;
  
DROP TABLE myTemp;

```










































# 
