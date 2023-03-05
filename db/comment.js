const { getConnection } = require('./db');

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
};
