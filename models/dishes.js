const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const currency = mongoose.Types.Currency;

const commentSchema = new Schema({
  rating:{
    type: Number,
    min : 1,
    max : 5,
    required:true
  },
  comment:{
    type : String,
    required:true
  },
  author :{
    type:String,
    required:true
  },
},{timestamps:true

})

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    img : {
      type : String,
      required:true
    },
    categorey : {
      type : String,
      required:true
    },
    label : {
      type : String,
      default : ''
    },
    price : {
      type:currency,
      required:true,
      min:0
    },
    featured : {
      type : Boolean,
      default:false
    },
    comments : [commentSchema]
  },{
      timestamps:true

});

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;
