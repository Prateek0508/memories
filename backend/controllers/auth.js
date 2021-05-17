const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('user')
const passport = require('passport')
const util = require('../libd/utils');
const user = require('../models/user');
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
exports.authentication = (req, res, next) => {
    res.status(200).json({ success: true, user: req.user })
}