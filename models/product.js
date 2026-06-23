const db = require('../config/db');

const Product = {

    init: () => {
        db.run(`
            CREATE TABLE IF NOT EXISTS barbie_products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                image_url TEXT NOT NULL,
                description TEXT
            )
        `, (err) => {
            if (err) {
                console.error("Ошибка создания таблицы:", err.message);
                return;
            }

            db.get("SELECT COUNT(*) FROM barbie_products", (err, row) => {
                if (err) {
                    console.error("Ошибка проверки количества товаров:", err.message);
                    return;
                }

                const count = row ? row['COUNT(*)'] : 0;

                if (count === 0) {
                    const insertStmt = db.prepare("INSERT INTO barbie_products (name, price, image_url, description) VALUES (?, ?, ?, ?)");
                    
                    insertStmt.run(
                        "Barbie Margot Robbie (Movie Edition)", 
                        49.99, 
                        "https://content1.rozetka.com.ua/goods/images/big/351950380.jpg", 
                        "Эксклюзивная кукла Барби в розовом платье из официальной коллекции к фильму."
                    );
                    
                    insertStmt.run(
                        "Barbie Totally Hair Doll", 
                        29.99, 
                        "https://content.rozetka.com.ua/goods/images/big/652513843.jpg", 
                        "Кукла с супер-длинными волосами для создания невероятных причесок."
                    );
                    
                    insertStmt.run(
                        "Barbie Dreamtopia Princess", 
                        19.99, 
                        "https://content.rozetka.com.ua/goods/images/big_tile/528840914.png", 
                        "Сказочная принцесса Барби из королевства Дримтопия в ярком сияющем корсете."
                    );
                    
                    insertStmt.finalize();
                    console.log("Магазин успешно наполнен новыми куклами Барби!");
                }
            });
        });
    },

    getAll: (callback) => {
        db.all("SELECT * FROM barbie_products", [], callback);
    },

    create: (data, callback) => {
        const sql = 'INSERT INTO barbie_products (name, price, image_url, description) VALUES (?, ?, ?, ?)';
        db.run(sql, [data.name, data.price, data.image_url, data.description], callback);
    }
};

module.exports = Product;