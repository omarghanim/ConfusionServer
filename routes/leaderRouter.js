
const express = require("express");
const bodyParser = require("body-parser");
const Leaders = require("../models/leaders");
const leaderRouter = express.Router();
var authenticate = require('../authenticate');
leaderRouter.use(bodyParser.json());


leaderRouter.route("/")
.get(function(req,res,next){
  Leaders.find({})
  .then((leads)=>{
      res.statusCode=200;
      res.setHeader("Content-Type","application/json")
      res.json(leads);
  },(err)=>next(err))
  .catch((err)=>next(err));
})
.post(authenticate.verifyUser,function(req,res,next){
Leaders.create(req.body)
.then((lead)=>{
    console.log(" Leader Created", lead);
    res.statusCode=200;
    res.setHeader("Content-Type","application/json")
    res.json(lead);
},(err)=>next(err))
.catch((err)=>next(err));
})

.put(authenticate.verifyUser,function(req,res,next){
  res.statusCode = 403 ;
  res.end('PUT operation not supported on /leaders');
})
.delete(authenticate.verifyUser,function(req,res,next){
  Leaders.remove({})
  .then((resp)=>{
    res.statusCode=200;
    res.setHeader("Content-Type","application/json")
    res.json(resp)
  },(err)=>next(err))
  .catch((err)=>next(err));
});

//leadId

leaderRouter.route("/:leadId")
.get((req,res,next) => {
  Leaders.findById(req.params.leadId)
  .then((lead)=>{
    res.statusCode=200;
    res.setHeader("Content-Type","application/json");
    res.json(lead);
  },(err)=>next(err))
  .catch((err)=>next(err));
})



.post(authenticate.verifyUser,(req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /leaders/'+ req.params.leadId)
})

.put(authenticate.verifyUser,(req, res, next) => {
  Leaders.findByIdAndUpdate(req.params.leadId, {$set : req.body},{new:true})
  .then((lead)=>{
    res.statusCode=200;
    res.setHeader("Content-Type","application/json")
    res.json(lead)
  },(err)=>next(err))
  .catch((err)=>next(err));
})

.delete(authenticate.verifyUser,(req, res, next) => {
  Leaders.findByIdAndRemove(req.params.leadId)
  .then((respo)=>{
    res.statusCode=200;
    res.setHeader("Content-Type","application/json")
    res.json(respo)
  },(err)=>next(err))
  .catch((err)=>next(err));
});

module.exports=leaderRouter;
