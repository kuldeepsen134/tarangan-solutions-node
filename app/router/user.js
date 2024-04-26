const { users } = require('../controller');
const { adminAccess } = require('../middleware/auth');

var router = require('express').Router();

module.exports = app => {
    router.post('/users', users.addUser)
    router.get('/users/google', users.socialLogin)

    router.patch('/users/profile', users.updateProfile)

    router.get('/users', adminAccess, users.find)
    router.get('/users/:id', adminAccess, users.findOne)

    router.patch('/users/:id', adminAccess, users.update)

    // Update user profile

    router.delete('/users/:id', adminAccess, users.delete)

    app.use('/api', router);
}