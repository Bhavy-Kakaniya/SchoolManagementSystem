# Create School API

## Purpose

The Create School API is used by the **SUPER_ADMIN** to register a new school in the system. Every newly created school becomes a new tenant in the multi-tenant architecture.

---

# Endpoint

**Method**

```http
POST /api/v1/super-admin/schools
```

---

# Access Control

Required Role:

* SUPER_ADMIN

Authentication:

* JWT Token Required

---

# Request Body

```json
{
  "name": "ABC Public School",
  "slug": "abc-public-school"
}
```

---

# Validation

| Field | Validation                                            |
| ----- | ----------------------------------------------------- |
| name  | Required, 2–100 characters                            |
| slug  | Required, lowercase letters, numbers and hyphens only |
| slug  | Must be unique                                        |

---

# Request Flow

```
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
Zod Validation
   │
   ▼
Service
   │
   ▼
Check Duplicate Slug
   │
   ▼
Create School
   │
   ▼
Return Response
```

---

# Controller Responsibility

The controller is responsible for:

* Validating the request body.
* Calling the service.
* Returning the HTTP response.

No business logic is written inside the controller.

---

# Service Responsibility

The service is responsible for:

* Checking whether the slug already exists.
* Creating a new school.
* Returning the created school details.

Business rules are implemented only in the service layer.

---

# Database Operation

Prisma methods used:

* `findUnique()` – Check whether the slug already exists.
* `create()` – Insert a new school.

---

# Success Response

**HTTP Status**

```
201 Created
```

Example:

```json
{
  "success": true,
  "message": "School created successfully",
  "data": {
    "id": "uuid",
    "name": "ABC Public School",
    "slug": "abc-public-school"
  }
}
```

---

# Possible Errors

| Status | Reason                     |
| ------ | -------------------------- |
| 400    | Validation failed          |
| 401    | User not authenticated     |
| 403    | User is not SUPER_ADMIN    |
| 409    | School slug already exists |
| 500    | Internal server error      |

---

# Design Decisions

* Only SUPER_ADMIN can create schools.
* Every school must have a unique slug.
* Validation is performed using Zod before reaching the service.
* Business logic is kept inside the service layer.
* Controllers remain thin and only coordinate request handling.

---

# Related Files

* `superAdmin.routes.ts`
* `superAdmin.controller.ts`
* `superAdmin.service.ts`
* `superAdmin.validation.ts`
* `auth.middleware.ts`
* `requireRoles.middleware.ts`
