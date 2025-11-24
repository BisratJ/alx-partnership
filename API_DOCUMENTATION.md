# ALX Partnership API Documentation

**Version**: 1.0  
**Base URL**: `https://your-domain.com/api/v1`  
**Authentication**: Bearer token (JWT) from NextAuth for internal routes

---

## 📋 Table of Contents

1. [Public Endpoints](#public-endpoints)
2. [Request Management](#request-management)
3. [Calendar](#calendar)
4. [Users & Teams](#users--teams)
5. [Admin](#admin)
6. [Health & Monitoring](#health--monitoring)
7. [Error Responses](#error-responses)

---

## 🌐 Public Endpoints

### Submit Partnership Request

**POST** `/api/v1/public/submit`

Submit a new partnership request (no authentication required, rate-limited).

**Rate Limit**: 5 requests per hour per IP

**Content-Type**: `multipart/form-data`

**Request Body**:

```typescript
{
  // Partner Information
  org_name: string;           // Required, max 150 chars
  poc_name: string;           // Required, max 100 chars
  poc_email: string;          // Required, valid email
  poc_phone: string;          // Required, international format
  org_url?: string;           // Optional, valid URL

  // Criteria
  mission_align: boolean;     // Required, must be true
  cobranding_consent: boolean; // Required, must be true

  // Event Details
  event_title: string;        // Required, max 100 chars
  event_desc: string;         // Required, max 1000 chars
  partnership_type: 'SPEAKER' | 'EVENT' | 'RECRUITMENT' | 'SPONSORSHIP' | 'OTHER';
  target_hub: 'CAPSTONE' | 'CITYPOINT' | 'VIRTUAL';
  event_date: string;         // ISO date, min 15 business days ahead
  start_time: string;         // HH:MM format, 09:00-20:00
  end_time: string;           // HH:MM format, after start_time
  attendee_count: number;     // Min 1

  // Files
  file_concept: File;         // Required, PDF, max 5MB
  file_logo?: File;           // Optional, PNG/JPEG, max 2MB
}
```

**Success Response**: `201 Created`

```json
{
  "message": "Submission successful",
  "requestId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Error Responses**:

- `400 Bad Request` - Validation error
- `429 Too Many Requests` - Rate limit exceeded

**Example**:

```bash
curl -X POST https://api.example.com/api/v1/public/submit \
  -F "org_name=Tech Innovators Ltd" \
  -F "poc_email=john@techinnovators.com" \
  -F "event_date=2025-12-15" \
  -F "file_concept=@concept.pdf"
```

---

## 📄 Request Management

### List Requests

**GET** `/api/v1/requests`

Get paginated list of partnership requests.

**Authentication**: Required (Bearer token)

**Query Parameters**:

```typescript
{
  status?: 'NEW' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  hub_id?: string;            // Filter by hub UUID
  assigned_to_id?: string;    // Filter by assigned user
  partnership_type?: string;  // Filter by type
  date_from?: string;         // ISO datetime
  date_to?: string;           // ISO datetime
  search?: string;            // Keyword search (title, org name)
  page?: number;              // Default: 1
  limit?: number;             // Default: 20, max: 100
}
```

**Success Response**: `200 OK`

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "status": "NEW",
      "eventTitle": "Tech Workshop",
      "requestedDate": "2025-12-15",
      "partner": {
        "orgName": "Tech Innovators Ltd",
        "pocEmail": "john@techinnovators.com"
      },
      "hub": {
        "name": "CAPSTONE"
      },
      "assignedTo": null,
      "createdAt": "2025-11-24T15:30:00Z"
    }
  ],
  "meta": {
    "total": 156,
    "page": 1,
    "limit": 20,
    "totalPages": 8
  }
}
```

### Get Request Details

**GET** `/api/v1/requests/:id`

Get full details of a specific request.

**Authentication**: Required

**Success Response**: `200 OK`

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "UNDER_REVIEW",
  "eventTitle": "Tech Workshop",
  "eventDesc": "A workshop on emerging technologies...",
  "partnershipType": "EVENT",
  "requestedDate": "2025-12-15",
  "startTime": "14:00",
  "endTime": "17:00",
  "attendeeCount": 50,
  "conceptNoteUrl": "https://s3.../concept-notes/...",
  "logoUrl": "https://s3.../logos/...",
  "partner": {
    "orgName": "Tech Innovators Ltd",
    "pocName": "John Doe",
    "pocEmail": "john@techinnovators.com",
    "pocPhone": "+254712345678"
  },
  "hub": {
    "name": "CAPSTONE",
    "address": "Nairobi, Kenya"
  },
  "assignedTo": {
    "fullName": "Jane Smith",
    "email": "jane@alxafrica.com"
  },
  "comments": [
    {
      "id": "...",
      "content": "Approved by team lead",
      "user": { "fullName": "Jane Smith" },
      "createdAt": "2025-11-25T10:00:00Z"
    }
  ],
  "events": [],
  "createdAt": "2025-11-24T15:30:00Z",
  "updatedAt": "2025-11-25T10:00:00Z"
}
```

### Update Request

**PATCH** `/api/v1/requests/:id`

Update request status, assignment, or add comments.

**Authentication**: Required (Reviewer, Admin roles)

**Request Body**:

```json
{
  "status": "APPROVED",
  "assigned_to_id": "user-uuid-here",
  "comment": "Approved. Moving to scheduling."
}
```

**Success Response**: `200 OK`

```json
{
  "message": "Request updated successfully",
  "request": {
    /* updated request object */
  }
}
```

### Add Comment

**POST** `/api/v1/requests/:id/comments`

Add a comment/note to a request.

**Authentication**: Required

**Request Body**:

```json
{
  "content": "Please provide more details about speaker qualifications",
  "is_internal": true // true = staff only, false = visible to partner
}
```

**Success Response**: `201 Created`

---

## 📅 Calendar

### Check Availability / Conflict Detection

**POST** `/api/v1/calendar/check-conflict`

Check if a time slot is available for a specific hub.

**Authentication**: Required (Scheduler, Admin roles)

**Request Body**:

```json
{
  "hub_id": "hub-uuid-here",
  "start_datetime": "2025-12-15T14:00:00Z",
  "end_datetime": "2025-12-15T17:00:00Z"
}
```

**Success Response (Available)**: `200 OK`

```json
{
  "available": true
}
```

**Conflict Response**: `409 Conflict`

```json
{
  "available": false,
  "conflicts": [
    {
      "title": "Recruitment Townhall",
      "start": "2025-12-15T14:00:00Z",
      "end": "2025-12-15T16:00:00Z"
    }
  ],
  "suggestions": ["2025-12-15T17:00:00Z", "2025-12-16T14:00:00Z"]
}
```

### Create Event

**POST** `/api/v1/calendar/events`

Create a calendar event from an approved request.

**Authentication**: Required (Scheduler, Admin)

**Request Body**:

```json
{
  "request_id": "request-uuid-here",
  "title": "Tech Workshop",
  "description": "Optional additional details",
  "start_datetime": "2025-12-15T14:00:00Z",
  "end_datetime": "2025-12-15T17:00:00Z",
  "hub_id": "hub-uuid-here",
  "room_resource": "Conference Room A",
  "color_code": "#3B82F6"
}
```

**Success Response**: `201 Created`

```json
{
  "message": "Event created successfully",
  "event": {
    "id": "event-uuid-here",
    "title": "Tech Workshop",
    "startDatetime": "2025-12-15T14:00:00Z",
    "status": "CONFIRMED"
  }
}
```

### Get Calendar Events

**GET** `/api/v1/calendar/events`

Get events for calendar view.

**Authentication**: Required

**Query Parameters**:

```typescript
{
  hub_id?: string;    // Filter by hub
  start?: string;     // ISO datetime (range start)
  end?: string;       // ISO datetime (range end)
  status?: 'TENTATIVE' | 'CONFIRMED' | 'CANCELLED';
}
```

**Success Response**: `200 OK`

```json
{
  "events": [
    {
      "id": "event-uuid",
      "title": "Tech Workshop",
      "start": "2025-12-15T14:00:00Z",
      "end": "2025-12-15T17:00:00Z",
      "color": "#3B82F6",
      "hub": { "name": "CAPSTONE" },
      "request": { "id": "request-uuid", "partner": {...} }
    }
  ]
}
```

### Export Calendar

**GET** `/api/v1/calendar/export?format=ics`

Export calendar events.

**Authentication**: Required

**Query Parameters**:

- `format`: `ics` or `csv`
- `hub_id`: Optional filter
- `start`, `end`: Date range

**Success Response**: `200 OK` with file download

---

## 👥 Users & Teams

### Get Current User

**GET** `/api/v1/users/me`

Get authenticated user's profile.

**Authentication**: Required

**Success Response**: `200 OK`

```json
{
  "id": "user-uuid",
  "email": "jane@alxafrica.com",
  "fullName": "Jane Smith",
  "role": "REVIEWER",
  "isActive": true
}
```

### List Users

**GET** `/api/v1/users`

List all internal users.

**Authentication**: Required (Admin only)

**Success Response**: `200 OK`

```json
{
  "users": [
    {
      "id": "user-uuid",
      "email": "jane@alxafrica.com",
      "fullName": "Jane Smith",
      "role": "REVIEWER",
      "isActive": true
    }
  ]
}
```

### Update User Role

**PATCH** `/api/v1/users/:id`

Update user role or status.

**Authentication**: Required (Admin only)

**Request Body**:

```json
{
  "role": "ADMIN",
  "is_active": true
}
```

---

## ⚙️ Admin

### Get System Configuration

**GET** `/api/v1/admin/config`

Get system settings (hub holidays, etc.).

**Authentication**: Required (Admin only)

**Success Response**: `200 OK`

```json
{
  "hub_holidays_2025": ["2025-12-25", "2025-01-01"],
  "maintenance_mode": false
}
```

### Update Configuration

**PUT** `/api/v1/admin/config/:key`

Update a system configuration value.

**Authentication**: Required (Admin only)

**Request Body**:

```json
{
  "value": ["2025-12-25", "2025-12-26", "2025-01-01"]
}
```

### Manage Hubs

**GET** `/api/v1/admin/hubs`

List all hubs with capacity and hours.

**POST** `/api/v1/admin/hubs`

Create or update hub configuration.

---

## 🏥 Health & Monitoring

### Health Check

**GET** `/api/health`

Check overall system health.

**Authentication**: None

**Success Response**: `200 OK`

```json
{
  "status": "healthy",
  "timestamp": "2025-11-24T15:30:00Z",
  "version": "1.0.0"
}
```

### Database Health

**GET** `/api/health/db`

Check database connectivity.

**Success Response**: `200 OK`

```json
{
  "status": "connected",
  "latency_ms": 12
}
```

### Storage Health

**GET** `/api/health/storage`

Check file storage availability.

**Success Response**: `200 OK`

```json
{
  "status": "available",
  "bucket": "alx-partnership-files"
}
```

---

## ❌ Error Responses

All errors follow this format:

```json
{
  "error": "Error message here",
  "code": "ERROR_CODE",
  "details": {
    "field": "Specific field error"
  }
}
```

### HTTP Status Codes

| Code | Meaning               | Example                    |
| ---- | --------------------- | -------------------------- |
| 200  | Success               | Request processed          |
| 201  | Created               | Resource created           |
| 400  | Bad Request           | Validation failed          |
| 401  | Unauthorized          | Missing/invalid auth token |
| 403  | Forbidden             | Insufficient permissions   |
| 404  | Not Found             | Resource doesn't exist     |
| 409  | Conflict              | Calendar double-booking    |
| 429  | Too Many Requests     | Rate limit exceeded        |
| 500  | Internal Server Error | Unexpected error           |

### Common Error Codes

```typescript
{
  VALIDATION_ERROR: "Input validation failed",
  UNAUTHORIZED: "Authentication required",
  FORBIDDEN: "Insufficient permissions",
  NOT_FOUND: "Resource not found",
  CONFLICT: "Calendar conflict detected",
  RATE_LIMIT_EXCEEDED: "Too many requests",
  FILE_TOO_LARGE: "File exceeds size limit",
  INVALID_FILE_TYPE: "File type not allowed",
  BUSINESS_DAYS_VIOLATION: "Event must be 15 days in advance",
  HUB_HOURS_VIOLATION: "Event outside hub operating hours"
}
```

---

## 🔐 Authentication

All internal endpoints require a JWT token from NextAuth.

### Getting a Token

1. User logs in via `/api/auth/signin`
2. Google OAuth flow completes
3. NextAuth issues JWT session token
4. Token stored in HTTP-only cookie

### Using the Token

**Client-side (Browser)**:
Cookies are sent automatically

**Server-side / API Clients**:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  https://api.example.com/api/v1/requests
```

---

## 📊 Rate Limiting

### Public Endpoints

| Endpoint                | Limit      | Window |
| ----------------------- | ---------- | ------ |
| `/api/v1/public/submit` | 5 requests | 1 hour |

### Internal Endpoints

No rate limiting (protected by authentication)

### Rate Limit Headers

```
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 3
X-RateLimit-Reset: 2025-11-24T16:30:00Z
```

---

## 🔄 Pagination

All list endpoints support pagination:

**Query Parameters**:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

**Response Format**:

```json
{
  "data": [...],
  "meta": {
    "total": 156,
    "page": 2,
    "limit": 20,
    "totalPages": 8
  }
}
```

---

## 📝 Audit Logs

All mutations are logged:

**Tracked Information**:

- User who made the change
- Action type (CREATE, UPDATE, DELETE, etc.)
- Previous value
- New value
- IP address
- Timestamp

**Access**: Admin panel (`/admin/audit-logs`)

---

## 🧪 Testing the API

### Using cURL

```bash
# Submit a request
curl -X POST http://localhost:3000/api/v1/public/submit \
  -F "org_name=Test Org" \
  -F "poc_email=test@example.com" \
  -F "event_date=2025-12-15" \
  -F "file_concept=@test.pdf"

# List requests (requires auth)
curl http://localhost:3000/api/v1/requests?status=NEW \
  -H "Authorization: Bearer YOUR_TOKEN"

# Check conflict
curl -X POST http://localhost:3000/api/v1/calendar/check-conflict \
  -H "Content-Type: application/json" \
  -d '{"hub_id":"uuid","start_datetime":"2025-12-15T14:00:00Z","end_datetime":"2025-12-15T17:00:00Z"}'
```

### Using Postman

1. Import OpenAPI spec (generate with `npm run openapi:generate`)
2. Set environment variable `BASE_URL` to `http://localhost:3000`
3. Get auth token from `/api/auth/signin`
4. Use token in Bearer auth for protected routes

---

## 📚 Additional Resources

- **Swagger UI**: `/api/docs` (when enabled)
- **Database Schema**: See `prisma/schema.prisma`
- **Validation Rules**: See `lib/validation/schemas.ts`
- **Email Templates**: See `lib/email/templates/`

---

**API Version**: 1.0  
**Last Updated**: November 24, 2025  
**Maintained by**: ALX Engineering Team
