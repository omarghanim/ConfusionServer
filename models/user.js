var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

//we remove username and password objects because theses would be automatically added in
// by the passport-local-mongoose plugin here
//and to use it in our schema user.plugin(...) and it hashed the password and salt and add additional methods in schema
var userSchema = new Schema({
  firstname : {
    type:String,
    default : ''
  },
  lastname : {
    type:String,
    default : ''
  },
  facebookId :String ,
  admin:{
    type:Boolean,
    default:false
  }
});

userSchema.plugin(passportLocalMongoose);

module.exports= mongoose.model("User",userSchema);
