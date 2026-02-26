const { Pool } = require('pg');
const env = require('./env');

const pool = new Pool({
  connectionString: env.databaseUrl,
});

pool.on('error', (err) => {
  // In production, you might want to log this with a proper logger
  console.error('Unexpected error on idle PostgreSQL client', err);
  process.exit(-1);
});

const query = (text, params) => pool.query(text, params);

module.exports = {
  pool,
  query,
};

