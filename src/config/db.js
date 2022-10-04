import * as dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DB,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT,
    max: 20,
    connectionTimeoutMillis: 2000,
    idleTimeoutMillis: 20000
});

export default pool;