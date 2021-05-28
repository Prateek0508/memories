const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const multer = require('multer')
var nodemailer = require('nodemailer');
require('dotenv').config({ path: './.env' });
const app = express();
require('./config/databse')
require('./models/user')
require('./models/post')
require('./models/comments')
var { reSetPassword } = require('./controllers/auth')
var { passwordCheck } = require('./validators/forgotPassword')
var { runValidation } = require('./validators/index')
app.use(cors({ origin: `${process.env.CLIENT_URL}` }))

app.use(express.json({ limit: '50mb', }));
app.use(express.urlencoded({
    limit: '50mb',
    extended: true
}));

require('./config/passport')(passport)
app.use(passport.initialize())
require('./config/passport')(passport);
app.post('/setPassword',reSetPassword)

app.use('/api', require('./routes/user/index'))
app.use('/post', require('./routes/posts/post'))
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(__dirname + '/public'));


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`app is listening to port ${port}`)
})