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
    user:{
        type:String,
        ref:'user'
    },
})
mongoose.model('Comment', userSchema);
console.log('comment model created');
module.exports = mongoose.model('comment', userSchema);