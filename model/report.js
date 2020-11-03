const mongoose = require('mongoose');

var reportSchema = new mongoose.Schema({ 
    name: {type:String,required:true},
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    doc: 
    { 
        data: Buffer, 
        contentType: String 
    } 
}); 
var Report = mongoose.model('User', userSchema);
module.exports = Report;