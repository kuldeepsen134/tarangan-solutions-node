const { auth, users } = require('../controller');

const passport = require('passport');

var router = require('express').Router();



module.exports = app => {

    router.post('/register', users.create)


    router.post('/login', auth.login)

    router.post('/reset-password', auth.forgotPassword)
    router.post('/update-password', auth.forgotPasswordVerify)
    router.get('/me', auth.me)


    router.get("/google", passport.authenticate("google", ["profile", "email"]));

    router.get('/google', (req, res, next) => {
        next();
    },
        passport.authenticate('google', {
            scope: ['email', 'profile'],
            prompt: 'select_account',
            state: true,
        })
    );

    router.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: `http://localhost:3000`,
            failureRedirect: '/api/login',
        })
    );


    app.use('/api', router);
}