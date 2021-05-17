const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const User = mongoose.model('user')
module.exports.runValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, error: errors.array()[0].msg });
    }
    next();
};
// module.exports.ValidEmail = ({ email }, req) => {
//     User.findOne({ email: email })
//         .then((user) => {
//             if (user) {
//                 const errors = new Error('email already registered')
//                 return errors
//             }
//             else {
//                 return true
//             }
//         })

// }
// module.exports.validUsername = ({ username }, req) => {
//     User.findOne({ username: username })
//         .then((user) => {
//             if (user) {
//                 const errors = new Error('Username already registered')
//                 return errors
//             }
//             else {
//                 return true
//             }
//         })

// }
