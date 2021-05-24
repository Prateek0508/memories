const Post = require('../models/post')
const util = require('../libd/utils')
const User = require('../models/user')
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
    Post.find({}).limit(20).sort({ createdAt: -1 }).populate({
        path: 'user',
        select: '-hash -salt'
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

            }
            else {
                post.no_of_likes = post.no_of_likes - 1
                post.likes.pull(req.body.likedBy)
                post.save()
            }
        })
}