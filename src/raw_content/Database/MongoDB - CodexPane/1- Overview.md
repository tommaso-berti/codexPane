# 1. Overview

## 
## **Databases**
Databases are systems that store, modify, and access structured collections of information electronically.
Database Management Systems (DBMS) allow developers to communicate via code or a graphical user interface with a database.
Databases can store a wide range of data types, including text, numbers, dates and times, and files of various types.

## **Database Management Systems (DBMS)**
Suppose a database is a bucket that stores our data. In that case, a DBMS is the software that encapsulates said bucket (our database(s)) and lets us work with the database using a programming language or easy-to-use graphical interface (GUI)

## Relational Databases
Relational databases, a common database class, organize data into tables of rows and columns of information and rely on relationships to organize data.
A relational database schema is typically pre-defined before data is entered.
All relational databases use SQL to allow developers to communicate with the database using a common language.
Relational databases can be costly to set up and scale. Performance and cost are big factors in using a relational database in an application.
## 
## Non-relational databases
Non-relational databases, another common database class, refer to any database that does not follow the relational model.
Non-relational databases typically have a more flexible schema and are more easily scaled than relational databases. However, the unstructured nature of the data can make it difficult to maintain, and each non-relational database has its own query language.

> NoSQL stands for “not-only SQL” (also called “non-relational”, or “non-SQL”) and refers to any database that stores data in any format other than relational tables.
NoSQL database technology grew in popularity due to datasets growing in size and complexity.
NoSQL databases may provide flexibility, scalability, and speed advantages.
NoSQL databases experience disadvantages such as lack of data integrity and lack of language standardization across different NoSQL databases.
Common types of NoSQL databases include key-value, document, graph, and column-oriented.

### **Advantages**
* **Flexibility and Scalability**: Non-relational database’s unstructured nature facilitates the design of flexible schemas (schemas that do not need to be defined beforehand) and makes these types of databases highly adaptable to the changing needs of an application. Additionally, non-relational databases are well suited for expansion or scalability and are relatively inexpensive to maintain compared to relational databases.
* **Custom Query Language**: Unlike relational databases that all use SQL as a standard query language, most NoSQL databases have their own custom language.

### **Unique Disadvantages**
Since the data in non-relational databases is mainly unstructured, data can often become hard to maintain and keep track of. Additionally, since every NoSQL database uses its own custom query language, there is a new learning curve for each one we choose to work with.

## MongoDb
A MongoDB instance can contain many databases, and within a database are collections of similar data. Collections contain individual records called documents that are stored as field-value pairs.
JSON is a human-readable but inefficient format for storing data; conversely, BSON is not human-readable but is highly efficient.
MongoDB users can easily store and manipulate data as JSON – even though internally, that data is stored as BSON.
MongoDB’s use of the document model, combined with its dual use of JSON and BSON, makes it a highly efficient and usable option for storing data. To continue learning and get a more in-depth overview of MongoDB data, check out the following two guides on JSON/BSON from MongoDB:
<u>[https://www.mongodb.com/docs/manual/tutorial/model-embedded-one-to-one-relationships-between-documents/](https://www.mongodb.com/docs/manual/tutorial/model-embedded-one-to-one-relationships-between-documents/)</u>