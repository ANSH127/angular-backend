const express = require('express');
const router = express.Router();
const ConfessionControllers = require('../controllers/confessionController');
const requireAuth = require('../middleware/requireAuth');


// middleware
router.use(requireAuth);

// confession route

router.get('/confessions', ConfessionControllers.getAllConfessions);

router.get('/userconfessions', ConfessionControllers.getUserConfessions);

router.get('/confessionbyid/:id', ConfessionControllers.getConfessionById);

router.post('/addconfession', ConfessionControllers.addConfession);

router.delete('/deleteconfession/:id', ConfessionControllers.deleteConfession);

// fetch user  details
router.get('/getuserdetails', ConfessionControllers.getUserDetails);

// fetch user details by id

router.get('/getuserdetailsbyid/:id', ConfessionControllers.getUserDetailsById);

// update user likes

router.patch('/updatelikes/:id', ConfessionControllers.updateLikes);

// add user comments

router.patch('/addcomment/:id', ConfessionControllers.addComment);


// fetch trending confessions

router.get('/trendingconfessions', ConfessionControllers.fetchTrendingConfessions);

// fetch all users

router.get('/fetchallusers', ConfessionControllers.fetchAllUsers);

// report confession

router.patch('/reportconfession/:id', ConfessionControllers.reportConfession);

module.exports = router;