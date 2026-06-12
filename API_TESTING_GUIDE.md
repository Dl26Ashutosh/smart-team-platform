# API Testing Guide - Smart Team Platform

## Prerequisites

- All services running (on ports 5000-5005)
- Postman, Insomnia, or curl installed
- Base URL: `http://localhost:5000/api`

---

## 1. Authentication Flow

### Register New User

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123",
    "role": "manager"
  }'
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "john@example.com",
  "role": "manager",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Save the token** - You'll need it for authenticated requests!

---

### Login User

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "john@example.com",
  "role": "manager",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Get User Profile

**Request:**
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer {TOKEN}"
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "john@example.com",
  "role": "manager",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

---

## 2. User Management

### Create User Profile

**Request:**
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {TOKEN}" \
  -d '{
    "userId": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1-234-567-8900",
    "bio": "Product Manager at Smart Team"
  }'
```

**Response (201):**
```json
{
  "_id": "507f191e810c19729de860ea",
  "userId": "507f1f77bcf86cd799439011",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1-234-567-8900",
  "bio": "Product Manager at Smart Team",
  "teams": [],
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

---

### Get All Users (Paginated)

**Request:**
```bash
curl -X GET "http://localhost:5000/api/users?page=1&limit=10" \
  -H "Authorization: Bearer {TOKEN}"
```

**Response (200):**
```json
{
  "data": [
    {
      "_id": "507f191e810c19729de860ea",
      "userId": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "isActive": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "pages": 1
  }
}
```

---

### Get User Profile by ID

**Request:**
```bash
curl -X GET http://localhost:5000/api/users/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer {TOKEN}"
```

---

### Update User Profile

**Request:**
```bash
curl -X PUT http://localhost:5000/api/users/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {TOKEN}" \
  -d '{
    "firstName": "Jonathan",
    "bio": "Senior Product Manager"
  }'
```

---

## 3. Project Management

### Create Project

**Request:**
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {TOKEN}" \
  -d '{
    "name": "Q1 Mobile App Redesign",
    "description": "Redesign mobile app for better UX",
    "priority": "high",
    "startDate": "2024-01-20",
    "endDate": "2024-03-20",
    "budget": 50000
  }'
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Q1 Mobile App Redesign",
  "description": "Redesign mobile app for better UX",
  "owner": "507f1f77bcf86cd799439011",
  "team": [],
  "status": "active",
  "priority": "high",
  "startDate": "2024-01-20T00:00:00.000Z",
  "endDate": "2024-03-20T00:00:00.000Z",
  "budget": 50000,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

---

### Get All Projects

**Request:**
```bash
curl -X GET "http://localhost:5000/api/projects?page=1&limit=10&status=active" \
  -H "Authorization: Bearer {TOKEN}"
```

---

### Get Project Details

**Request:**
```bash
curl -X GET http://localhost:5000/api/projects/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer {TOKEN}"
```

---

### Add Team Member to Project

**Request:**
```bash
curl -X POST http://localhost:5000/api/projects/507f1f77bcf86cd799439012/team \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {TOKEN}" \
  -d '{
    "userId": "507f1f77bcf86cd799439013"
  }'
```

---

### Update Project

**Request:**
```bash
curl -X PUT http://localhost:5000/api/projects/507f1f77bcf86cd799439012 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {TOKEN}" \
  -d '{
    "status": "completed",
    "name": "Q1 Mobile App Redesign - COMPLETED"
  }'
```

---

## 4. Task Management

### Create Task

**Request:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {TOKEN}" \
  -d '{
    "title": "Design login screen",
    "description": "Create responsive login UI with form validation",
    "projectId": "507f1f77bcf86cd799439012",
    "assignedTo": "507f1f77bcf86cd799439013",
    "priority": "high",
    "dueDate": "2024-02-01",
    "timeEstimate": 8
  }'
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "title": "Design login screen",
  "description": "Create responsive login UI with form validation",
  "projectId": "507f1f77bcf86cd799439012",
  "assignedTo": "507f1f77bcf86cd799439013",
  "createdBy": "507f1f77bcf86cd799439011",
  "status": "todo",
  "priority": "high",
  "dueDate": "2024-02-01T00:00:00.000Z",
  "timeEstimate": 8,
  "comments": [],
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

---

### Get All Tasks (with Filters)

**Request:**
```bash
curl -X GET "http://localhost:5000/api/tasks?projectId=507f1f77bcf86cd799439012&status=todo&page=1&limit=10" \
  -H "Authorization: Bearer {TOKEN}"
```

---

### Get Task Details

**Request:**
```bash
curl -X GET http://localhost:5000/api/tasks/507f1f77bcf86cd799439014 \
  -H "Authorization: Bearer {TOKEN}"
```

---

### Update Task Status

**Request:**
```bash
curl -X PATCH http://localhost:5000/api/tasks/507f1f77bcf86cd799439014/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {TOKEN}" \
  -d '{
    "status": "in-progress"
  }'
```

---

### Add Comment to Task

**Request:**
```bash
curl -X POST http://localhost:5000/api/tasks/507f1f77bcf86cd799439014/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {TOKEN}" \
  -d '{
    "comment": "Started working on the design, will have wireframes by tomorrow"
  }'
```

---

### Update Full Task

**Request:**
```bash
curl -X PUT http://localhost:5000/api/tasks/507f1f77bcf86cd799439014 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {TOKEN}" \
  -d '{
    "status": "review",
    "priority": "medium",
    "description": "Updated description with more details"
  }'
```

---

## 5. Notification Management

### Get User Notifications

**Request:**
```bash
curl -X GET "http://localhost:5000/api/notifications/user/507f1f77bcf86cd799439011?page=1&limit=10" \
  -H "Authorization: Bearer {TOKEN}"
```

**Response (200):**
```json
{
  "data": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "recipientId": "507f1f77bcf86cd799439011",
      "type": "task_assigned",
      "title": "New Task Assigned",
      "message": "You have been assigned a new task: Design login screen",
      "isRead": false,
      "priority": "high",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "pages": 1
  }
}
```

---

### Get Unread Notification Count

**Request:**
```bash
curl -X GET http://localhost:5000/api/notifications/user/507f1f77bcf86cd799439011/unread-count \
  -H "Authorization: Bearer {TOKEN}"
```

**Response (200):**
```json
{
  "unreadCount": 3
}
```

---

### Mark Notification as Read

**Request:**
```bash
curl -X PUT http://localhost:5000/api/notifications/507f1f77bcf86cd799439015/read \
  -H "Authorization: Bearer {TOKEN}"
```

---

### Mark All Notifications as Read

**Request:**
```bash
curl -X PUT http://localhost:5000/api/notifications/user/507f1f77bcf86cd799439011/read-all \
  -H "Authorization: Bearer {TOKEN}"
```

---

## Error Responses

### 400 - Bad Request
```json
{
  "message": "userId, firstName, lastName, and email are required"
}
```

### 401 - Unauthorized
```json
{
  "message": "No token provided"
}
```

### 403 - Forbidden
```json
{
  "message": "Forbidden: Insufficient permissions"
}
```

### 404 - Not Found
```json
{
  "message": "Project not found"
}
```

### 500 - Server Error
```json
{
  "message": "Server Error"
}
```

---

## Testing Checklist

- [ ] Register new user
- [ ] Login with credentials
- [ ] Get user profile
- [ ] Create user profile
- [ ] List all users
- [ ] Create project
- [ ] Add team member to project
- [ ] Create task in project
- [ ] Update task status
- [ ] Add comment to task
- [ ] Get user notifications
- [ ] Mark notification as read

---

## Tips

1. **Always include Authorization header** with Bearer token for authenticated endpoints
2. **Save response data** (IDs) from creation endpoints to use in subsequent requests
3. **Use different test users** for different operations (assign task to another user)
4. **Test error cases** - try invalid data, missing fields, etc.
5. **Monitor response times** to identify bottlenecks

---

Happy testing! 🧪
