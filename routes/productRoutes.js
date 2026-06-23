const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);

router.post('/add', productController.addProduct);

router.post('/dotnet/upload.php', productController.uploadCities);
router.get('/dotnet/get_cities.php', productController.getCitiesJson);

module.exports = router;