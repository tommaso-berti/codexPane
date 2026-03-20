# 4. Aggregate functions


Calculations performed on multiple rows of a table are called **aggregates**.

## Count
The fastest way to calculate how many rows are in a table is to use the COUNT() function. <u>[COUNT()](https://www.codecademy.com/resources/docs/sql/aggregate-functions/count?page_ref=catalog)</u> is a function that takes the name of a column as an <u>[argument](https://www.codecademy.com/resources/docs/general/argument)</u> and counts the number of non-empty values in that column.

```
SELECT COUNT(*)
FROM table_name;

```

Here, we want to count every row, so we pass * as an argument inside the parenthesis.

## **Sum**
SQL makes it easy to add all values in a particular column using SUM(). <u>[SUM()](https://www.codecademy.com/resources/docs/sql/aggregate-functions/sum?page_ref=catalog)</u> is a function that takes the name of a column as an <u>[argument](https://www.codecademy.com/resources/docs/general/argument)</u> and returns the sum of all the values in that column.

```
SELECT SUM(downloads)
FROM fake_apps;

```

This adds all values in the downloads column.

## **Max / Min**
The MAX() and MIN() functions return the highest and lowest values in a column, respectively. 
- <u>[MAX()](https://www.codecademy.com/resources/docs/sql/aggregate-functions/max?page_ref=catalog)</u> takes the name of a column as an <u>[argument](https://www.codecademy.com/resources/docs/general/argument)</u> and returns the largest value in that column. Here, we returned the largest value in the downloads column.
- <u>[MIN()](https://www.codecademy.com/resources/docs/sql/aggregate-functions/min?page_ref=catalog)</u> works the same way but it does the exact opposite; it returns the smallest value.

## **Average**
SQL uses the <u>[AVG()](https://www.codecademy.com/resources/docs/sql/aggregate-functions/avg?page_ref=catalog)</u> function to quickly calculate the average value of a particular column.
The AVG() function works by taking a column name as an <u>[argument](https://www.codecademy.com/resources/docs/general/argument)</u> and returns the average value for that column.

```
SELECT AVG(downloads)
FROM fake_apps;

```


## **Round**
By default, SQL tries to be as precise as possible without rounding. We can make the result table easier to read using the ROUND() function. <u>[ROUND()](https://www.codecademy.com/resources/docs/sql/commands/round?page_ref=catalog)</u> function takes two arguments inside the parenthesis:
1. a column name
2. an integer
It rounds the values in the column to the number of decimal places specified by the integer.

```
SELECT ROUND(price, 0)
FROM fake_apps;

```


## **Group By**
For instance, we might want to know the mean IMDb ratings for all movies each year. We could calculate each number by a series of queries with different WHERE statements, like so:

```
SELECT AVG(imdb_rating)
FROM movies
WHERE year = 1999;

SELECT AVG(imdb_rating)
FROM movies
WHERE year = 2000;

SELECT AVG(imdb_rating)
FROM movies
WHERE year = 2001;

```

We can use <u>[GROUP BY](https://www.codecademy.com/resources/docs/sql/commands/group-by?page_ref=catalog)</u> to do this in a single step:

```
SELECT year,
   AVG(imdb_rating)
FROM movies
GROUP BY year
ORDER BY year;

```

GROUP BY is a clause in SQL that is used with aggregate functions. It is used in collaboration with the SELECT statement to arrange identical data into *groups*.
The GROUP BY statement comes after any <u>[WHERE](https://www.codecademy.com/resources/docs/sql/commands/where?page_ref=catalog)</u> statements, but before <u>[ORDER BY](https://www.codecademy.com/resources/docs/sql/commands/order-by?page_ref=catalog)</u>  or <u>[LIMIT](https://www.codecademy.com/resources/docs/sql/commands/limit?page_ref=catalog)</u>.
Sometimes, we want to <u>[GROUP BY](https://www.codecademy.com/resources/docs/sql/commands/group-by?page_ref=catalog)</u> a calculation done on a column.

```
SELECT ROUND(imdb_rating),
   COUNT(name)
FROM movies
GROUP BY ROUND(imdb_rating)
ORDER BY ROUND(imdb_rating);

```

SQL lets us use column reference(s) in our  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     GROUP BY
 </span> that will make our lives easier.
* 1 is the first column selected
* 2 is the second column selected
* 3 is the third column selected
The following query is equivalent to the one above:

```
SELECT ROUND(imdb_rating),
   COUNT(name)
FROM movies
GROUP BY 1
ORDER BY 1;

```

Here, the 1 refers to the first column in our SELECT statement, ROUND(imdb_rating).

**Example**

```
SELECT 
  strftime('%H', timestamp) AS 'Timestamp', 
  ROUND(AVG(score)) as 'Score Average', 
  COUNT(*) AS 'Count'
FROM hacker_news
WHERE timestamp IS NOT NULL
GROUP BY 1
ORDER BY 2 DESC;

```

Even though `GROUP BY` is written later in the query, the grouping happens before the aggregation functions like `AVG()` or `COUNT()` are calculated. First, the data is divided into groups, then the aggregate values are calculated for each group.

## **Having**
HAVING is very similar to WHERE. In fact, all types of WHERE clauses you learned about thus far can be used with HAVING.

```
SELECT year,
   genre,
   COUNT(name)
FROM movies
GROUP BY 1, 2
HAVING COUNT(name) > 10;

```

* When we want to limit the results of a query based on values of the individual rows, use WHERE.
* When we want to limit the results of a query based on an aggregate property, use HAVING.
HAVING statement always comes after GROUP BY, but before <u>[ORDER BY](https://www.codecademy.com/resources/docs/sql/commands/order-by?page_ref=catalog)</u> and <u>[LIMIT](https://www.codecademy.com/resources/docs/sql/commands/limit?page_ref=catalog)</u>.
































