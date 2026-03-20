# 1. What is a Relational Database Management System


A *database* is a set of data stored in a computer. This data is usually structured in a way that makes the data easily accessible.
A *relational database* is a type of database. It uses a structure that allows us to identify and access data *in relation* to another piece of data in the database. Often, data in a relational database is organized into tables.

## **Tables: Rows and Columns**
Tables can have hundreds, thousands, sometimes even millions of rows of data. These rows are often called *records*.
Tables can also have many *columns* of data. Columns are labeled with a descriptive name (say,  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     age
 </span> for example) and have a specific *data type*.
For example, a column called  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     age
 </span> may have a type of  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     INTEGER
 </span> (denoting the type of data it is meant to hold).

## **RDBMS**
A relational database management system (RDBMS) is a program that allows you to create, update, and administer a relational database. Most relational database management systems use the SQL language to access the database.

## **What is SQL?**
SQL (**S**tructured **Q**uery **L**anguage) is a <u>[programming language](https://www.codecademy.com/resources/blog/programming-languages/)</u> used to communicate with data stored in a relational database management system. SQL syntax is similar to the English language, which makes it relatively easy to write, read, and interpret.
Many RDBMSs use SQL (and variations of SQL) to access the data in tables. For example, SQLite is a relational database management system. SQLite contains a minimal set of SQL commands (which are the same across all RDBMSs). Other RDBMSs may use other variants.

Here is a brief description of popular RDBMSs:
<u>**[MySQL](https://www.mysql.com/)**</u>
MySQL is the most popular open source SQL database. It is typically used for web application development, and often accessed using PHP.
Some of the disadvantages are that it has been known to suffer from poor performance when scaling, open source development has lagged since Oracle has taken control of MySQL, and it does not include some advanced features that developers may be used to.
<u>**[PostgreSQL](https://www.postgresql.org/)**</u>
PostgreSQL is an open source SQL database that is not controlled by any corporation. It is typically used for web application development.
PostgreSQL shares many of the same advantages of MySQL. It is easy to use, inexpensive, reliable and has a large community of developers. It also provides some additional features such as foreign key support without requiring complex configuration.
The main disadvantage of PostgreSQL is that it can be slower in performance than other databases such as MySQL. It is also slightly less popular than MySQL.
For more information about PostgreSQL including installation instructions, read <u>[this](https://www.codecademy.com/paths/design-databases-with-postgresql/tracks/what-is-a-database/modules/using-postgresql-on-your-own-computer/articles/installing-and-using-postgresql-locally)</u> article.
<u>**[Oracle DB](https://www.oracle.com/database/)**</u>
Oracle Corporation owns Oracle Database, and the code is not open sourced.
Oracle DB is for large applications, particularly in the banking industry. Most of the world’s top banks run Oracle applications because Oracle offers a powerful combination of technology and comprehensive, pre-integrated business applications, including essential functionality built specifically for banks.
The main disadvantage of using Oracle is that it is not free to use like its open source competitors and can be quite expensive.
<u>**[SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-2017)**</u>
Microsoft owns SQL Server. Like Oracle DB, the code is close sourced.
Large enterprise applications mostly use SQL Server.
Microsoft offers a free entry-level version called *Express* but can become very expensive as you scale your application.
<u>**[SQLite](https://www.sqlite.org/)**</u>
SQLite is a popular open source SQL database. It can store an entire database in a single file. One of the most significant advantages this provides is that all of the data can be stored locally without having to connect your database to a server.
SQLite is a popular choice for databases in cellphones, PDAs, MP3 players, set-top boxes, and other electronic gadgets. The SQL courses on Codecademy use SQLite.
For more info on SQLite, including installation instructions, read <u>[this](https://www.codecademy.com/courses/learn-sql/articles/what-is-sqlite)</u> article.









































