
const express = require("express");
const bodyParser = require("body-parser");

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route("/")
.all(function(req,res,next){
  res.statusCode = 200 ;
  res.setHeader("Content-Type","text/html")
  next();
})
.get(function(req,res){
    res.end('Will send all the promotions to you!');
})
.post(function(req,res){
  res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);

})
.put(function(req,res){
  res.statusCode = 403 ;
  res.end('PUT operation not supported on /promotions');
})
.delete(function(req,res){
res.end("Deleting all promotions");
});

//promoId

promoRouter.route("/:promoId")
.get((req,res,next) => {
    res.end('Will send details of the promotion: ' + req.params.promoId +' to you!');
})

.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /promotions/'+ req.params.promoId);
})

.put((req, res, next) => {
  res.write('Updating the promotion:' + req.params.promoId + '\n');
  res.end('Will update the promotion: ' + req.body.name +
        ' with details: ' + req.body.description);
})

.delete((req, res, next) => {
    res.end('Deleting promotion: ' + req.params.promoId);
});

module.exports=promoRouter;
