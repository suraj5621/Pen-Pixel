const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
    
    email:{
        type:String,
        required :true
    },
    role :{
        type:String,
        required :true
    },
    post_count :{
        type:Number,
        
    }
    
})


userSchema.plugin(passportLocalMongoose);



let User = mongoose.model('User' , userSchema);
module.exports = User;
