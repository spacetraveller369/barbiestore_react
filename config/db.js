const { Pool } = require('pg');

const connectionString = 'postgresql://neondb_owner:npg_PVTdXIlUF18y@ep-noisy-credit-ato4mj2e.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false 
    }
});

pool.on('connect', () => {
    console.log('Успешно подключено к внешней базе данных PostgreSQL!');
});

module.exports = pool;