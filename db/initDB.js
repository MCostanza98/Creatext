const { getConnection } = require('./db');

require('dotenv').config();

async function main(){
    let connection;

    try{
        connection = await getConnection();

        console.log('Borrando tablas existentes')
        await connection.query('DROP TABLE IF EXIST users')
        await connection.query('DROP TABLE IF EXIST photo')
        await connection.query('DROP TABLE IF EXIST like')
        await connection.query('DROP TABLE IF EXIST comment')
        //console.log('Creating tables');

       // await connection.query(
        //    CREATE TABLE users (
        //        id INTEGRED PRIMARY KEY AUTO_INCREMEN,
        //        email VARCHAR(100) UNIQUE NOT NULL,
        //        name VARCHAR(50) NOT NULL,
        //        surname VARCHAR(50) NOT NULL,
        //        password VARCHAR(100) NOT NULL,
        //        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        //    );
        //   );
        // CREATE TABLE Photo (
        //        id INTEGRED PRIMARY KEY AUTO_INCREMEN,
        //        user_id INTEGER NOT NULL,
        //        image (?),
        //        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        //        FOREIGN KEY (user_id) REFERENCES users(id)
        //    );
        // CREATE TABLE Like (
        //        id INTEGRED PRIMARY KEY AUTO_INCREMEN,
        //        user_id VARCHAR(100) UNIQUE NOT NULL,
        //        photo_id VARCHAR(100) UNIQUE NOT NULL,
        //        FOREIGN KEY (user_id) REFERENCES users(id),
        //       
        //    );
        // CREATE TABLE Comment (
        //        id INTEGRED PRIMARY KEY AUTO_INCREMEN,
        //        user_id VARCHAR(100) UNIQUE NOT NULL,
        //        text VARCHAR(200) NOT NULL,
        //        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        //        FOREIGN KEY (user_id) REFERENCES users(id)
        //    );
        //   );

    }catch(error){
    console.error(error);
    }finally{
            if(connection) connection.release();
            process.exit();
        }
}

main();
