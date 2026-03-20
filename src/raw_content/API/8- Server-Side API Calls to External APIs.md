# 8. Server-Side API Calls to External APIs

<u>[supabase](https://supabase.com/)</u>

## **Overview**
This project adds persistent storage to the RESTful Restaurants application by connecting an Express.js backend to **Supabase (PostgreSQL hosted API)**.
The backend becomes a middle layer:

```
Frontend → Express API → Supabase → PostgreSQL

```

The frontend never talks directly to Supabase.
Only the server does → safer keys and controlled access.

## **1. Environment Configuration**
Sensitive credentials must never be committed to the repository.
Create:

```
backend/.env

SUPABASE_URL=your_project_url
SUPABASE_SECRET=your_service_role_key

```

Add to  <span style="font-family: .AppleSystemUIFontMonospaced-Regular; font-size: 12.0;">
     .gitignore
 </span>:

```
.env

```

### 
### **Why**
* Prevents leaking database access
* Allows different environments (dev, staging, production)

## **2. Supabase Provider (Database Client)**

```
backend/provider/supabase.js
```

 <span style="font-family: .AppleSystemUIFont; font-size: 13.0;">
     
```


```


 </span>Purpose: create a reusable database client shared across routes.
## **Steps performed**
1. Load environment variables
2. Import Supabase SDK
3. Create client instance
4. Export client
### 
### **Result**
Every route can now execute database queries without re-configuring authentication.
Conceptually:

```
Load secrets → create client → export → reuse everywhere

```

This avoids:
* duplicated configuration
* inconsistent connections
* hardcoded credentials

## **3. Database Structure**
Two relational tables are used.
## 
### **restaurants**
Main data table.
| column          | type            | notes           |
|-----------------|-----------------|-----------------|
| id              | uuid            | primary key     |
| name            | text            | restaurant name |

### **starred_restaurants**
User favorites/comments.
| column              | type                | notes               |
|---------------------|---------------------|---------------------|
| id                  | uuid                | primary key         |
| restaurantId        | uuid                | FK → restaurants.id |
| comment             | text                | user note           |

### 
### **Relationship**

```
restaurants 1 ────< starred_restaurants

```

Cascade delete ensures data integrity:
If a restaurant is removed → related starred entries disappear automatically.

## 4. Backend API Behavior
Routes do not store data locally anymore.
They now act as **proxies** to Supabase.
### 
### **Flow example (GET /restaurants)**

```
Client request
    ↓
Express route
    ↓
Supabase query
    ↓
Database
    ↓
JSON response

```

The backend is responsible for:
* Validation
* Query execution
* Error handling
* Response formatting

## **5. Why This Architecture Matters**
## 
### **Security**
The Supabase service key stays on the server only.
### 
### **Scalability**
You can replace:
* Supabase → another DB
* Frontend → mobile app
Without rewriting everything.
## 
### **Maintainability**
Single source of truth: database instead of in-memory data.

## **6. What Changed From the Original Project**
Before:

```
Data reset every restart
Stored in memory

```

After:

```
Persistent storage
Shared across sessions
Real database relations

```


## **Key Takeaway**
You are not just “adding a database”.
You are introducing a **3-tier architecture**:

```
Presentation Layer → Frontend
Application Layer → Express API
Data Layer → Supabase PostgreSQL

```

That’s the real goal of the exercise.



