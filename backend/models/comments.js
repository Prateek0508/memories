const mongoose = require('mongoose');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
    content: {
        type: String,
        max: 32,
    },
    post_id: {
        type: String,
    },
    commented_by: {
        type: String,

    },
    commented_on: {
        type: String,
    }
})
mongoose.model('User', userSchema);
module.exports = mongoose.model('user', userSchema);