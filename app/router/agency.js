const { agencies } = require('../controller');
const { adminAccess } = require('../middleware/auth');

var router = require('express').Router();

module.exports = app => {
    
    router.post('/agencies', agencies.create)

    // router.get('/users/google', users.socialLogin)

    // router.patch('/users/profile', users.updateProfile)

    // router.get('/users/:id',adminAccess, users.findOne)
    // router.get('/users', adminAccess, users.find)

    // router.patch('/users/:id', adminAccess, users.update)

    // router.delete('/users/:id', adminAccess, users.delete)

    app.use('/api', router);
}