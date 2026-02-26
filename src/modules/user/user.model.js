const { query } = require('../../config/db');

const USER_ROLES = {
  OWNER: 'Owner',
  MANAGER: 'Manager',
  TRAINER: 'Trainer',
  CLIENT: 'Client',
};

const createUser = async ({ firstName, lastName, phone, email, passwordHash, role }) => {
  const text = `
    INSERT INTO users (first_name, last_name, phone, email, password_hash, role)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, first_name, last_name, phone, email, role, created_at, updated_at
  `;

  const values = [firstName, lastName, phone, email, passwordHash, role];

  const result = await query(text, values);
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await query(
    `
      SELECT id, first_name, last_name, phone, email, password_hash, role, created_at, updated_at
      FROM users
      WHERE email = $1
    `,
    [email]
  );

  return result.rows[0] || null;
};

const findUserById = async (id) => {
  const result = await query(
    `
      SELECT id, first_name, last_name, phone, email, role, created_at, updated_at
      FROM users
      WHERE id = $1
    `,
    [id]
  );

  return result.rows[0] || null;
};

module.exports = {
  USER_ROLES,
  createUser,
  findUserByEmail,
  findUserById,
};

