# 📌 Collaborative Task Manager (Full Stack)

A **real-time collaborative task management system** built using the **MERN stack**, featuring **role-based access**, **real-time updates**, and **persistent notifications**.

This project was developed as part of a technical assignment with a focus on **clean architecture**, **TypeScript**, and **real-world design decisions**.

---

## This Assignment from AbleSpace 
Project Requirement : https://docs.google.com/document/d/1IAuUdNQ5s7jIuj-y24escvFcu2BY-UYnfr-qV73NCd4/edit?tab=t.0

---

## 🌐 Live Deployment

### Frontend
🔗 https://task-manager-frontend-5j1b.onrender.com/

### Backend
🔗 https://task-manager-backend-cnfm.onrender.com/

---

## 🛠 Tech Stack

### Backend
- Node.js  
- Express.js  
- **TypeScript**  
- MongoDB + Mongoose  
- Socket.io  
- JWT Authentication  
- Zod (DTO validation)

### Frontend
- React (Vite)  
- **TypeScript (incremental migration from JavaScript)**  
- Redux Toolkit  
- Redux Persist  
- Socket.io Client  
- Tailwind CSS  

---

## 🚀 Setup Instructions (Local Development)

### 2 Clone Repository
```bash
git clone <repository-url>
cd Task-Manager
```
### 2 Backend Setup
```bash
cd backend
npm install
```

RUN COMMAND : npm start

### 3 Frontend Setup
```bash
cd frontend
npm install
```
RUN COMMAND : npm run dev


## 🔗 API Contract Documentation

### 🔐 Authentication

| Method | Endpoint                  | Description                   |
|--------|---------------------------|-------------------------------|
| POST   | `/api/v1/auth/login`      | User login                    |
| POST   | `/api/v1/auth/register`   | User registration             |
| GET    | `/api/v1/auth/profile`    | Get logged-in user profile    |
| PATCH  | `/api/v1/auth/:id`        |  update profile               |


### ✅ Tasks

| Method | Endpoint                      | Description                                   |
|--------|-------------------------------|-----------------------------------------------|
| GET    | `/api/v1/task`                | Get tasks (admin: all, user: assigned)        |
| POST   | `/api/v1/task`                | Create task (admin only)                      |
| GET    | `/api/v1/task/:id`            | Get task by ID                                |
| PATCH  | `/api/v1/task/:id`            | Update task                                   |
| PATCH  | `/api/v1/task/:id/status`     | Update task status                            |
| PATCH  | `/api/v1/task/:id/todo`       | Update checklist                              |
| DELETE | `/api/v1/task/:id`            | Delete task                                   |


### 👥 Users (Admin)

| Method | Endpoint                | Description              |
|--------|-------------------------|--------------------------|
| GET    | `/api/v1/user`          | Get all members          |
| GET    | `/api/v1/user/:id`      | Get user by ID           |
| POST   | `/api/v1/user/create`   | Create new user          |



## 🧱 Architecture Overview & Design Decisions

### 🔹 MVC Architecture

The backend follows a **clean MVC pattern**:

- **Controllers** → Business logic  
- **Routes** → Request routing & validation  
- **Models** → MongoDB schemas  
- **Middlewares / Utils** → Authentication, validation, error handling  

This separation improves **maintainability** and **scalability**.

---

### 🔹 Database Choice – MongoDB

MongoDB was chosen because:

- Flexible schema for evolving task structures  
- Strong support for nested documents (checklists)  
- Well-suited for real-time applications  
- Easy horizontal scaling  

**Mongoose** is used for schema validation and TypeScript support.

---

### 🔹 Authentication & Authorization

- JWT-based authentication  
- Role-based access control:
  - **Admin** → Manage users & tasks  
  - **Member** → Access assigned tasks only  
- Protected routes implemented using middleware  

---

### 🔹 Validation & Service Handling

- Request validation handled using **Zod DTOs**  
- Controllers kept thin and focused  
- Centralized error handling using custom `ApiError`  

---

## ⚡ Real-Time Functionality (Socket.io)

### Why Socket.io?

- Reliable WebSocket communication with fallbacks  
- Room-based event handling  
- Event-driven architecture  

### Implementation

- Socket.io initialized on the same HTTP server as Express  
- Users join **userId-based rooms**  
- Events emitted:
  - `notification` → Task assignment alerts  
  - `task:updated` → Live task updates (status, priority, assignee)  

### Result

- Instant task updates  
- Real-time notifications  
- No page refresh required  

---

## 🧠 Frontend State Management Decision

### Redux Instead of React Query

Although the assignment recommended **React Query / SWR**, this project uses **Redux Toolkit**.

**Reasoning:**

- The project was initially built using Redux  
- Redux Toolkit is a stable, industry-accepted solution  
- Redux Persist allows state rehydration  
- Socket.io integrates cleanly with Redux-based state updates  




## ✨ Additional Features Implemented From My Side (Beyond Core Requirements)

In addition to the requirements mentioned in the assignment, I implemented the following features to make the system more **scalable and production-ready**:

### 🏢 Tenant-Based (Multi-Company) Architecture

- Implemented a **tenant-based architecture** where multiple companies can use the same application instance.
- During **user sign-in / registration**, users are associated with a specific **company (tenant)**.
- A unique `tenantId` is used to segregate data across:
  - Users
  - Tasks
  - Notifications
- All API operations are scoped using `tenantId`, ensuring **strict data isolation** between companies.

This approach enables a **SaaS-style system**, preventing cross-company data access.

---

### 👥 Admin-Driven User Creation (Per Tenant)

- Added a **Create User** feature for admins.
- Admins can create users **only within their own company (tenant)**.
- Newly created users automatically inherit the admin’s `tenantId`.
- This ensures:
  - Secure user onboarding
  - Controlled access management
  - Company-level data separation

---

### 🎯 Why This Was Added

These features were intentionally implemented to:
- Support real-world multi-organization usage
- Improve scalability and security
- Align the system with enterprise-level SaaS requirements

This enhancement goes beyond the assignment’s core scope while maintaining clean architecture and performance.

