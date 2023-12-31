const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login');
});

//  auth logout
router.get('/logout', (req, res) => {
    res.send('You are logged out');
});

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//  callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('https://jobslisting.onrender.com/api-docs');
});

module.exports = router;