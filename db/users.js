const { generateError } = require('../helpers');
const { getConnection } = require('./db');
const bcrypt = require('bcrypt');

const getUserByEmail = async (email) => {
  let connection;

  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
        SELECT id, email, created_at FROM user WHERE email=?
        `,
      [email]
    );

    if (result.length === 0) {
      throw generateError('No hay usuario con ese email', 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

// Devuelve la informacion publica de un usuario por ID

const getUserById = async (id) => {
  let connection;

  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
        SELECT id, email, created_at FROM user WHERE id=?
        `,
      [id]
    );

    if (result.length === 0) {
      throw generateError('No hay usuario con esa id', 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

// usuario y id
const createUser = async (email, password) => {
  const connection = await getConnection();

  const [user] = await connection.query(
    `
            SELECT id FROM user WHERE email = ?
            `,
    [email]
  );

  if (user.length > 0) {
    throw generateError('Ya existe un usuario con ese email', 409);
  }

  const passwordHash = await bcrypt.hash(password, 8);
  const [newUser] = await connection.query(
    `
            INSERT INTO user (email, password) VALUES(?, ?)
            `,
    [email, passwordHash]
  );
  return newUser.insertId;
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
};
