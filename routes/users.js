var express = require('express');
const bodyParser = require("body-parser");
var User = require("../models/user");
var router = express.Router();
var passport = require("passport");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.use(bodyParser.json());

router.post("/signup",(req,res,next)=>{                    //passportLocalMongoose plugin supplies useful metrics for us
  User.register(new User({username: req.body.username})    //to use in sing up and login process =>method call "Register"and"login" instead of ex:find
    ,req.body.password,(err,user)=>{                       //  register(new User{},password)      //delete .then((user))and exhange by (err,user)
    if(err){
      res.statusCode=500;
      res.setHeader("Content-Type","application/json")
      res.json({err:err });
    }
    else {
      passport.authenticate("local")(req,res,()=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json")
        res.json({status:"Registeration Successful!", user : user });

      });
    }
  });
});

router.post("/login",passport.authenticate("local"),(req,res)=>{
  res.statusCode=200;
  res.setHeader("Content-Type","application/json")
  res.json({success: true, status: 'You are successfully logged in!'});
});


module.exports = router;
