const express = require('express')
const app = express()
const mongoose= require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
dotenv.config()
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`connection to database established`)});
var bodyParser = require('body-parser')
    // create application/json parser
var jsonParser = bodyParser.json()
     
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var cors = require('cors')

app.use(cors())
var i=1;
app.use('/api/user',authRoute)

app.post('/test',jsonParser,(req,res) =>{
    console.log("IN TEST" + i)
    i+=1
    res.send("Hello")
})
app.listen(4000,()=> console.log('Running on Port 3000'))
