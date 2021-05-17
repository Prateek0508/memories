const express = require('express');
const cors = require('cors');
const passport = require('passport');


require('dotenv').config();
const app = express();
require('./config/databse')
require('./models/user')
app.use(cors({ origin: `${process.env.CLIENT_URL}` }))


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
require('./config/passport')(passport)
app.use(passport.initialize())
require('./config/passport')(passport);
app.use('/api', require('./routes/user/index'))

app.get('/test', (req, res) => {
    rest.json({ success: true })
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`app is listening to port ${port}`)
})