
const express = require("express");
const bodyParser = require("body-parser");
const Promotions = require("../models/promotions");
const promoRouter = express.Router();
var authenticate = require('../authenticate');
promoRouter.use(bodyParser.json());

promoRouter.route("/")
.get(function(req,res,next){
  Promotions.find({})
  .then((promo)=>{
      res.statusCode=200;
      res.setHeader("Content-Type","application/json")
      res.json(promo);
  },(err)=>next(err))
  .catch((err)=>next(err));
})
.post(authenticate.verifyUser,function(req,res,next){
Promotions.create(req.body)
.then((promo)=>{
    console.log(" Promotion Created", promo);
    res.statusCode=200;
    res.setHeader("Content-Type","application/json")
    res.json(promo);
},(err)=>next(err))
.catch((err)=>next(err));
})

.put(authenticate.verifyUser,function(req,res,next){
  res.statusCode = 403 ;
  res.end('PUT operation not supported on /promotions');
})
.delete(authenticate.verifyUser,function(req,res,next){
  Promotions.remove({})
  .then((resp)=>{
    res.statusCode=200;
    res.setHeader("Content-Type","application/json")
    res.json(resp)
  },(err)=>next(err))
  .catch((err)=>next(err));
});

//promoId

promoRouter.route("/:promoId")
.get(authenticate.verifyUser,(req,res,next) => {
  Promotions.findById(req.params.promoId)
  .then((promo)=>{
    res.statusCode=200;
    res.setHeader("Content-Type","application/json");
    res.json(promo);
  },(err)=>next(err))
  .catch((err)=>next(err));
})

.post(authenticate.verifyUser,(req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /promotions/'+ req.params.promoId)
})

.put(authenticate.verifyUser,(req, res, next) => {
  Promotions.findByIdAndUpdate(req.params.promoId, {$set : req.body},{new:true})
  .then((dish)=>{
    res.statusCode=200;
    res.setHeader("Content-Type","application/json")
    res.json(promo)
  },(err)=>next(err))
  .catch((err)=>next(err));
})

.delete(authenticate.verifyUser,(req, res, next) => {
  Promotions.findByIdAndRemove(req.params.promoId)
  .then((respo)=>{
    res.statusCode=200;
    res.setHeader("Content-Type","application/json")
    res.json(respo)
  },(err)=>next(err))
  .catch((err)=>next(err));
});


module.exports=promoRouter;
