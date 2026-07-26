# Delete School API

## Purpose

Soft deletes an existing school by setting the `deletedAt` field instead of permanently removing the record.

---

# Endpoint

**Method**

```http
DELETE /api/v1/super-admin/schools/:schoolId
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

# Validation

* schoolId must be a valid UUID.

---

# Request Flow

```text
Client
   │
   ▼
DELETE Request
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
Service
   │
   ▼
Update deletedAt
   │
   ▼
Return Success Response
```

---

# Controller Responsibility

* Validate route parameters.
* Call service.
* Return response.

---

# Service Responsibility

* Soft delete the school.
* Handle Prisma `P2025` error.
* Return success message.

---

# Database Operation

Prisma methods used:

* `update()`

---

# Success Response

**HTTP Status**

```text
200 OK
```

---

# Possible Errors

| Status | Reason                              |
| ------ | ----------------------------------- |
| 400    | Invalid UUID                        |
| 401    | User not authenticated              |
| 403    | User is not SUPER_ADMIN             |
| 404    | School not found or already deleted |
| 500    | Internal server error               |

---

# Design Decisions

* Uses soft delete instead of hard delete.
* Data can be restored later.
* Uses one optimized database query.
* Converts Prisma `P2025` to HTTP 404.

---

# Learning Concepts

* Soft Delete
* Prisma `update()`
* Exception Handling
* `P2025`
* Service Layer
* RBAC
