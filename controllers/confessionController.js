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

// get confession by id

const getConfessionById = async (req, res) => {
    const id = req.params.id;
    try {
        const confession = await Confession.find({uid: id})
        res.status(200).json(confession.filter((confession) => confession.name !== "Anonymous"));
    }
    catch (err) {
        res.status(400).json({ message: err.message });
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

// fetch userdetails by id

const getUserDetailsById = async (req, res) => {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid user id");
        const user = await User.findById(id);
        if (!user) throw new Error("User not found");
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// update likes

const updateLikes = async (req, res) => {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid confession id");
        const confession = await Confession.findById(id);
        if (!confession) throw new Error("Confession not found");

        if (confession.likedby.includes(req.user._id)) {
            // remove like
            const updatedConfession = await Confession.findByIdAndUpdate(id, { likes: confession.likes - 1, $pull: { likedby: req.user._id } }, { new: true });
            return res.status(200).json(updatedConfession);

        }
        else {

            const updatedConfession = await Confession.findByIdAndUpdate(id, { likes: confession.likes + 1, $push: { likedby: req.user._id } }, { new: true });
            res.status(200).json(updatedConfession);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


/// add comment

const addComment = async (req, res) => {
    const id = req.params.id;
    const { comment } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid confession id");
        const confession = await Confession.findById(id);
        if (!confession) throw new Error("Confession not found");
        const updatedConfession = await Confession.findByIdAndUpdate(id, { comments: [...confession.comments, { comment, uid: req.user._id }] }, { new: true });
        res.status(200).json(updatedConfession);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const fetchTrendingConfessions = async (req, res) => {
    try {
        const confessions = await Confession.find().sort({ likes: -1 }).limit(3);
        res.status(200).json(confessions);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// fetch All Users

const fetchAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}


// report confession

const reportConfession = async (req, res) => {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid confession id");
        const confession = await Confession.findById(id);
        if (!confession) throw new Error("Confession not found");

        if (confession.reportedby.includes(req.user._id)) {
            return res.status(400).json({ message: "You have already reported this confession" });

        }
        else {
            const updatedConfession = await Confession.findByIdAndUpdate(id, { $push: { reportedby: req.user._id } }, { new: true });
            res.status(200).json(updatedConfession);
        }





    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}


module.exports = {
    getAllConfessions,
    addConfession,
    deleteConfession,
    getUserConfessions,
    getUserDetails,
    updateLikes,
    addComment,
    fetchTrendingConfessions,
    fetchAllUsers,
    reportConfession,
    getUserDetailsById,
    getConfessionById
}