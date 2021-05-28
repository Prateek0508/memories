const { check } = require('express-validator');
const mongoose = require('mongoose');

const { validUsername, ValidEmail } = require('./index')
const User = mongoose.model('user')
exports.userRegister = [
    check('firstName')
        .not()
        .isEmpty()
        .withMessage('Name is required'),
    check('lastName')
        .not()
        .isEmpty()
        .withMessage('Surname is required'),
    check('email')
        .not()
        .isEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email address'),
    //.ValidEmail,
    check('username')
        .not()
        .isEmpty()
        .withMessage('Username is required'),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Password is required')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "6").withMessage('Password Must Contain a Number,upper,lowe case charactor')
       
];