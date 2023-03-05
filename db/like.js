const { getConnection } = require('./db');

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
  deleteLikeById,
};
