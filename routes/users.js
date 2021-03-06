var express = require('express');
const bodyParser = require("body-parser");
var User = require("../models/user");
var router = express.Router();
var passport = require("passport");
const cors = require("./cors");

var authenticate = require('../authenticate');

/* GET users listing. */
router.get('/',cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
	User.find({})
		.then((users) => {
			res.statusCode = 200
			res.setHeader('Content-Type', 'application/json')
			res.json(users)
		})
		.catch(err => next(err))
})

router.use(bodyParser.json());

router.post("/signup",cors.corsWithOptions,(req,res,next)=>{                    //passportLocalMongoose plugin supplies useful metrics for us
  User.register(new User({username: req.body.username})    //to use in sing up and login process =>method call "Register"and"login" instead of ex:find
    ,req.body.password,(err,user)=>{                       //  register(new User{},password)      //delete .then((user))and exhange by (err,user)
    if(err){
      res.statusCode=500;
      res.setHeader("Content-Type","application/json")
      res.json({err:err });
    }
    else {
        if(req.body.firstname)
            user.firstname = req.body.firstname;
        if(req.body.lastname)
            user.lastname = req.body.lastname;
            user.save((err,user)=>{
              if(err){
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({err: err});
                return ;
              }
                passport.authenticate("local")(req,res,()=>{
                res.statusCode=200;
                res.setHeader("Content-Type","application/json")
                res.json({status:"Registeration Successful!", user : user });
            })
      });
    }
  });
});

router.post("/login",cors.corsWithOptions,passport.authenticate("local"),(req,res)=>{
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode=200;
  res.setHeader("Content-Type","application/json")
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
});


router.get('/logout',cors.corsWithOptions, (req, res) => {
	if (req.session) {
		req.session.destroy();
		res.clearCookie('session-id');
		res.redirect('/');
	} else {
		var err = new Error('You are not logged in!');
		err.status = 403;
		next(err);
	}
});

router.delete('/', cors.corsWithOptions,(req, res, next) => {
	User.remove({})
		.then(
			(resp) => {
				res.statusCode = 200;
				res.setHeader('Content-type', 'application/json');
				res.json(resp);
			},
			(err) => next(err)
		)
		.catch((err) => next(err));
});

router.get("/facebook/token",passport.authenticate("facebook-token"),(req,res)=>{
	if(req.user){
		var token = authenticate.getToken({_id: req.user._id});
		res.statusCode=200;
		res.setHeader("Content-Type","application/json")
		res.json({success: true, token: token, status: 'You are successfully logged in!'});
	}
});
module.exports = router;
