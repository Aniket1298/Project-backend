const config = require('config')
const jwt = require('jwt')

function auth(req,res,next){
    const token = req.header('x-auth-token')
    if (!token){res.status(401).send("Token Required")}
    try{
        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        res.user = decoded
        next()

    }
    catch(e){
        res.status(400).send("Invalid Token")
    }
}