const crypto = require('crypto')
const jasonwebtoken = require('jsonwebtoken')
require('dotenv').config({ path: '../.env' })
module.exports.validPassword = (password, hash, salt) => {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash == hashVerify
}

module.exports.genpasswords = (password) => {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: genHash
    };
}
module.exports.issueJwt = (user) => {
    const _id = user.username;
    const expiresIn = '1d';
    const payload = {
        sub: _id,
        iat: Date.now()
    };
    const Token = jasonwebtoken.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn })

    return {
        token: "Bearer " + Token,
        expires: expiresIn,
    }
}
