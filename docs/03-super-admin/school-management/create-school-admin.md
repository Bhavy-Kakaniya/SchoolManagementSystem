# Create School Admin API

## Purpose

Creates the first School Admin for an existing school. The School Admin is responsible for managing all operations related to their assigned school.

---

# Endpoint

**Method**

```http
POST /api/v1/super-admin/schools/:schoolId/admin
```

---

# Access Control

Required Role:

* SUPER_ADMIN

Authentication:

* JWT Token Required

---

# Route Parameters

| Parameter | Description        |
| --------- | ------------------ |
| schoolId  | UUID of the school |

---

# Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "StrongPassword123"
}
```

> **Note:** Replace the fields above with the actual request body used in your implementation if it differs.

---

# Validation

Route Parameters

* `schoolId` must be a valid UUID.

Request Body

* All required fields must be provided.
* Email must be valid.
* Password must satisfy the project's password policy.
* Email must be unique.

---

# Request Flow

```text
Client
   │
   ▼
POST Request
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
Validate Route Parameters
   │
   ▼
Validate Request Body
   │
   ▼
Service
   │
   ▼
Verify School Exists
   │
   ▼
Verify Email Is Unique
   │
   ▼
Hash Password
   │
   ▼
Create User
   │
   ▼
Assign SCHOOL_ADMIN Role
   │
   ▼
Return Success Response
```

---

# Controller Responsibility

* Validate route parameters.
* Validate request body.
* Call the service.
* Return the HTTP response.

---

# Service Responsibility

* Verify the school exists.
* Ensure the email is not already registered.
* Hash the password.
* Create the user.
* Assign the SCHOOL_ADMIN role.
* Associate the admin with the selected school.
* Return the created School Admin details.

---

# Database Operations

Prisma methods may include:

* `findUnique()`
* `findFirst()`
* `create()`
* `createMany()` or transaction (depending on implementation)

---

# Success Response

**HTTP Status**

```text
201 Created
```

Example

```json
{
  "success": true,
  "message": "School Admin created successfully",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "schoolId": "school-uuid"
  }
}
```

---

# Possible Errors

| Status | Reason                  |
| ------ | ----------------------- |
| 400    | Validation failed       |
| 401    | User not authenticated  |
| 403    | User is not SUPER_ADMIN |
| 404    | School not found        |
| 409    | Email already exists    |
| 500    | Internal server error   |

---

# Design Decisions

* Only SUPER_ADMIN can create School Admin accounts.
* Every School Admin belongs to exactly one school.
* Passwords are stored only after hashing.
* Email uniqueness is enforced.
* Business logic is implemented in the service layer.

---

# Learning Concepts

* Multi-Tenant Architecture
* User Creation
* Password Hashing
* Role-Based Access Control (RBAC)
* User–School Relationship
* Controller-Service Architecture
* Prisma ORM
* Zod Validation

---

# Related Files

* `superAdmin.routes.ts`
* `superAdmin.controller.ts`
* `superAdmin.service.ts`
* `superAdmin.validation.ts`
* `auth.middleware.ts`
* `requireRoles.middleware.ts`
