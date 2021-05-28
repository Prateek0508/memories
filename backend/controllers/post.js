const Post = require('../models/post')
const util = require('../libd/utils')
const User = require('../models/user')
const comment = require('../models/comments')
const { post } = require('../routes/posts/post')
exports.createPost = async (req, res, next) => {
    const imageBase64 = req.body.image;
    const filename = Date.now().toString()
    const response = util.convertImageForPost(imageBase64, filename, "jpg")
    var newPost = new Post({
        title: req.body.title,
        caption: req.body.caption,
        picture: response,
        user: req.body.user_id
    })
    newPost.save()
    User.findOne({ _id: req.body.user_id })
        .then(async (user) => {
            user.posts.push(newPost._id)
            await user.save()
            return res.json({ success: true })
        })
        .catch(err => {
            res.json({ success: false, msg: 'something went wrong' })
        })
}

exports.sendPost = async (req, res, next) => {
    Post.find({}).limit(20).sort({ createdAt: -1 })
        .populate({
            path: 'user',   
            select: 'username profile_pic createdAt _id'
        }).populate({
            path: 'comments',
            populate: [{
                path: 'user',
                select: 'username profile_pic createdAt _id'
            }]
        }).populate({
            path: 'likes',
            select: 'username profile_pic createdAt _id'
        }).then(posts => {
            res.json({ posts: posts })
        })

}
exports.updateLikes = (req, res, next) => {
    Post.findOne({ _id: req.body.likedTo })
        .then(post => {
            if (req.body.like === +1) {
                post.no_of_likes = post.no_of_likes + 1
                post.likes.push(req.body.likedBy)
                post.save()
                return res.json({ success: true })
            }
            else {
                post.no_of_likes = post.no_of_likes - 1
                const index = post.likes.indexOf(req.body.likedBy)
                post.likes.splice(index, 1)
                post.save()
                return res.json({ success: true })
            }
        }).catch(err => {
            return res.json({success: false})
        })
}
exports.addComment = (req, res, next) => {
    var newComment = new comment({
        content: req.body.content,
        post_id: req.body.post_id,
        user: req.body.commentedby
    })
    newComment.save()
    Post.findOne({ _id: req.body.post_id })
        .then(post => {
            post.comments.push(newComment._id)
            post.no_of_comments = post.no_of_comments + 1
            post.save()
            res.json({ success: true })
        }).catch(err => {
            res.json({ success: false })
        })
}