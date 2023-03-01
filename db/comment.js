// const { generateError } = require('../helpers');
const { getConnection } = require('./db');

const createComment = async (userId, photoId, text = ' ') => {
  const connection = await getConnection();

  //modificar el siguiente sql para que incluya photoid
  const [result] = await connection.query(
    `
        INSERT INTO comment (user_id, photoId, text)
        VALUES(?,?)`[(userId, text)]
  );
  return result.insertId;
};

module.exports = {
  createComment,
};
