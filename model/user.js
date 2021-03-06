const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        max:255,
        min:6,
    },
    password:{
        type:String,
        required:true,
        max:1024,
        min:6,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})
var User = mongoose.model('User', userSchema);
module.exports = User;