const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../barbie_shop.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Ошибка подключения к БД:', err.message);
    else console.log('Подключено к базе данных SQLite (Barbie Store).');
});

module.exports = db;