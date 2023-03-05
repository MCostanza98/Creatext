const { getConnection } = require('./db');
const { generateError } = require('../helpers');

const deletePhotoById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `
      DELETE FROM photos WHERE id = ?`,
      [id]
    );

    return;
  } finally {
    if (connection) connection.release();
  }
};

const getPhotoById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
    SELECT * FROM photos WHERE id = ?`,
      [id]
    );

    if (result.length === 0)
      throw generateError(`La foto con id: ${id} no existe`, 404);

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

const getAtllPhotos = async () => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(`
    SELECT * FROM photos ORDER BY created_at DESC`);
    return result;
  } finally {
    if (connection) connection.release();
  }
};
const createPhoto = async (userId = ' ') => {
  const connection = await getConnection();

  const [result] = await connection.query(
    `
        INSERT INTO comment (user_id, photoId, text)
        VALUES(?)`[userId]
  );
  return result.insertId;
};

module.exports = {
  createPhoto,
  getAtllPhotos,
  getPhotoById,
  deletePhotoById,
};
