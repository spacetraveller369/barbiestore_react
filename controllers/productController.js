const Product = require('../models/product');

exports.getProducts = (req, res) => {
    Product.getAll((err, rows) => {
        if (err) {
            return res.status(500).send("Ошибка при получении товаров");
        }
        res.render('index', { products: rows });
    });
};

exports.addProduct = (req, res) => {
    const { name, price, image_url, description } = req.body;
    
    Product.create({ name, price, image_url, description }, (err) => {
        if (err) {
            return res.status(500).json({ error: "Ошибка при сохранении куклы в БД" });
        }
        res.status(200).json({ message: "Товар успешно добавлен" });
    });
};

exports.uploadCities = (req, res) => {
    const cities = req.body; 
    if (Array.isArray(cities)) {
        Product.createMany(cities, (err) => {
            if (err) {
                return res.status(500).json({ error: "Ошибка при добавлении городов" });
            }
            res.status(200).json(["Города добавлены!"]);
        });
    } else {
        res.status(400).json({ error: "Неверный формат данных" });
    }
};

exports.getCitiesJson = (req, res) => {
    Product.getAll((err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Ошибка получения данных" });
        }
        const namesOnly = rows.map(row => row.name);
        res.json(namesOnly);
    });
};