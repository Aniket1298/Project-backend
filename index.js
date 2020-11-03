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
const jwt = require('jsonwebtoken')
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var cors = require('cors')

app.use(cors())
var i=1;
app.use('/api/user',authRoute)

app.post('/test',jsonParser,(req,res) =>{
  
    res.status(200).send("Hello")
})
app.listen(4000,()=> console.log('Running on Port 3000'))
const token = "eyJhfbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmYTBlMDAzMjIxZmQ3MThlZjNjM2VjMyIsIm5hbWUiOiJ0ZW1wb3JhcnkiLCJlbWFpbCI6InRlbXBvcmFyeUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCQ0aEoyQ2VZZHZsUlVFenJ1Zmw1cDdlLjRPcUxmYjFZcHZYd2IvaDFwWTlycDZuM3FQUHdVaSIsImRhdGUiOiIyMDIwLTExLTAzVDA0OjQzOjQ3Ljc3NFoiLCJfX3YiOjB9LCJpYXQiOjE2MDQ0MTM1MDN9.8XWFTE6EAKU8EcrXLOMjdxbeTKfi6O2kUkwrd7psn0s"
