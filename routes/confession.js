const express = require('express');
const router = express.Router();

// confession route

router.post('/confession', (req, res) => {
    res.send('confession route');
});

module.exports = router;