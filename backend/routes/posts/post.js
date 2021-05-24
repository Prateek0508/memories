const router = require('express').Router();
const mongoose = require('mongoose')
const Post = mongoose.model('Post')
const { createPost, sendPost,updateLikes } = require('../../controllers/post')
router.post('/createPost', createPost)
router.get('/getPosts', sendPost)
router.post('/likes',updateLikes)
module.exports = router;