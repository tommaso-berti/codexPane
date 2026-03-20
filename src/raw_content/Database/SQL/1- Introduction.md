# 1. Introduction


<u>[SQL](https://www.codecademy.com/resources/docs/sql/about-sql)</u> , **S**tructured **Q**uery **L**anguage, is a programming language designed to manage data stored in <u>[relational databases](https://www.codecademy.com/resources/docs/general/database/relational-database)</u>. SQL operates through simple, declarative statements. This keeps data accurate and secure, and helps maintain the integrity of <u>[databases](https://www.codecademy.com/resources/docs/general/database?page_ref=catalog)</u> , regardless of size.
The SQL language is widely used today across web frameworks and database applications. Knowing SQL gives you the freedom to explore your data, and the power to make better decisions. By learning SQL, you will also learn concepts that apply to nearly every data storage system.
The statements covered in this course use SQLite Relational Database Management System <u>[(RDBMS)](https://www.codecademy.com/articles/what-is-rdbms-sql)</u>. You can also access a glossary of all the <u>[SQL commands](https://www.codecademy.com/articles/sql-commands)</u> taught in this course.

## Relational database
A <u>*[relational database](https://www.codecademy.com/resources/docs/general/relational-database?page_ref=catalog)*</u> is a <u>[database](https://www.codecademy.com/resources/docs/general/database?page_ref=catalog)</u> that organizes information into one or more tables. Here, the relational database contains one table.
A *table* is a collection of data organized into rows and columns. Tables are sometimes referred to as *relations*. Here the table is  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     celebs
 </span>.
A *column* is a set of data values of a particular type. Here,  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     id
 </span>,  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     name
 </span>, and  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     age
 </span> are the columns.
A *row* is a single record in a table. The first row in the  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     celebs
 </span> table has:
* An id of 1
* A name of Justin Bieber
* An age of 29
All data stored in a relational database is of a certain <u>[data type](https://www.codecademy.com/resources/docs/sql/data-types?page_ref=catalog)</u>. Some of the most common data types are:
* INTEGER, a positive or negative whole number
* TEXT, a text string
* DATE, the date formatted as YYYY-MM-DD
* REAL, a decimal value
 <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     All fields ends with .sqlite extension

 </span>
























