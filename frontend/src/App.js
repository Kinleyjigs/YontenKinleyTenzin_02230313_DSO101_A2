import React, { useState, useEffect } from 'react';
import './App.css';
import { getTasks, createTask, updateTask, deleteTask } from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState({ title: '' });
  const [editingTask, setEditingTask] = useState(null);

  // Fetch all tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getTasks();
      setTasks(response.data.tasks || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      alert('Please enter a task');
      return;
    }

    try {
      const response = await createTask(newTask);
      setTasks([response.data.task, ...tasks]);
      setNewTask({ title: '' });
    } catch (err) {
      console.error('Error creating task:', err);
      alert('Failed to create task');
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const response = await updateTask(task.id, { completed: !task.completed });
      setTasks(tasks.map(t => t.id === task.id ? response.data.task : t));
    } catch (err) {
      console.error('Error updating task:', err);
      alert('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
      alert('Failed to delete task');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask({ ...task });
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await updateTask(editingTask.id, {
        title: editingTask.title,
      });
      setTasks(tasks.map(t => t.id === editingTask.id ? response.data.task : t));
      setEditingTask(null);
    } catch (err) {
      console.error('Error updating task:', err);
      alert('Failed to update task');
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Todo List</h1>
      </header>

      <div className="todo-container">
        {/* Add Task Form */}
        <form onSubmit={handleCreateTask} className="add-task-form">
          <h2>Add New Task</h2>
          <div className="form-group">
            <input
              type="text"
              id="title"
              placeholder="Enter your task..."
              value={newTask.title}
              onChange={(e) => setNewTask({ title: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Add Task
          </button>
        </form>

        {/* Error Message */}
        {error && <div className="error">{error}</div>}

        {/* Loading State */}
        {loading && <div className="loading">Loading tasks...</div>}

        {/* Tasks Section */}
        {!loading && (
          <div className="tasks-section">
            {/* Stats */}
            <div className="stats">
              <div className="stat-item">
                <div className="stat-value">{stats.total}</div>
                <div className="stat-label">Total</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{stats.pending}</div>
                <div className="stat-label">Pending</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{stats.completed}</div>
                <div className="stat-label">Completed</div>
              </div>
            </div>

            <h2>Your Tasks</h2>

            {tasks.length === 0 ? (
              <div className="empty-state">
                <h3>No tasks yet</h3>
                <p>Add your first task above to get started!</p>
              </div>
            ) : (
              <ul className="tasks-list">
                {tasks.map((task) => (
                  <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                    {editingTask && editingTask.id === task.id ? (
                      // Edit Mode
                      <form onSubmit={handleUpdateTask} className="edit-form">
                        <div className="form-group">
                          <input
                            type="text"
                            value={editingTask.title}
                            onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                            placeholder="Edit task..."
                          />
                        </div>
                        <div className="task-actions">
                          <button type="submit" className="btn btn-small btn-save">
                            Save
                          </button>
                          <button type="button" className="btn btn-small btn-cancel" onClick={handleCancelEdit}>
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      // View Mode
                      <>
                        <div className="task-header">
                          <input
                            type="checkbox"
                            className="task-checkbox"
                            checked={task.completed}
                            onChange={() => handleToggleComplete(task)}
                          />
                          <h3 className="task-title">{task.title}</h3>
                        </div>
                        <div className="task-actions">
                          <button
                            className="btn btn-small btn-edit"
                            onClick={() => handleEditTask(task)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-small btn-delete"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            Delete
                          </button>
                        </div>
                        <div className="task-meta">
                          Created: {new Date(task.created_at).toLocaleString()}
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
