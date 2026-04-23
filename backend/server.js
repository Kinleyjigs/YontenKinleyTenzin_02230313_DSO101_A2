const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Todo API is running!', status: 'success' });
});

// CREATE - Add a new task
app.post('/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const newTask = await pool.query(
      'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
      [title, description || '']
    );

    res.status(201).json({
      message: 'Task created successfully',
      task: newTask.rows[0]
    });
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'Failed to create task', details: err.message });
  }
});

// READ - Get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const allTasks = await pool.query(
      'SELECT * FROM tasks ORDER BY created_at DESC'
    );

    res.json({
      message: 'Tasks retrieved successfully',
      count: allTasks.rows.length,
      tasks: allTasks.rows
    });
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Failed to fetch tasks', details: err.message });
  }
});

// READ - Get a single task by ID
app.get('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);

    if (task.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({
      message: 'Task retrieved successfully',
      task: task.rows[0]
    });
  } catch (err) {
    console.error('Error fetching task:', err);
    res.status(500).json({ error: 'Failed to fetch task', details: err.message });
  }
});

// UPDATE - Update a task
app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const updateTask = await pool.query(
      `UPDATE tasks 
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           completed = COALESCE($3, completed),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $4
       RETURNING *`,
      [title, description, completed, id]
    );

    if (updateTask.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({
      message: 'Task updated successfully',
      task: updateTask.rows[0]
    });
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Failed to update task', details: err.message });
  }
});

// DELETE - Delete a task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [id]
    );

    if (deleteTask.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({
      message: 'Task deleted successfully',
      task: deleteTask.rows[0]
    });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Failed to delete task', details: err.message });
  }
});

// Initialize database table on startup
const initDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Database table initialized');
  } catch (err) {
    console.error('❌ Error initializing database:', err);
  }
};

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  initDatabase();
});
