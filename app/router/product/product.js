const { products } = require('../../controller');
const { adminAccess } = require('../../middleware/auth');

var router = require('express').Router();

module.exports = app => {
    router.post('/products', products.create);

    router.get('/products', products.find);
    router.get('/products/:id', products.findOne);

    router.patch('/update-product/:id', products.updateProduct);

    router.delete('/remove-products/:id', adminAccess, products.removeProduct);

    app.use('/api', router);
};