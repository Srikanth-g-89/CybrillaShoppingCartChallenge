const express = require('express')
const router = express.Router();
const UserRouter = require('./controllers/user/user.router')
const ItemRouter = require('./controllers/item/item.router')
router.use('/users',UserRouter) 
router.use('/item',ItemRouter)

module.exports = router
