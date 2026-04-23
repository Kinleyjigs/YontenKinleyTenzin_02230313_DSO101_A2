# Todo Frontend

A React-based frontend application for managing todo tasks.

## Features

- ✅ Add new tasks with title and description
- ✅ View all tasks with real-time status
- ✅ Mark tasks as completed/uncompleted
- ✅ Edit existing tasks
- ✅ Delete tasks
- ✅ Task statistics (Total, Pending, Completed)
- ✅ Responsive design
- ✅ Environment variable configuration

## Tech Stack

- React 18
- Axios for API calls
- CSS3 for styling

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000
```

**Important:** For production deployment, update this to your live backend URL.

### 3. Run the Application

#### Development Mode
```bash
npm start
```
The app will run on `http://localhost:3000`

#### Production Build
```bash
npm run build
```
This creates an optimized production build in the `build/` folder.

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| REACT_APP_API_URL | Backend API URL | http://localhost:5000 |

**Note:** In React, environment variables must start with `REACT_APP_` to be accessible in the application.

## Project Structure

```
frontend/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── App.js             # Main application component
│   ├── App.css            # Application styles
│   ├── api.js             # API service functions
│   ├── index.js           # React entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies
├── .env.example           # Environment variables template
└── README.md             # This file
```

## API Integration

The frontend connects to the backend API using Axios. All API calls are centralized in `src/api.js`:

- `getTasks()` - Fetch all tasks
- `createTask(taskData)` - Create a new task
- `updateTask(id, taskData)` - Update an existing task
- `deleteTask(id)` - Delete a task

## Features Breakdown

### Add Task
- Input fields for title (required) and description (optional)
- Form validation
- Real-time task addition

### Task List
- Display all tasks with status
- Checkbox to toggle completion
- Edit and Delete buttons
- Task creation timestamp

### Edit Task
- Inline editing
- Update title and description
- Cancel functionality

### Statistics
- Total tasks count
- Pending tasks count
- Completed tasks count

## Deployment

For deployment to Render or other platforms:

1. Build the production version:
```bash
npm run build
```

2. Update the `.env` file with your production backend URL:
```env
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

3. Deploy the `build/` folder or use Docker (see Dockerfile in root).
