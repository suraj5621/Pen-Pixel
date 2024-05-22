const express = require('express');
const router =  express.Router();
const Blog = require('../models/Blog');
const Review = require('../models/Review');
const User = require('../models/User')
const {validate_blog , validate_review , isLoggedin , isEliteOrPremiumWriter, isBlogAuthor , isElite} = require('../middleware')

//  to show all items
router.get('/blogs' , async(req,res) =>{
    try{
        let {category} = req.query;
        if( category == "All" || category == undefined){
            let items = await Blog.find({});
            res.render('blogs/index' , {items});
        }
        else{
            let items = await Blog.find({category : category});
            res.render('blogs/index' ,{items});
        }
        // res.status(200).json(items);
    }
    catch(e){
        res.render('blogs/error' ,{err :e.message});
    }

})


// to render new page for add items
router.get('/blogs/new' ,isLoggedin, isEliteOrPremiumWriter , (req,res)=>{
    try{
        res.render('blogs/new');
    }
    catch(e){
        res.render('blogs/error' ,{err :e.message});
    }    
})

// to actually add blogs in database
router.post('/blogs/new' ,isLoggedin, isEliteOrPremiumWriter , async(req,res)=>{
    try{
        let {title , img ,category, desc, lgdesc} = req.body;

        let count = req.user.post_count + 1;
        if(req.user.role == 'elite_writer' ){
            if (count < 3){
                await User.findByIdAndUpdate(req.user._id , {post_count : count});
                let author = req.user._id;
                await Blog.create({title , img ,category, desc, lgdesc,author});
                res.redirect('/blogs');
            }
            else{
                console.log('you have reached the limit');
                res.redirect('/blogs');
            }     
        }
        else{
            await User.findByIdAndUpdate(req.user._id , {post_count : count});
            let author = req.user._id;
            await Blog.create({title , img ,category, desc, lgdesc, author});
            res.redirect('/blogs');
        }
        
      
        // res.status(200).json("haa bhai");
        
    }
    catch(e){
        res.render('blogs/error' ,{err :e.message});
    }
})


// to show perticular product isLoggedin
router.get('/blogs/:id', isLoggedin, async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id).populate('reviews');
        
        // Check the role of the logged-in user
        const userRole = req.user.role; // Assuming user role is stored in req.user.role
        // console.log(userRole);

        let user = await User.findById(blog.author);
        const authorRole = user.role;
        const authorName = user.username;
        let category = blog.category;
        let relatedBlogs  =   await Blog.find({category : category});
        // console.log(user);
        
        // If the user is an elite reader and the blog author is a premium writer, add a delay
        if (userRole == 'elite_reader' && authorRole == 'premium_writer') {

            res.render('blogs/elite_show', { blog , authorName , relatedBlogs });

        } else {
            res.render('blogs/show', { blog , authorName , relatedBlogs });
        }
    } catch (e) {
        res.render('blogs/error', { err: e.message });
    }
});



//  for edit render edit page
router.get('/blogs/:id/edit' , isLoggedin , isEliteOrPremiumWriter, isBlogAuthor , async(req,res)=>{
    try {
        let{id} = req.params;
        let blog = await Blog.findById(id);
        res.render('blogs/edit' , {blog});
    }
    catch(e){
        res.render('blogs/error' ,{err :e.message});
    }

})

// to actually edited product
router.post('/blogs/:id/edit' , isLoggedin , isEliteOrPremiumWriter, isBlogAuthor , validate_blog ,async (req,res)=>{
    try{
        let {id} = req.params;
        let {title , img ,category, desc, lgdesc} = req.body;
        await Blog.findByIdAndUpdate(id , {title , img , category, desc , lgdesc});
        res.redirect(`/blogs/${id}`);
    }
    catch(e){
        res.render('blogs/error' ,{err :e.message});
    }

})


router.post('/blogs/:id/delete' , isLoggedin , isEliteOrPremiumWriter, isBlogAuthor  ,async(req,res)=>{
    try {  
        let {id} = req.params;
        let blog = await Blog.findById(id);

      
        // Update the post_count
        await User.findByIdAndUpdate(blog.author, { $inc: { post_count: -1 } });
 
        // delete review
        for( let review of blog.reviews){
            await Review.findByIdAndDelete(review);
        }
        await Blog.findByIdAndDelete(id);
        res.redirect('/blogs');

    }
    catch(e){
        res.render('blogs/error' ,{err :e.message});
    }

})




router.get('/payment' , isLoggedin , isElite  ,async(req,res)=>{
    res.render('blogs/payment');

})

router.post('/payment' , isLoggedin , isElite  ,async(req,res)=>{
    let id = req.user._id;
    await User.findByIdAndUpdate(id , {role : 'premium_reader'});
    res.redirect('/blogs');
})



module.exports = router;