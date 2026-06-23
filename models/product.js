const pool = require('../config/db');

const Product = {
    
    init: async () => {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS barbie_products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price NUMERIC(10, 2) NOT NULL,
                image_url TEXT NOT NULL,
                description TEXT
            );
        `;
        try {
            await pool.query(createTableQuery);

            const res = await pool.query("SELECT COUNT(*) FROM barbie_products");
            const count = parseInt(res.rows[0].count);

            if (count === 0) {
                const insertQuery = `
                    INSERT INTO barbie_products (name, price, image_url, description) 
                    VALUES ($1, $2, $3, $4)
                `;
                
                await pool.query(insertQuery, [
                    "Barbie Margot Robbie (Movie Edition)", 
                    49.99, 
                    "https://content1.rozetka.com.ua/goods/images/big/351950380.jpg", 
                    "Эксклюзивная кукла Барби в розовом платье из официальной коллекции к фильму."
                ]);
                
                await pool.query(insertQuery, [
                    "Barbie Totally Hair Doll", 
                    29.99, 
                    "https://content.rozetka.com.ua/goods/images/big/652513843.jpg", 
                    "Кукла с супер-длинными волосами для создания невероятных причесок."
                ]);
                
                await pool.query(insertQuery, [
                    "Barbie Dreamtopia Princess", 
                    19.99, 
                    "https://content.rozetka.com.ua/goods/images/big_tile/528840914.png", 
                    "Сказочная принцесса Барби из королевства Дримтопия в ярком сияющем корсете."
                ]);
                
                console.log("Внешняя база данных успешно наполнена начальными товарами!");
            }
        } catch (err) {
            console.error("Ошибка при инициализации PostgreSQL:", err.message);
        }
    },

    getAll: async (callback) => {
        try {
            const res = await pool.query("SELECT * FROM barbie_products ORDER BY id ASC");
            callback(null, res.rows);
        } catch (err) {
            callback(err, null);
        }
    },

    create: async (data, callback) => {
        const sql = 'INSERT INTO barbie_products (name, price, image_url, description) VALUES ($1, $2, $3, $4)';
        try {
            await pool.query(sql, [data.name, data.price, data.image_url, data.description]);
            callback(null);
        } catch (err) {
            callback(err);
        }
    },

    createMany: async (citiesArray, callback) => {
        const sql = 'INSERT INTO barbie_products (name, price, image_url, description) VALUES ($1, $2, $3, $4)';
        try {
            for (const cityName of citiesArray) {
                await pool.query(sql, [cityName, 0.00, 'https://via.placeholder.com/240', 'Автоматически импортированный город']);
            }
            callback(null);
        } catch (err) {
            callback(err);
        }
    }
};

module.exports = Product;