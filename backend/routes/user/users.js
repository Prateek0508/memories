const multer = require('multer')
const mongoose = require('mongoose')
const User = mongoose.model('user')
const path = require('path');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/profilePictures')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ storage: storage })
const { loginCheck, register, authentication } = require('../../controllers/auth')
const router = require('express').Router();
const passport = require('passport')
require('../../config/passport')(passport)
const { userRegister } = require('../../validators/auth')
const { runValidation } = require('../../validators/index')

router.get('/protected', passport.authenticate('jwt', { session: false }), authentication)
router.post('/login', loginCheck)
router.post('/register', userRegister, runValidation, register)
router.post('/uploadProfilePicture', upload.single('file'), (req, res, next) => {
    console.log(req.body)
    console.log(req.file)
    if (req.file) {
        let user = User.findOne({ _id: req.body.id })
        // user.porofile_pic = req.file.filename
        // user.save()
        res.json({ success: true })
    } else {
        res.json({ success: false, msg: 'can not upload profile picture' })
    }
})
module.exports = router;