
const express = require("express");
const bodyParser = require("body-parser");

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route("/")
.all(function(req,res,next){
  res.statusCode = 200 ;
  res.setHeader("Content-Type","text/html")
  next();
})
.get(function(req,res){
    res.end('Will send all the dishes to you!');
})
.post(function(req,res){
  res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);

})
.put(function(req,res){
  res.statusCode = 403 ;
  res.end('PUT operation not supported on /dishes');
})
.delete(function(req,res){
res.end("Deleting all dishes");
});

//dishId

dishRouter.route("/:dishId")
.get((req,res,next) => {
    res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});

dishRouter.route("/:dishId")

.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.dishId);
});
dishRouter.route("/:dishId")

.put((req, res, next) => {
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name +
        ' with details: ' + req.body.description);
});
dishRouter.route("/:dishId")

.delete((req, res, next) => {
    res.end('Deleting dish: ' + req.params.dishId);
});

module.exports=dishRouter;
