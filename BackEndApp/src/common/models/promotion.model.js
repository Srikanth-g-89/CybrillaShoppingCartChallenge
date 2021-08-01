const mongoose = require('mongoose')
const PromotionSchema = new mongoose.Schema({
    PromotionalId: {type:Number,unique: true},
    onItem :{type:Object},
    OneToOne:{type:String},
    OneToMany:{type:String},
    OneToOneCount:{type:Number},
    OneToManyCount:{type:Object},
    OneToManyCartValue:{type:Number},
    OneToOneValue:{type:Number},
  });
  var Promodetails = mongoose.model("Promotional", PromotionSchema);
  
  module.exports = Promodetails