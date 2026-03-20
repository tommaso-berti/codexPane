# 2. Commands


To see all databases inside a cluster

```
show dbs 

```

This will output a list of all the databases in our current instance and the disk space each takes up. Here is what it might look like:

```
online_plant_shop       73.7 KiB
plant_lovers_meet       55.7 MiB
my_portfolio_site       9.57 MiB
admin                    340 KiB
local                   1.37 GiB
config                 12.00 KiB

```

Looking at the example output above, notice three unique databases: admin, config, and local. These databases are included by MongoDB to help configure our instance. In addition, we have our three databases for each of our freelance projects.

To navigate to a particular database, we can run

```
use <database_name>

```

For example, if we wanted to use our e-commerce database, we’d run ***use online_plant_shop***. This would place us inside our online_plant_shop database, where we have the option to view and manage all of its collections. 

> It’s important to note, that if the database we specify does not exist, MongoDB will create it, and place us inside of that database.

> Notice that the terminal will list the current database we are in before a > symbol. When we switch databases, we should see the name of the database we switched into displayed there instead. In this case, we can see the prompt changed from test> to online_plant_shop>.

If at any point we lose track of what database we are in, we can orient ourselves by running the command

```
db

```

This will output the name of the database we are currently using.

Show all collections inside a db

```
show collections

```

