
const express = require('express');
const router = express.Router();

// login route
router.post('/login', (req, res) => {
    res.send('login route');
});

// signup route
router.post('/signup', (req, res) => {
    res.send('signup route');
});

module.exports = router;