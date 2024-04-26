const { productCategories } = require('../../controller');

var router = require('express').Router();

module.exports = app => {
    router.post('/product-categories', productCategories.create);
    router.get('/product-categories', productCategories.find);
    router.get('/product-categories/:id', productCategories.findOne);

    router.patch('/product-categories/:id', productCategories.updateProductCategory);
    router.delete('/product-categories/:id', productCategories.removeProductCategory);

    
    app.use('/api', router);
};