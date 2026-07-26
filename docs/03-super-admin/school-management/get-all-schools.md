# Get All Schools API

## Purpose

Returns a paginated list of all active schools. Supports searching by school name and slug.

---

# Endpoint

**Method**

```http
GET /api/v1/super-admin/schools
```

---

# Access Control

Required Role:

* SUPER_ADMIN

Authentication:

* JWT Token Required

---

# Query Parameters

| Parameter | Required | Default | Description                   |
| --------- | -------- | ------- | ----------------------------- |
| page      | No       | 1       | Page number                   |
| limit     | No       | 10      | Number of records per page    |
| search    | No       | ""      | Search by school name or slug |

Example:

```text
GET /api/v1/super-admin/schools?page=1&limit=10&search=abc
```

---

# Validation

* page must be greater than 0.
* limit must be greater than 0.
* search is optional.

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
Validate Query
   │
   ▼
Service
   │
   ▼
Build Search Filter
   │
   ▼
Promise.all()
   │
   ├── Count Schools
   │
   └── Fetch Schools
   │
   ▼
Return Paginated Response
```

---

# Controller Responsibility

* Validate query parameters.
* Call service.
* Return response.

---

# Service Responsibility

* Build Prisma where filter.
* Apply pagination.
* Search using name or slug.
* Fetch total count and school list simultaneously using Promise.all().
* Return pagination details.

---

# Database Operations

Prisma methods used:

* count()
* findMany()

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
  "message": "Schools fetched successfully",
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

---

# Possible Errors

| Status | Reason                   |
| ------ | ------------------------ |
| 400    | Invalid query parameters |
| 401    | User not authenticated   |
| 403    | User is not SUPER_ADMIN  |
| 500    | Internal server error    |

---

# Design Decisions

* Pagination reduces database load.
* Search supports both school name and slug.
* Promise.all() executes independent database queries concurrently.
* Soft-deleted schools are excluded from results.

---

# Related Files

* superAdmin.routes.ts
* superAdmin.controller.ts
* superAdmin.service.ts
* superAdmin.validation.ts
