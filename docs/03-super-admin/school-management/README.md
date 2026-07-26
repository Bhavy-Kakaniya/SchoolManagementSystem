# School Management Module

## Overview

The School Management module is responsible for managing schools in the Student Management System. It is accessible only to the **SUPER_ADMIN** and acts as the entry point for onboarding new schools into the platform.

Every school created through this module represents a separate tenant in the multi-tenant architecture. Each school has its own administrators, teachers, students, classes, and data.

---

# Objectives

* Create new schools.
* View all registered schools.
* Search schools by name or slug.
* View a single school's details.
* Update school information.
* Soft delete schools.
* Restore deleted schools.
* Create the first School Admin for a school.

---

# Access Control

Role Required:

* SUPER_ADMIN

No other role is allowed to perform operations in this module.

---

# Module Architecture

```
Client
   │
   ▼
Express Route
   │
   ▼
Authentication Middleware
   │
   ▼
Role Authorization Middleware
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Prisma ORM
   │
   ▼
PostgreSQL Database
```

---

# APIs

| Method | Endpoint                                      | Purpose             |
| ------ | --------------------------------------------- | ------------------- |
| POST   | /api/v1/super-admin/schools                   | Create School       |
| GET    | /api/v1/super-admin/schools                   | Get All Schools     |
| GET    | /api/v1/super-admin/schools/:schoolId         | Get School By Id    |
| PUT    | /api/v1/super-admin/schools/:schoolId         | Update School       |
| DELETE | /api/v1/super-admin/schools/:schoolId         | Soft Delete School  |
| PATCH  | /api/v1/super-admin/schools/:schoolId/restore | Restore School      |
| POST   | /api/v1/super-admin/schools/:schoolId/admin   | Create School Admin |

---

# Business Rules

* Each school has a unique slug.
* School names are searchable.
* Schools are never permanently deleted.
* Deleted schools can be restored.
* Soft deletion is implemented using the `deletedAt` field.
* Only authenticated SUPER_ADMIN users can access these APIs.

---

# Technologies Used

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* PostgreSQL
* Supabase
* Zod
* JWT Authentication

---

# Related Documentation

* create-school.md
* get-all-schools.md
* get-school-by-id.md
* update-school.md
* delete-school.md
* restore-school.md
* create-school-admin.md
