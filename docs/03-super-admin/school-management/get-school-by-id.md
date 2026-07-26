# Get School By ID API

## Purpose

Returns the details of a single active school using its unique school ID.

---

# Endpoint

**Method**

```http
GET /api/v1/super-admin/schools/:schoolId
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
GET Request
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
Find School
   │
   ▼
Return School Details
```

---

# Controller Responsibility

* Validate route parameters.
* Call service.
* Return response.

---

# Service Responsibility

* Find school by ID.
* Return school details.
* Throw 404 if school is not found.

---

# Database Operation

Prisma methods used:

* `findUnique()`

---

# Success Response

**HTTP Status**

```text
200 OK
```
data : {
   id,
   name,
   slug,
   logo,
   createdAt
}

---

# Possible Errors

| Status | Reason                  |
| ------ | ----------------------- |
| 400    | Invalid UUID            |
| 401    | User not authenticated  |
| 403    | User is not SUPER_ADMIN |
| 404    | School not found        |
| 500    | Internal server error   |

---

# Design Decisions

* Returns only one school.
* Only active schools are accessible.
* Uses UUID as the unique identifier.

---

# Related Files

* superAdmin.routes.ts
* superAdmin.controller.ts
* superAdmin.service.ts
* superAdmin.validation.ts