const db = require('./db');

require('dotenv').config();

async function main() {
  try {
    const connection = await db.getConnection();
    console.log('Borrando tablas existentes');
    await connection.query('DROP TABLE IF EXISTS comment');
    await connection.query('DROP TABLE IF EXISTS likes');
    await connection.query('DROP TABLE IF EXISTS photo');
    await connection.query('DROP TABLE IF EXISTS users');
    console.log('Creating tables');

    await connection.query(`
           CREATE TABLE IF NOT EXISTS user (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                name VARCHAR(50),
                surname VARCHAR(50),
                password VARCHAR(100) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                );
            `);
    await connection.query(`
           CREATE TABLE IF NOT EXISTS photo (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                user_id INTEGER NOT NULL,
                image VARCHAR(100),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES user(id)
                );
            `);
    await connection.query(`
            CREATE TABLE IF NOT EXISTS likes (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                user_id INTEGER UNIQUE NOT NULL,
                photo_id INTEGER UNIQUE NOT NULL,
                FOREIGN KEY (user_id) REFERENCES user(id),
                FOREIGN KEY (photo_id) REFERENCES photo(id)
                );
            `);
    await connection.query(`
            CREATE TABLE IF NOT EXISTS comment (
                id INTEGER PRIMARY KEY AUTO_INCREMENT,
                user_id INTEGER UNIQUE NOT NULL,
                photo_id INTEGER UNIQUE NOT NULL,
                text VARCHAR(200) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES user(id),
                FOREIGN KEY (photo_id) REFERENCES photo(id)
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
