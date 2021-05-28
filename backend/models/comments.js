const mongoose = require('mongoose');
const crypto = require('crypto');
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        max: 32,
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})
mongoose.model('Comment', commentSchema);
module.exports = mongoose.model('Comment', commentSchema);