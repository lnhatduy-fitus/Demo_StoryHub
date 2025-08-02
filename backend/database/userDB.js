import dotenv from 'dotenv';
dotenv.config();

import sql from 'mssql';

// config data to sql server
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }
};

const connection = new sql.ConnectionPool(config)
    .connect()
    .then (success => {
        console.log("Connected to DB");
        return success;
    })
    .catch( err => {
        console.error('Connet fail', err);
    });

export {sql, connection}