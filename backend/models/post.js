const mongoose = require('mongoose');
const crypto = require('crypto');
const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        trim: true,
        max: 32
    },
    caption: {
        type: String,
        trim: true
    },
    picture: {
        type: String,
        default: ''
    },
    no_of_likes: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Array,
        default: [],
        ref: 'User'
    },
    comments: {
        type: Array,
        default: [],
        ref: 'Comment'
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
console.log("post model created");
module.exports = mongoose.model('Post', postSchema);