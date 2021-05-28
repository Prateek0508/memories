const { check } = require('express-validator');
exports.passwordCheck = [
    check('password')
        .not()
        .isEmpty()
        .withMessage('Password is required')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "6").withMessage('Password Must Contain a Number,upper,lowe case charactor')

];