const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('user')
const passport = require('passport')
const util = require('../libd/utils');
require('../config/passport')(passport)
exports.loginCheck = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) {
                return res.json({ success: false, status: 404, msg: "Username Invalid" })
            }
            else {
                const isValid = util.validPassword(req.body.password, user.hash, user.salt)
                if (isValid) {
                    const tokenObject = util.issueJwt(user);
                    return res.json({ success: true, token: tokenObject.token, expires: tokenObject.expires })
                }
                else {
                    return res.json({ success: false, status: 401, msg: "Incorrect Password" })
                }
            }
        })
        .catch((err) => {
            next(err)
        })
}
exports.register = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user) {
                return res.json({ success: false, error: "user already registered" })
            }
            else {
                User.findOne({ email: req.body.email })
                    .then((user) => {
                        if (user) {
                            return res.json({ success: false, error: "email already registered" })
                        }
                        else {
                            const salthash = util.genpasswords(req.body.password)
                            const salt = salthash.salt
                            const hash = salthash.hash

                            const newUser = new User({
                                username: req.body.username,
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                email: req.body.email,
                                salt: salt,
                                hash: hash,
                            })
                            newUser.save()
                            const tokenObject = util.issueJwt(newUser)
                            res.send({ success: true, token: tokenObject.token, expires: tokenObject.expires })

                        }
                    })
            }
        })


}
exports.authentication = async (req, res, next) => {

    await User.findOne({ _id: req.user._id }).populate({
        path: 'posts'
    }).then(result => {
        res.status(200).json({ success: true, user: result })

    }).catch(err => {
        return res.json({ success: false, msg: 'can not update user , something went wrong!!!' })
    })
}
exports.profile = (req, res, next) => {
    var imageBase64 = req.body.src;
    var _id = req.body._id
    var bio = req.body.bio
    const response = util.convertImage(imageBase64, _id, "jpg")
    const query = { "_id": _id };
    const update = {
        "$set": {
            'bio': bio,
            profile_pic: response
        }
    }
    const options = { "upsert": false };
    User.updateOne(query, update, options)
        .then(result => {
            return res.json({ success: true })
        })
        .catch(err => {
            return res.json({ success: false, msg: 'can not update user , something went wrong!!!' })
        })
}
exports.updateProfile = (req, res, next) => {

    const imageBase64 = req.body.picture
    User.findOne({ _id: req.body._id })
        .then(result => {
            User.findOne({ username: req.body.username })
                .then(data => {
                    if (data) {
                        if (data.username === result.username) {
                            if (imageBase64 !== `http://localhost:8000/profilePictures/${result.profile_pic}`) {
                                const response = util.convertImage(imageBase64, result._id.toString(), "jpg")
                            }
                            result.username = req.body.username
                            result.bio = req.body.bio
                            result.save();
                            return res.json({success: true})
                        }
                        else {
                            return res.json({
                                success: false,
                                msg: 'User name already exists'
                            })
                        }
                    }
                    else {
                        if (imageBase64 !== `http://localhost:8000/profilePictures/${result.profile_pic}`) {
                            const response = util.convertImage(imageBase64, result._id.toString(), "jpg")
                        }
                        result.username = req.body.username
                        result.bio = req.body.bio
                        result.save();
                        return res.json({success: true})
                    }

                })

        })
}
