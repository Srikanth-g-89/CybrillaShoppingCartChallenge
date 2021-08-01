const express = require('express')
const Approuter = require('./router') 
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyparser = require("body-parser");
const app = express();
const PORT = 8000;
const cors = require('cors')

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions))
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json());

app.use('/',Approuter)
app.get('/', (req , res) => res.send('Express + TypeScript Server'));
const start = async (PORT) => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ECommerceApp', {useNewUrlParser: true,useUnifiedTopology: true });
    console.log ('MongoDb compass connection successful')
    app.listen(PORT)
    console.log (`[Server]:Running on localhost on port -${PORT}`)
  } catch (err) {
    console.error(err)
  }  
} 

start(PORT)