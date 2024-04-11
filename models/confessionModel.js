
const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const confessionSchema = new mongoose.Schema({
    comments: {
        type: [commentSchema],
        default: []
    },
    likes: {
        type: Number,
        default: 0
    },
    likedby: {
        type: Array,
        default: []
    },
    reportedby: {
        type: Array,
        default: []
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    uid: {
        type: String
    }



});


const Confession = mongoose.model('Confession', confessionSchema);

module.exports = Confession;