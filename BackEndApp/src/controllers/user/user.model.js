const mongoose = require('mongoose')
const loginSchema = new mongoose.Schema({
    username: {type:String,unique:true},
    password: {type:String}
  });
  var logindetails = mongoose.model("logintable", loginSchema);

  module.exports = logindetails