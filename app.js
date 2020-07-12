var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
var fileStore = require("session-file-store")(session);
var passport = require("passport");
var authenticate = require("./authenticate");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');

var app = express();

const mongoose =require("mongoose");
const Dishes=require("./models/dishes");
const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url,{ useNewUrlParser: true , useUnifiedTopology: true});

connect.then((db)=>{
  console.log("Connected correctly to server");
},(err)=>{console.log(err); });



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser("12345-67890-09876-54321"));
app.use(session({
  name: "session-id" ,
  secret : "12345-67890-09876-54321",
  saveUninitialized:false,
  resave:false,
  store:new fileStore()
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/users', usersRouter);
app.use('/', indexRouter);

//authorization
function auth(req,res,next){
  console.log(req.session);

if(!req.user){                            //req.user instead of req.session.user "this from passportlocal"
  var authHeader = req.headers.authorization;
    var err = new Error("You are not Authenticated!")
    err.status=403;
    return next(err);
  }else{
        next();
}
}

app.use(auth);


app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000);

module.exports = app;
