-- Create tasks table if it doesn't exist
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data (optional)
-- INSERT INTO tasks (title, description, completed) VALUES
-- ('Sample Task 1', 'This is a sample task', false),
-- ('Sample Task 2', 'Another sample task', true);
