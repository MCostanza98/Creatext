const { getConnection } = require('./db');
//const { generateError } = require('../helpers');

const getLikeById = async (userId, photoId = ' ') => {
  const connection = await getConnection();

  const [result] = await connection.query(
    `
        INSERT INTO likes (user_id, photoId)
        VALUES(?,?)`[(userId, photoId)]
  );
  return result.insertId;
};

const deleteLikeById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `
      DELETE FROM likes WHERE id = ?`,
      [id]
    );

    return;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  getLikeById,
  deleteLikeById,
};
