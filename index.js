const express = require('express');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const Product = require('./models/product');

const app = express();
const PORT = 3000;

Product.init();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', productRoutes);

app.listen(PORT, () => {
    console.log(`Магазин Barbie Store запущен на http://localhost:${PORT}`);
});