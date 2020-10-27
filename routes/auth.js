const {loginValidation,registerValidation} = require('../validation')
const router = require('express').Router()
const User=require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
//console.log(User )
//console.log(User.create({"name":"asdfadfa","email":'sadfd@sdfad.com',"password":"sfsdfds"}))
router.get('/test',(req,res) =>{
    res.send("Tested")
})
var jsonParser = bodyParser.json()
console.log(User)
router.post('/register',jsonParser,async (req,res) => {
    console.log("HELLO")
    console.log(req.body)
    const {error} =registerValidation(req.body)
    if (error){
        console.log(error.details[0].message)
        return res.status(400).send(error.details[0].message)}
    const user = await User.findOne({email:req.body.email})
    if (user){return res.status(400).send("Email Id Already Registered")}
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password,salt)
    User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword
    })
    res.status(200).send("Created")
})
router.post('/details',jsonParser,async (req,res) =>{
    res.send(User.findOne({_id:req.id}))
})
router.post('/login',jsonParser,async (req,res) => {
    console.log(req.body)
    const {error} =loginValidation(req.body)
    console.log(error)
    if (error){return res.status(400    ).send("Invalid Credentials")}
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password,salt)
    const user = await User.findOne({email:req.body.email})
    if (!user) return res.send("Invalid Credentials")
    const validPassword = bcrypt.compare(req.body.password,user.password)
    const token = jwt.sign({_id:user._id},process.env.SECRET_KEY)
    res.cookie('token', token, { httpOnly: true });
    res.user=jwt.verify(token,process.env.SECRET_KEY)
    return res.status(200).send({'token':token})
    //res.header('auth-token',token).send({"Token":token})
})
module.exports=router