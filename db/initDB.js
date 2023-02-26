const db = require('./db');

require('dotenv').config();

async function main() {
  try {
    const connection = await db.getConnection();
    //console.log('Borrando tablas existentes')
    //  await connection.query('DROP TABLE IF EXIST users')
    //  await connection.query('DROP TABLE IF EXIST photo')
    //  await connection.query('DROP TABLE IF EXIST like')
    // await connection.query('DROP TABLE IF EXIST comment')
   console.log('Creating tables');

         await connection.query(`
           CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                name VARCHAR(50) NOT NULL,
                surname VARCHAR(50) NOT NULL,
                password VARCHAR(100) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );
            `);
          await connection.query(`
           CREATE TABLE IF NOT EXISTS Photo (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                user_id INTEGER NOT NULL,
                image VARCHAR(100),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
                );
            `);
          await connection.query(`
            CREATE TABLE IF NOT EXISTS Likes (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                photo_id INTEGER UNIQUE NOT NULL, 
                FOREIGN KEY (Photo_id) REFERENCES Photo(id)
                );
               
            `);
          await connection.query(`
            CREATE TABLE IF NOT EXISTS Comment (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                Photo_id INTEGER UNIQUE NOT NULL,
                text VARCHAR(200) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (Photo_id) REFERENCES Photo(id)
                );
            `);

    console.log('DATABSES CREATED');
    //connection.release();
  } catch (error) {
    console.error(error);
  } finally {
    console.log('EXIT');
     //if (connection) connection.release();
    process.exit();
  }
}

main();