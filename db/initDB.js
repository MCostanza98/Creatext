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
    // console.log('Creating tables');

    await connection.query(`
            CREATE DATABASE IF NOT EXISTS Finstagram;

            CREATE TABLE users IF NOT EXISTS (
                id INTEGER AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(100) UNIQUE NOT NULL,
                name VARCHAR(50) NOT NULL,
                surname VARCHAR(50) NOT NULL,
                password VARCHAR(100) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
           
         CREATE TABLE Photo IF NOT EXISTS (
                id INTEGER AUTO_INCREMENT PRIMARY KEY,
                user_id INTEGER NOT NULL,
                image VARCHAR(100),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
         CREATE TABLE Like IF NOT EXISTS (
                id INTEGER AUTO_INCREMENT PRIMARY KEY ,
                photo_id VARCHAR(100) UNIQUE NOT NULL,
                FOREIGN KEY (Photo_id) REFERENCES Photo(id),
               
            );
         CREATE TABLE Comment IF NOT EXISTS (
                id INTEGER AUTO_INCREMENT PRIMARY KEY ,
                Photo_id VARCHAR(100) UNIQUE NOT NULL,
                text VARCHAR(200) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (Photo_id) REFERENCES Photo(id)
            );
           );
        `);

    console.log('DATABSES CREATED');
    connection.release();
  } catch (error) {
    console.error(error);
  } finally {
    console.log('EXIT');
    // if (connection) connection.release();
    process.exit();
  }
}

main();