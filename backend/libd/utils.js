const crypto = require('crypto')
const jasonwebtoken = require('jsonwebtoken')
require('dotenv').config({ path: '../.env' })
var base64_to_image = require('base64-to-image');
const path = require('path');
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
module.exports.convertImage = (base64Str, filename, filetype) => {
    filename = filename.split(' ').join('_');
    var url = path.join(__dirname, "../public/profilePictures/");
    var Obj = { 'fileName': filename, 'type': filetype };
    var res = base64_to_image(base64Str, url, Obj);
    return `${filename}.jpg`
}
module.exports.convertImageForPost = (base64Str, filename, filetype) => {
    filename = filename.split(' ').join('_');
    var url = path.join(__dirname, "../public/posts/");
    var Obj = { 'fileName': filename, 'type': filetype };
    var res = base64_to_image(base64Str, url, Obj);
    return `${filename}.jpg`
}