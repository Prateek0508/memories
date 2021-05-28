const mongoose = require('mongoose')
const User = mongoose.model('user')
const { loginCheck,
     register, 
     authentication, 
     profile,
     updateProfile,
     userDetails,
     searchUser,
     sendEmail ,
     reSetPassword
    } = require('../../controllers/auth')

const router = require('express').Router();
const passport = require('passport')
require('../../config/passport')(passport)
const { userRegister } = require('../../validators/auth')
const {passwordCheck}=require('../../validators/forgotPassword')
const { runValidation } = require('../../validators/index')
router.get('/protected', passport.authenticate('jwt', { session: false }), authentication)
router.post('/login', loginCheck)
router.post('/register', userRegister, runValidation, register)
router.post('/uploadProfilePicture', profile)
router.post('/updateProfile',updateProfile)
router.post('/userDetail',userDetails)
router.get('/search',searchUser)
router.post('/forgotPassword',sendEmail)
router.post('/password',passwordCheck,runValidation,reSetPassword)
module.exports = router;