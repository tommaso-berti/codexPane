# 4. ACID Properties


When working in any database, the units of work can be measured by transactions. **Transactions** are a single task that is being performed on the database. These transactions must maintain ACID properties, which is what will be discussed in this article.
These ACID properties are rules that the transaction must follow. In this article, we will use the following as a representation of transactions for our examples:
| T1           |
|--------------|
| Write(item1) |
| Write(item2) |
| Read(item2)  |

A “write” in these examples could be something like an INSERT statement, while a “read” could be something like a SELECT statement.
## 
ACID is an acronym meaning Atomic, Consistent, Isolated, and Durable. These properties help ensure that all the data in a transaction is complete, accurate, and has integrity. These properties also assist in recovering databases in case of a system failure and allows for concurrent use of a database.

## **An Atomic Database Transaction**
The definition of atomic when discussing ACID properties, <u>[according to IBM](https://www.ibm.com/docs/en/cics-ts/5.1?topic=processing-acid-properties-transactions)</u>, is “all changes to data are performed as if they are a single operation. That is, all the changes are performed, or none of them are.” This means that we treat each transaction as a single operation. If a single task in the transaction fails, then the entire transaction will fail. For example, let’s look at the following transaction.
| T1           |
|--------------|
| Read(item1)  |
| Write(item2) |
| Read(item2)  |

If any of the steps in this transaction fails, then the entire transaction would fail. If we go through steps 1 and 2, and then step 3 fails, the entire transaction would fail and all the steps would be reverted to the original state before the transaction. In this case, that would mean that even though the writing of item 2 worked, that write would be reverted.

## **A Consistent Database Transaction**
In any database, certain rules can and will most likely be put in place to make sure that all of the data within it is valid, or consistent. Transactions must follow these rules in order to maintain *consistency*. <u>[IBM defines consistency](https://www.ibm.com/docs/en/cics-ts/5.1?topic=processing-acid-properties-transactions)</u> as “Data is in a consistent state when a transaction starts and when it ends.” This is a pretty vague definition, but will make sense once an example is displayed.
Inside of a banking application, whenever money is transferred from one account to another, we need to make sure that the no money was lost or added to the transaction. To do this, we would add the funds from both accounts together and store that value, transfer the money, then add the account values and check the initial value to make sure both are equal. This could be done like below.
| T1                              |
|---------------------------------|
| Save(ac1 + ac2) as InitialValue |
| Transfer $20 from ac1 to ac2    |
| Check(ac1 + ac2 = InitialValue) |


## **Isolation in a Database**
When working with multiple transactions that could occur at once, it is important to ensure that when one transaction is reading or writing from a location in to a database, no other transaction is reading or writing from that same location. This process is called *isolation* and is <u>[defined by IBM](https://www.ibm.com/docs/en/cics-ts/5.1?topic=processing-acid-properties-transactions)</u> as “The intermediate state of a transaction is invisible to other transactions. As a result, transaction that run concurrently appear to be serialized.”
For example, if we had one transaction changing a row in a table, and another transaction trying to read data from that same table, these two transaction would not be able to operate at the same time. Instead, these transaction would execute one at a time. For example, let’s look at the following transactions.
| T1           | T2           |
|--------------|--------------|
| Read(item1)  | Read(item2)  |
| Write(item2) | Write(item3) |
| Write(item1) | Write(item2) |

This does not mean that we cannot perform multiple transactions at once. We can still have multiple transactions happen, it’s just that no two transactions can read or write from the same location at the same time. Otherwise, we could encounter issues where a transaction could use old data or a transaction could overwrite new data with old data.

## **A Durable Database**
When we talk about a transaction being *durable*, we will use the <u>[IBM definition](https://www.ibm.com/docs/en/cics-ts/5.1?topic=processing-acid-properties-transactions)</u> of durable which is “after a transaction successfully completes, changes to data persist and are not undone, even in the event of a system failure.” These failures include instances of service outages and crashes. Durability can be achieved through a number of methods including change logs that are referenced whenever the database is restarted for whatever reason.






































