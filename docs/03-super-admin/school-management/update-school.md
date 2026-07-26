# Update School API

## Purpose

Updates the details of an existing active school.

---

# Endpoint

**Method**

```http
PUT /api/v1/super-admin/schools/:schoolId
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
  "name": "ABC Public School",
  "slug": "abc-public-school"
}
```

---

# Validation

Route Parameter

* schoolId must be a valid UUID.

Request Body

* name is required.
* slug is required.
* slug must follow the defined format.
* slug must remain unique.

---

# Request Flow

```text
Client
   │
   ▼
PUT Request
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
Validate Parameters
   │
   ▼
Validate Request Body
   │
   ▼
Service
   │
   ▼
Find School
   │
   ▼
Check Slug Uniqueness
   │
   ▼
Update School
   │
   ▼
Return Updated School
```

---

# Controller Responsibility

* Validate route parameters.
* Validate request body.
* Call service.
* Return response.

---

# Service Responsibility

* Check whether the school exists.
* Ensure another school is not using the same slug.
* Update school information.
* Return updated school details.

---

# Database Operations

Prisma methods used:

* `findUnique()`
* `findFirst()`
* `update()`

---

# Success Response

HTTP Status

```text
200 OK
```

Example

```json
{
  "success": true,
  "message": "School updated successfully",
  "data": {
    "id": "...",
    "name": "...",
    "slug": "...",
    "logo": "...",
    "createdAt": "..."
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
| 409    | Slug already exists     |
| 500    | Internal server error   |

---

# Design Decisions

* Existing school is verified before updating.
* Slug uniqueness is maintained across all schools.
* Only selected fields are returned to the client.
* Business logic remains inside the service layer.

---

# Related Files

* superAdmin.routes.ts
* superAdmin.controller.ts
* superAdmin.service.ts
* superAdmin.validation.ts
