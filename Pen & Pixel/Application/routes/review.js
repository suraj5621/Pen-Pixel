const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Blog = require('../models/Blog');
const {validate_review , isLoggedin} = require('../middleware');

router.post('/blogs/:id/review' ,isLoggedin ,validate_review ,async(req,res) =>{
    try{
        let {id} = req.params;
        let commentor = req.user.username;
        // console.log(commentor);
        let {comment} = req.body;
        let review = new Review({commentor , comment});
        let blog = await Blog.findById(id);

        blog.reviews.push(review);
        await blog.save();
        await review.save();
        res.redirect(`/blogs/${id}`);

    }
    catch(e){
        res.render('blogs/error' ,{err :e.message});
    }


})


module.exports = router;