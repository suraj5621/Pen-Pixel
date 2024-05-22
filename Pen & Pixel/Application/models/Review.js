const mongoose = require('mongoose');

let reviewSchema = new mongoose.Schema({

    commentor:{
        type:String,
        trim:true,
    },
    comment:{
        type:String,
        trim:true,
        required:true
    }
},{timestamps:true})

const Review = mongoose.model('Review', reviewSchema);

module.exports= Review;