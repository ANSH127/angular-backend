const Confession = require('../models/confessionModel');
const mongoose = require('mongoose');
const User = require('../models/userModel');
// get confwssion


const getAllConfessions = async (req, res) => {
    try {
        const confessions = await Confession.find();
        res.status(200).json(confessions);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}


// get user confession

const getUserConfessions = async (req, res) => {
    try {
        const confessions = await Confession.find({ uid: req.user._id });
        res.status(200).json(confessions);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// add confession

const addConfession = async (req, res) => {
    const { name, description, comments, likes, likedby, reportedby, createdAt } = req.body;
    let emptyfields = [];
    if (!name) {
        emptyfields.push("name");
    }
    if (!description) {
        emptyfields.push("description");
    }

    if (emptyfields.length > 0) {
        return res.status(400).json({ message: `please fill in the following fields: ${emptyfields.join(", ")}` });
    }
    const newConfession = new Confession({
        name,
        description,
        comments,
        likes,
        likedby,
        reportedby,
        createdAt: new Date(),
        uid: req.user._id
    });
    try {
        await newConfession.save();
        res.status(201).json({ message: "Confession added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// delete confession

const deleteConfession = async (req, res) => {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid confession id");
        const confession = await Confession.findById(id);
        if (!confession) throw new Error("Confession not found");
        await Confession.findByIdAndDelete(id);
        res.status(200).json({ message: "Confession deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// fetch user

const getUserDetails = async (req, res) => {
    
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}


module.exports = {
    getAllConfessions,
    addConfession,
    deleteConfession,
    getUserConfessions,
    getUserDetails
}