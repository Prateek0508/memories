const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user')
require('dotenv').config({ path: '../.env' })

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: process.env.JWT_SECRET,
};
module.exports = (passport) => {

    passport.use('jwt', new JwtStrategy(options, (jwt_payload, done) => {

        User.findOne({ username: jwt_payload.sub }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }

        });

    }));
}