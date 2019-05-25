const express = require('express');

const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
var url = "mongodb+srv://<user>:<password>@securelogin-forwl.mongodb.net/test?retryWrites=true";
// Passport Config
require('./config/passport')(passport);

//MongoDB
mongoose.connect(url, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.set('view engine', 'ejs');

// Body parser
app.use(express.urlencoded({ extended: true }));

// session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash());

// Global
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
