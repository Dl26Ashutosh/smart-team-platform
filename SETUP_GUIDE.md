# Smart Team Platform - Setup & Deployment Guide

## Project Overview

This is a **microservices-based Team Management Platform** with real-time notifications, task tracking, and project management capabilities.

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     API GATEWAY (Port 5000)                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ├─ Auth Service (5001)       ─ User authentication & JWT  │
│  ├─ User Service (5002)       ─ User profiles & management │
│  ├─ Project Service (5003)    ─ Project CRUD & teams      │
│  ├─ Task Service (5004)       ─ Task management & tracking │
│  └─ Notification Service (5005) ─ Real-time notifications  │
│                                                              │
│                  ↓ (All services connected to)              │
│                  MongoDB Database                            │
└─────────────────────────────────────────────────────────────┘
```

## Services Breakdown

### 1. **Auth Service** (Port 5001)
- User registration & login
- JWT token generation
- Profile management
- **Routes:**
  - `POST /auth/register` - Register new user
  - `POST /auth/login` - Login user
  - `GET /auth/profile` - Get authenticated user profile

### 2. **User Service** (Port 5002)
- User profile management
- Team membership handling
- User deactivation/deletion
- **Routes:**
  - `POST /users` - Create user profile
  - `GET /users` - Get all users (paginated)
  - `GET /users/:userId` - Get specific user profile
  - `PUT /users/:userId` - Update user profile
  - `DELETE /users/:userId` - Deactivate user

### 3. **Project Service** (Port 5003)
- Create & manage projects
- Assign team members to projects
- Track project status & timeline
- **Routes:**
  - `POST /projects` - Create project
  - `GET /projects` - Get all projects (with filters)
  - `GET /projects/:projectId` - Get project details
  - `PUT /projects/:projectId` - Update project
  - `DELETE /projects/:projectId` - Delete project
  - `POST /projects/:projectId/team` - Add team member
  - `DELETE /projects/:projectId/team` - Remove team member

### 4. **Task Service** (Port 5004)
- Create & assign tasks
- Update task status (todo, in-progress, review, completed)
- Add comments to tasks
- Track task progress
- **Routes:**
  - `POST /tasks` - Create task
  - `GET /tasks` - Get all tasks (with filters)
  - `GET /tasks/:taskId` - Get task details
  - `PUT /tasks/:taskId` - Update task
  - `DELETE /tasks/:taskId` - Delete task
  - `POST /tasks/:taskId/comments` - Add comment
  - `PATCH /tasks/:taskId/status` - Update task status

### 5. **Notification Service** (Port 5005)
- Real-time notifications via Socket.io
- Store notification history
- Mark notifications as read
- **Routes:**
  - `POST /notifications` - Create notification
  - `GET /notifications/user/:userId` - Get user notifications
  - `PUT /notifications/:notificationId/read` - Mark as read
  - `PUT /notifications/user/:userId/read-all` - Mark all as read
  - `DELETE /notifications/:notificationId` - Delete notification
  - `GET /notifications/user/:userId/unread-count` - Get unread count

### 6. **API Gateway** (Port 5000)
- Single entry point for all services
- Proxy requests to appropriate microservices
- Health check endpoint
- Error handling

---

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (v4.4+)
- npm or yarn

### Option 1: Local Development Setup

#### 1. Install Dependencies for All Services

```bash
# Install all services
npm install

# Or for individual services:
cd auth-service && npm install
cd ../user-service && npm install
cd ../project-service && npm install
cd ../task-service && npm install
cd ../notification-service && npm install
cd ../api-gateway && npm install
```

#### 2. Configure Environment Variables

Create `.env` files in each service directory:

```bash
# auth-service/.env
PORT=5001
MONGO_URI=mongodb://localhost:27017/smart-team-auth
JWT_SECRET=your_secret_key_here
NODE_ENV=development

# user-service/.env
PORT=5002
MONGO_URI=mongodb://localhost:27017/smart-team-user
JWT_SECRET=your_secret_key_here
NODE_ENV=development

# project-service/.env
PORT=5003
MONGO_URI=mongodb://localhost:27017/smart-team-project
JWT_SECRET=your_secret_key_here
NODE_ENV=development

# task-service/.env
PORT=5004
MONGO_URI=mongodb://localhost:27017/smart-team-task
JWT_SECRET=your_secret_key_here
NODE_ENV=development

# notification-service/.env
PORT=5005
MONGO_URI=mongodb://localhost:27017/smart-team-notification
JWT_SECRET=your_secret_key_here
NODE_ENV=development

# api-gateway/.env
PORT=5000
AUTH_SERVICE_URL=http://localhost:5001
USER_SERVICE_URL=http://localhost:5002
PROJECT_SERVICE_URL=http://localhost:5003
TASK_SERVICE_URL=http://localhost:5004
NOTIFICATION_SERVICE_URL=http://localhost:5005
NODE_ENV=development
```

#### 3. Start MongoDB

```bash
# On Windows
mongod

# On macOS/Linux
brew services start mongodb-community
# or
mongod --config /usr/local/etc/mongod.conf
```

#### 4. Start All Services

Run each service in a separate terminal:

```bash
# Terminal 1: Auth Service
cd auth-service
npm run dev

# Terminal 2: User Service
cd user-service
npm run dev

# Terminal 3: Project Service
cd project-service
npm run dev

# Terminal 4: Task Service
cd task-service
npm run dev

# Terminal 5: Notification Service
cd notification-service
npm run dev

# Terminal 6: API Gateway
cd api-gateway
npm run dev
```

### Option 2: Docker Setup

#### 1. Create Dockerfiles for Each Service

First, create `Dockerfile` in each service root:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000
CMD ["npm", "start"]
```

#### 2. Start with Docker Compose

```bash
docker-compose up -d
```

#### 3. Verify All Services

```bash
docker-compose ps

# Check logs
docker-compose logs -f api-gateway
```

---

## Testing the APIs

### 1. Register a User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123",
    "role": "manager"
  }'
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "role": "manager",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password123"
  }'
```

### 3. Create User Profile

```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {TOKEN}" \
  -d '{
    "userId": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "user@example.com"
  }'
```

### 4. Create Project

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {TOKEN}" \
  -d '{
    "name": "Q4 Product Launch",
    "description": "Launch new product features",
    "priority": "high",
    "startDate": "2024-10-01",
    "endDate": "2024-12-31"
  }'
```

### 5. Create Task

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {TOKEN}" \
  -d '{
    "title": "Design homepage",
    "description": "Create responsive homepage design",
    "projectId": "{PROJECT_ID}",
    "priority": "high",
    "dueDate": "2024-10-15"
  }'
```

---

## Environment Variables Summary

| Service | PORT | DATABASE |
|---------|------|----------|
| API Gateway | 5000 | - |
| Auth Service | 5001 | smart-team-auth |
| User Service | 5002 | smart-team-user |
| Project Service | 5003 | smart-team-project |
| Task Service | 5004 | smart-team-task |
| Notification Service | 5005 | smart-team-notification |

---

## Stopping Services

### Local Development

Press `Ctrl+C` in each terminal

### Docker

```bash
docker-compose down

# Remove volumes (careful!)
docker-compose down -v
```

---

## Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh  # or mongo

# Restart MongoDB
brew services restart mongodb-community
```

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 {PID}
```

### JWT Secret Not Set
- Ensure `JWT_SECRET` is the same across all services
- Use `your_jwt_secret_key_here` for development only
- Use a strong, random string for production

---

## Next Steps

1. **Frontend Setup** - Build React/Vue frontend to consume these APIs
2. **Authentication Enhancement** - Add OAuth, 2FA, refresh tokens
3. **Database Optimization** - Add indexes, caching (Redis)
4. **Testing** - Add unit & integration tests
5. **Logging** - Implement centralized logging (ELK stack)
6. **CI/CD** - Setup GitHub Actions for automated deployment

---

## Production Deployment

For production, consider:

1. **Kubernetes** - Container orchestration
2. **Load Balancing** - Nginx/Traefik
3. **Monitoring** - Prometheus + Grafana
4. **Database Replication** - MongoDB Atlas
5. **Secret Management** - HashiCorp Vault

---

Happy coding! 🚀
