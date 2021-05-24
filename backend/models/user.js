const mongoose = require('mongoose');
const crypto = require('crypto');
const { isString } = require('util');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        max: 32,
        unique: true,
        index: true,
    },
    firstName: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    bio: {
        type: String,
        trim: true,
        max: 32,
        default: ''
    },
    profile_pic: {
        type: String,
        default: ''
    },
    posts: {
        type: Array,
        default: [],
        ref: 'Post'
    },
    hash: String,
    salt: String
}, {
    timestamps: true
})
mongoose.model('User', userSchema);
console.log("user model created");
module.exports = mongoose.model('user', userSchema);