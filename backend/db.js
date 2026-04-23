const { Pool } = require('pg');
require('dotenv').config();

// PostgreSQL connection pool using environment variables.
// If DATABASE_URL is provided (Render provides this automatically for managed DBs), it will be used.
// Otherwise, fall back to individual DB_* variables.
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    })
  : new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 5432,
    });

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error connecting to the database:', err.stack);
  } else {
    console.log('✅ Database connected successfully');
    release();
  }
});

module.exports = pool;
