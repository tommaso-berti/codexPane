# 2. Statements

## 
The code below is a SQL statement. A *statement* is text that the database recognizes as a valid command. Statements always end in a semicolon  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     ;

 </span>
```
CREATE TABLE table_name (
   column_1 data_type, 
   column_2 data_type, 
   column_3 data_type
);

```

1. <u>[CREATE TABLE](https://www.codecademy.com/resources/docs/sql/commands/create-table?page_ref=catalog)</u> is a *clause*. Clauses perform specific tasks in SQL. By convention, clauses are written in capital letters. Clauses can also be referred to as commands.
5. table_name refers to the name of the table that the command is applied to.
6. (column_1 data_type, column_2 data_type, column_3 data_type) is a <u>*[parameter](https://www.codecademy.com/resources/docs/general/parameter)*</u>. A parameter is a list of columns, <u>[data types](https://www.codecademy.com/resources/docs/sql/data-types?page_ref=catalog)</u>, or values that are passed to a clause as an <u>[argument](https://www.codecademy.com/resources/docs/general/argument)</u>. Here, the parameter is a list of column names and the associated data type.
The structure of SQL statements vary. The number of lines used does not matter. A statement can be written all on one line, or split up across multiple lines if it makes it easier to read. 

## **Create**
CREATE statements allow us to create a new table in the database. You can use the CREATE statement anytime you want to create a new table from scratch. The statement below creates a new table named celebs.

```
CREATE TABLE celebs (
   id INTEGER, 
   name TEXT, 
   age INTEGER
);

```

1. CREATE TABLE is a clause that tells SQL you want to create a new table.
 <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     2. celebs
 </span> is the name of the table.
 <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     4. (id INTEGER, name TEXT, age INTEGER)
 </span> is a list of parameters defining each column, or attribute in the table and its data types:
* id is the first column in the table. It stores values of data type INTEGER
* name is the second column in the table. It stores values of data type TEXT
* age is the third column in the table. It stores values of data type INTEGER

## **Insert**
The INSERT statement inserts a new row into a table.
We can use the INSERT statement when you want to add new records. The statement below enters a record for Justin Bieber into the celebs table.

```
INSERT INTO celebs (id, name, age) 
VALUES (1, 'Justin Bieber', 29);

```

* <u>[INSERT INTO](https://www.codecademy.com/resources/docs/sql/commands/insert-into?page_ref=catalog)</u> is a clause that adds the specified row or rows.
* celebs is the table the row is added to.
* (id, name, age) is a parameter identifying the columns that data will be inserted into.
* VALUES is a clause that indicates the data being inserted.
* (1, 'Justin Bieber', 29) is a parameter identifying the values being inserted.
	* 1: an integer that will be added to id column
	* 'Justin Bieber': text that will be added to name column
	* 29: an integer that will be added to age column

## **Select**
SELECT statements are used to fetch data from a database. In the statement below, SELECT returns all data in the name column of the celebs table.

```
SELECT column_name FROM celebs;

```

1. <u>[SELECT](https://www.codecademy.com/resources/docs/sql/commands/select?page_ref=catalog)</u> is a clause that indicates that the statement is a query. You will use SELECT every time you query data from a database.
3. column_name specifies the column to query data from.
4. FROM celebs specifies the name of the table to query data from. In this statement, data is queried from the celebs table.
You can also query data from all columns in a table with SELECT.

```
SELECT * FROM celebs;

```

* is a special wildcard character that we have been using. It allows you to select every column in a table without having to name each one individually. Here, the result set contains every column in the celebs table.
SELECT statements always return a new table called the *result set*.
To select more columns at once, you can list them separated by a comma

```
SELECT column1, column2 
FROM table_name;

```


## **Alter**
The ALTER TABLE statement adds a new column to a table. You can use this command when you want to add columns to a table. The statement below adds a new column twitter_handle to the celebs table.

```
ALTER TABLE celebs 
ADD COLUMN twitter_handle TEXT;

```

1. ALTER TABLE  is a clause that lets you make the specified changes.
2.  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     celebs
 </span> is the name of the table that is being changed.
3.  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     ADD COLUMN
 </span> is a clause that lets you add a new column to a table:
* twitter_handle is the name of the new column being added
* TEXT is the data type for the new column
4.  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     NULL
 </span> is a special value in SQL that represents missing or unknown data. Here, the rows that existed before the column was added have  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     NULL
 </span> (∅) values for  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     twitter_handle
 </span>.

## **Update**
The UPDATE statement edits a row in a table. You can use the UPDATE statement when you want to change existing records. The statement below updates the record with an id value of 4 to have the twitter_handle @taylorswift13.

```
UPDATE celebs 
SET twitter_handle = '@taylorswift13' 
WHERE id = 4; 

```

1. UPDATE is a clause that edits a row in the table.
2.  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     celebs
 </span> is the name of the table.
3.  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     SET
 </span> is a clause that indicates the column to edit.
* twitter_handle is the name of the column that is going to be updated
* @taylorswift13 is the new value that is going to be inserted into the twitter_handle column.
4.  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     WHERE
 </span> is a clause that indicates which row(s) to update with the new column value. Here the row with a  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     4
 </span> in the  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     id
 </span> column is the row that will have the  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     twitter_handle
 </span> updated to  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     @taylorswift13
 </span>

## **Delete**
The DELETE FROM statement deletes one or more rows from a table. You can use the statement when you want to delete existing records. The statement below deletes all records in the celebs table with no twitter_handle:

```
DELETE FROM celebs 
WHERE twitter_handle IS NULL;

```

1. <u>DELETE FROM</u> is a clause that lets you delete rows from a table.
3. celebs is the name of the table we want to delete rows from.
4. WHERE is a clause that lets you select which rows you want to delete. Here we want to delete all of the rows where the twitter_handle column IS NULL.
5. IS NULL is a condition in SQL that returns true when the value is NULL and false otherwise.

## **Constraints**
<u>*[Constraints](https://www.codecademy.com/resources/docs/sql/constraints?page_ref=catalog)*</u> that add information about how a column can be used are invoked after specifying the data type for a column. They can be used to tell the database to reject inserted data that does not adhere to a certain restriction. The statement below sets *constraints* on the celebs table.

```
CREATE TABLE celebs (
   id INTEGER PRIMARY KEY, 
   name TEXT UNIQUE,
   date_of_birth TEXT NOT NULL,
   date_of_death TEXT DEFAULT 'Not Applicable'
);

```

1. PRIMARY KEY columns can be used to uniquely identify the row. Attempts to insert a row with an identical value to a row already in the table will result in a *constraint violation* which will not allow you to insert the new row.
4. UNIQUE columns have a different value for every row. This is similar to PRIMARY KEY except a table can have many different UNIQUE columns.
5. NOT NULL columns must have a value. Attempts to insert a row without a value for a NOT NULL column will result in a constraint violation and the new row will not be inserted.
6. DEFAULT columns take an additional argument that will be the assumed value for an inserted row if the new row does not specify a value for that column.
































