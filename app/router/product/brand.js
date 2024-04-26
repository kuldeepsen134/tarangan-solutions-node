var router = require('express').Router();
const { brands } = require('../../controller');


module.exports = app => {
    router.post('/brands', brands.create);
    router.get('/brands', brands.find);
    router.get('/brands/:id', brands.findOne);

    router.patch('/brands/:id', brands.updateBrand);
    router.delete('/brands/:id', brands.removeBrand);


    app.use('/api', router);
};