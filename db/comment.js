const { getConnection } = require('./db');

const deleteCommentById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `
      DELETE FROM comment WHERE id = ?`,
      [id]
    );

    return;
  } finally {
    if (connection) connection.release();
  }
};

const createComment = async (userId, photoId, text = ' ') => {
  const connection = await getConnection();

  const [result] = await connection.query(
    `
        INSERT INTO comment (user_id, photoId, text)
        VALUES(?,?,?)`[(userId, photoId, text)]
  );
  return result.insertId;
};

module.exports = {
  createComment,
  deleteCommentById,
};
