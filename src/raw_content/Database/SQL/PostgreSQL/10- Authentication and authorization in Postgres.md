# 10. Authentication and authorization in Postgres


## **Host-Based Authentication**
Your first stop is pg_hba.conf, a file that configures host-based authentication in Postgres. The pg_hba.conf file allows you to specify rules for how Postgres should handle different connections. Rules can apply narrowly or broadly, depending on how precise the parameters are.
In the  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     pg_hba.conf
 </span> file, all the entries follow the same basic format, with blank lines or lines beginning with a  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     #
 </span> symbol being ignored. The basic format of entries is:

```
connection_type  db  user  address  auth_method  [auth_options

```

### Example
Let’s build and entry together. The entry we’ll be building will allow <u>[SSL](https://www.codecademy.com/resources/docs/general/ssl)</u>connections to a <u>[database](https://www.codecademy.com/resources/docs/general/database)</u> called  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     db_example
 </span> for members of the  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     g_example
 </span> group on the same network as the <u>[server](https://www.codecademy.com/resources/docs/general/server)</u> and use sha-256 password authentication.
* connection_type will be hostssl, which matches external connections that use SSL. host is like hostssl, but matches connections that don’t use SSL as well.
* db will be db_example. The keyword all can be used to match all databases.
* user will be +g_example. The + matches users who are members of this group, rather than the group itself. If we were creating a rule for a specific user, we would omit the +. The keyword all can be used to match all users.
* address will be samenet, a shorthand for connections on the same subnet as the server. Specific IP addresses can be put here as well. The keyword all can be used to match any address.
* auth_method will be scram-sha-256. There are other options, including reject, which unconditionally rejects connections matching the rule.
* We’ll leave auth-options blank.
All together, it looks like:

```
hostssl  db_example  +g_example  samenet  scram-sha-256

```

We can also chain more permissions

```
host db_customers +g_employees samenet scram-sha-256

host db_employees +g_hr samenet scram-sha-256

hostssl all u_owner 104.20.25.250 scram-sha-256

host all all all reject

```


## **User and Role Management**
See **3. Database security**
* Permissions will determine privileges based on tasks, such as reading and writing to a given table.
* Groups will be collections of permissions, and represent a group of users.
* Users represent specific people or applications, and join groups based on what their job is.

## **Server Configuration**
Automated tools are widely used by hackers to scan targets and determine what software they are running. Scanning too much or too quickly greatly increases the risk of detection, so the tools are often configured to scan specific ports that are widely used, such as  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     21
 </span>,  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     22
 </span>,  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;text-align: left;">
     80
 </span>, etc…
We’ll be changing three parameters in this exercise:
* The listen_addresses <u>[parameter](https://www.codecademy.com/resources/docs/general/parameter)</u> controls what IP addresses are allowed to connect to the server. An IP address that isn’t allowed to connect won’t even be able to try to authenticate. Setting this to '*' allows connections from any address to try and authenticate, but this is generally a bad idea! This parameter supports <u>[CIDR notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#:~:text=CIDR%20notation%20is%20a%20compact,bits%20in%20the%20network%20mask.)</u>, and can have multiple entries separate by commas.
* The port parameter is the port the Postgres server listens on. Port numbers 49152—65535 aren’t reserved by any software, so a port in this range usually doesn’t conflict with any other software.
* The ssl parameter determines whether or not the server will support <u>[SSL](https://www.codecademy.com/resources/docs/general/ssl)</u> connections. In a real environment, the server also needs to be provided with the appropriate certificate and key.
