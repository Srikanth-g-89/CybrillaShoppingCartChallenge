const express = require('express'); 
const itemrouter = express.Router();
const taskData = require('./item.controller')

itemrouter.post('/AddNew',taskData.SaveNewItem)
itemrouter.post('/list',taskData.GetItemList)
itemrouter.post('/delete',taskData.DeleteTask)
itemrouter.post('/checkout',taskData.CheckOut)
itemrouter.post('/createPromotion',taskData.createPromotion)

module.exports =  itemrouter