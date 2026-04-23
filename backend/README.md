# Todo Backend API

A RESTful API for managing todo tasks built with Node.js, Express, and PostgreSQL.

## Features

- ✅ Create new tasks
- ✅ Read all tasks or single task
- ✅ Update existing tasks
- ✅ Delete tasks
- ✅ PostgreSQL database integration
- ✅ Environment variable configuration

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/tasks` | Create a new task |
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get a specific task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the backend directory:
```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=todo_db
DB_PORT=5432
PORT=5000
```

### 3. Setup Database
Make sure PostgreSQL is installed and running. Create the database:
```sql
CREATE DATABASE todo_db;
```

The application will automatically create the `tasks` table on startup.

### 4. Run the Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## Request Examples

### Create Task
```bash
curl -X POST http://localhost:5000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries","description":"Milk, eggs, bread"}'
```

### Get All Tasks
```bash
curl http://localhost:5000/tasks
```

### Update Task
```bash
curl -X PUT http://localhost:5000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

### Delete Task
```bash
curl -X DELETE http://localhost:5000/tasks/1
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DB_HOST | Database host | localhost |
| DB_USER | Database user | postgres |
| DB_PASSWORD | Database password | - |
| DB_NAME | Database name | todo_db |
| DB_PORT | Database port | 5432 |
| PORT | Server port | 5000 |
