const mongoose = require('mongoose')
const User = mongoose.model('user')
const { loginCheck, register, authentication, profile,updateProfile } = require('../../controllers/auth')
const router = require('express').Router();
const passport = require('passport')
require('../../config/passport')(passport)
const { userRegister } = require('../../validators/auth')
const { runValidation } = require('../../validators/index')
router.get('/protected', passport.authenticate('jwt', { session: false }), authentication)
router.post('/login', loginCheck)
router.post('/register', userRegister, runValidation, register)
router.post('/uploadProfilePicture', profile)
router.post('/updateProfile',updateProfile)
module.exports = router;