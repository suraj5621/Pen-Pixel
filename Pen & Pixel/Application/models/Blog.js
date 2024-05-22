const mongoose =  require('mongoose');

blog_Schema =  new mongoose.Schema({
    title:{
        type: String,
        trim :true,
        required :true
    },
    img:{
        type : String,
        trim : true,
        required :true
    },
    category:{
        type: String,
        trim :true,
        required :true
    },
    desc :{
        type: String,
        trim :true,
        required :true
    },
    lgdesc :{
        type: String,
        trim :true,
        required :true
    },
    views : {
        type : Number,
        default : 0,
        
    },
    likes : {
        type : Number,
        default : 0,
        
    },
    dislikes : {
        type : Number,
        default : 0,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    reviews :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Review'
        }
    ]

},{timestamps : true})

let Blog = mongoose.model('Blog' , blog_Schema);

module.exports = Blog;