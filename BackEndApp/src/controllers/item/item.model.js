const mongoose = require('mongoose')
const ItemSchema = new mongoose.Schema({
    itemId: {type:String,unique: true},
    itemPrice :{type:Number},
    promotionalIds:{type:Array}
  });
  var Itemdetails = mongoose.model("Item", ItemSchema);
  
  module.exports = Itemdetails