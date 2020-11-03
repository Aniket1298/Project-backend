const { func } = require('@hapi/joi')
const Joi = require('joi')

function registerValidation(data){
    const schema = Joi.object({
        name:Joi.string().min(4).required(),
        email:Joi.string().required().email(),
        password:Joi.string().required().min(8)
    })
    return  schema.validate(data)
}

function loginValidation(data){
    const schema = Joi.object({
        email:Joi.string().required().email(),
        password:Joi.string().required().min(8)
    })
    return  schema.validate(data)
}
module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
