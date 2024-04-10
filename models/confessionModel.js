
const mongoose = require('mongoose');

const confessionSchema = new mongoose.Schema({
    comments: {
        type: Array,

    },
    likes: {
        type: Number,
        default: 0
    },
    likedby: {
        type: Array
    },
    reportedby: {
        type: Array
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