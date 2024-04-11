const express = require('express');
const router = express.Router();
const ConfessionControllers = require('../controllers/confessionController');
const requireAuth = require('../middleware/requireAuth');


// middleware
router.use(requireAuth);

// confession route

router.get('/confessions', ConfessionControllers.getAllConfessions);

router.get('/userconfessions', ConfessionControllers.getUserConfessions);

router.post('/addconfession', ConfessionControllers.addConfession);

router.delete('/deleteconfession/:id', ConfessionControllers.deleteConfession);


module.exports = router;