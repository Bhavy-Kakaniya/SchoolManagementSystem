# Restore School API

## Purpose

Restores a previously soft-deleted school by setting `deletedAt` back to `null`.

---

# Endpoint

**Method**

```http
PATCH /api/v1/super-admin/schools/:schoolId/restore
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
PATCH Request
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
Set deletedAt = null
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

* Restore a deleted school.
* Handle Prisma `P2025`.
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

| Status | Reason                             |
| ------ | ---------------------------------- |
| 400    | Invalid UUID                       |
| 401    | User not authenticated             |
| 403    | User is not SUPER_ADMIN            |
| 404    | School not found or already active |
| 500    | Internal server error              |

---

# Design Decisions

* Restores only soft-deleted schools.
* Uses one optimized database query.
* Handles Prisma `P2025`.
* Completes the soft delete lifecycle.

---

# Learning Concepts

* Restore Operation
* Soft Delete Recovery
* Prisma Error Handling
* Service Layer
* RBAC
