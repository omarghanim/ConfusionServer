
const express = require("express");
const bodyParser = require("body-parser");
const Promotions = require("../models/promotions");
const cors = require("./cors");
const promoRouter = express.Router();
var authenticate = require('../authenticate');
promoRouter.use(bodyParser.json());

promoRouter.route("/")
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,function(req,res,next){
  Promotions.find({})
  .then((promo)=>{
      res.statusCode=200;
      res.setHeader("Content-Type","application/json")
      res.json(promo);
  },(err)=>next(err))
  .catch((err)=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,function(req,res,next){
Promotions.create(req.body)
.then((promo)=>{
    console.log(" Promotion Created", promo);
    res.statusCode=200;
    res.setHeader("Content-Type","application/json")
    res.json(promo);
},(err)=>next(err))
.catch((err)=>next(err));
})

.put(cors.corsWithOptions,authenticate.verifyUser,function(req,res,next){
  res.statusCode = 403 ;
  res.end('PUT operation not supported on /promotions');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,function(req,res,next){
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
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,authenticate.verifyUser,(req,res,next) => {
  Promotions.findById(req.params.promoId)
  .then((promo)=>{
    res.statusCode=200;
    res.setHeader("Content-Type","application/json");
    res.json(promo);
  },(err)=>next(err))
  .catch((err)=>next(err));
})

.post(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /promotions/'+ req.params.promoId)
})

.put(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
  Promotions.findByIdAndUpdate(req.params.promoId, {$set : req.body},{new:true})
  .then((dish)=>{
    res.statusCode=200;
    res.setHeader("Content-Type","application/json")
    res.json(promo)
  },(err)=>next(err))
  .catch((err)=>next(err));
})

.delete(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
  Promotions.findByIdAndRemove(req.params.promoId)
  .then((respo)=>{
    res.statusCode=200;
    res.setHeader("Content-Type","application/json")
    res.json(respo)
  },(err)=>next(err))
  .catch((err)=>next(err));
});


module.exports=promoRouter;
