const express = require('express');
const router = express.Router();
const ConfessionControllers = require('../controllers/confessionController');
// confession route

router.get('/getconfession', ConfessionControllers.getAllConfessions);

router.post('/addconfession', ConfessionControllers.addConfession);

router.delete('deleteconfession/:id', ConfessionControllers.deleteConfession);


module.exports = router;