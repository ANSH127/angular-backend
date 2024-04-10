const express = require('express');
const router = express.Router();
const ConfessionControllers = require('../controllers/confessionController');
// confession route

router.get('/confessions', ConfessionControllers.getAllConfessions);

router.post('/addconfession', ConfessionControllers.addConfession);

router.delete('/deleteconfession/:id', ConfessionControllers.deleteConfession);


module.exports = router;