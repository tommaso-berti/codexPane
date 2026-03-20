# 2. Implementing MVC Architecture in a Full-Stack App

# 2. **Implementing MVC Architecture in a Full-Stack App**
Example available on [https://github.com/tommaso-berti/mvc-architecture-for-full-stack-app-react](https://github.com/tommaso-berti/mvc-architecture-for-full-stack-app-react)
Or [https://github.com/tommaso-berti/mvc-to-do-list](https://github.com/tommaso-berti/mvc-to-do-list)

**Stack:** React + Express + Node + PostgreSQL
**Goal:** Structure the app using MVC so UI, logic and data stay independent.

## Architecture Overview
MVC divides responsibilities into 3 layers:

```
View        → UI (React)
Controller  → Business logic (Express routes + handlers)
Model       → Database access (PostgreSQL queries)

```

## 
## **Data Flow**

```
User action
   ↓
React (View)
   ↓ HTTP request
Express Route (Controller)
   ↓
Model (DB query)
   ↓
Controller formats response
   ↓
React updates UI

```

Key idea:
The View never talks directly to the database.

## **Project Structure**

```
root
 ├── server.js          → Express entry point
 ├── routes/            → HTTP endpoints
 ├── controllers/       → request logic
 ├── models/            → database queries
 ├── utils/             → validation/helpers
 └── view/              → React frontend

```


## **Database Layer (Model)**
PostgreSQL table:
| column       | purpose      |
|--------------|--------------|
| expense_id   | primary key  |
| title        | description  |
| price        | cost         |
| category     | grouping     |
| essential    | boolean flag |
| created_at   | timestamp    |

 <span style="font-size: 16.0;">
     **Responsibility**

 </span>The model **only communicates with the database**.
It should:
* run SQL queries
* return raw data
* never handle HTTP or UI logic

## **Controller Layer**
Controllers receive requests from routes and decide what happens.
Typical responsibilities:
* validate input
* call model functions
* handle errors
* send responses
Example logical flow:

```
Route receives request
→ controller parses params
→ controller calls model
→ controller returns JSON

```

CRUD operations implemented:
* create expense
* read expense
* update expense
* delete expense
* list by date

### **Routes (Connecting Controller ↔ Model)**
Routes map HTTP endpoints to controller functions.
| Method              | Endpoint            | Action              |
|---------------------|---------------------|---------------------|
| POST                | /expense/create     | create expense      |
| GET                 | /expense/:id        | read expense        |
| PUT                 | /expense/:id        | update              |
| DELETE              | /expense/:id        | delete              |
| GET                 | /expense/list/:date | list by date        |

Important detail:
Routes do not contain logic — they only forward to controllers.

## **View Layer (React)**
The React app represents the View.
## 
### **Responsibilities**
* collect user input
* send API requests
* render returned data
* update state
The UI never contains SQL or business logic.

### **View ↔ Controller Communication**
All communication happens through fetch/HTTP helpers (utils).
Typical lifecycle:

```
User clicks button
→ React calls API helper
→ Express controller runs
→ Database updated
→ JSON response returned
→ React updates state

```


### **Example Interaction**
Create expense:

```
Form submit (React)
    ↓
POST /expense/create
    ↓
Controller validates data
    ↓
Model inserts into DB
    ↓
Controller returns success
    ↓
React refreshes list

```

Delete expense:

```
Click delete icon
    ↓
DELETE /expense/:id
    ↓
DB row removed
    ↓
UI removes item from state

```


## **Why MVC Matters**
### Without MVC
* frontend logic mixed with DB logic
* hard to scale
* hard to debug
### **With MVC**
* clear responsibilities
* easier testing
* replaceable layers
You could:
* change React → mobile app
* change PostgreSQL → MongoDB
* change Express → another backend
without rewriting everything.
