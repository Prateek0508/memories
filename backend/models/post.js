const mongoose = require('mongoose');
const crypto = require('crypto');
const postSchema = new mongoose.Schema({
    user: {
        type: String,
        ref: User,
        required: true,
    },
    heading: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    picture: {
        type: String,
        default: ''
    },
    no_of_likes: {
        type: Number,
        default: 0,
    },
    no_of_comments: {
        type: Number,
        default: 0,
    },
    time: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})
mongoose.model('Post', postSchema);
module.exports = mongoose.model('Post', postSchema);