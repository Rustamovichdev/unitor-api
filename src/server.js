const env = require('./config/env');
const { pool } = require('./config/db');
const app = require('./app');

const startServer = async () => {
  try {
    await pool.connect();
    console.log('Connected to PostgreSQL database');

    app.listen(env.port, () => {
      console.log(`Server is running on port ${env.port} (${env.nodeEnv})`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
};

startServer();

