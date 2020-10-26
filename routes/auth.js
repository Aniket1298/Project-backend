const {loginvalidation,registerValidation} = require('../validation')
const router = require('express').Router()
const User=require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
 
router.get('/test',(req,res) =>{
    res.send("Tested")
})
var jsonParser = bodyParser.json()
console.log(User)
router.post('/register',jsonParser,async (req,res) => {
    console.log("HELLO")
    console.log(req.body)
    const {error} =registerValidation(req.body)
    console.log(error)
    if (error){return res.status(400).send(error.details[0].message)}
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password,salt)
    console.log(hashPassword)
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword
    })
    console.log(user)
    try{
        const user = await user.save()
        res.status(200).send(user)
    }
    catch(err){
        res.status(400).send(err)
    }
})
router.post('/login',async (req,res) => {
    const {error} =loginValidation(req.body)
    if (error){return res.status(400).send(error.details[0].message)}
    const salt = await bcrypy.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password,salt)
    const user = await User.findOne({email:req.body.email})
    if (!user) return res.send("Invalid Credentials")
    const validPassword = bcrypt.compare(req.body.password,user.password)
    const token = jwt.sign({_id:user._id},"dsfsdfs")
    res.header('auth-token',token).send(token)
})
router.post('/login')



module.exports=router