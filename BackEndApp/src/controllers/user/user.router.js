const express = require('express'); 
const userrouter = express.Router();
const UserData = require('./user.controller') 

userrouter.post('/login',UserData.getUser)
userrouter.post('/SignUpUser',UserData.SignUpUser)

module.exports =  userrouter