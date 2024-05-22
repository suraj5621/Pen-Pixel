const {blogschema} =  require('./Schema');
const {reviewschema} = require('./Schema');
const Blog =  require('./models/Blog')

const validate_blog = (req,res,next) =>{

    let {title , img , desc} = req.body;

    let {error} =blogschema.validate({title , img , desc});
    
    if(error){
        res.render('blogs/error');
    }
    else{
        next();
    }
}


const validate_review= (req,res,next) =>{
    let {comment} = req.body;
    let {error} =reviewschema.validate({comment});

    if(error){
        res.render('blogs/error');
    }
    else{
        next()
    }
}


const isLoggedin = (req,res,next) =>{
    if(!req.isAuthenticated()){
        res.redirect('/login');
    }
    else{
        next();
    }
}

const isEliteOrPremiumWriter = (req,res,next) =>{
    if (req.user.role === "elite_writer" || req.user.role === "premium_writer") {
        return next();
    } else {
        return res.render('blogs/error', { err: 'You are not authorized to add a new blog.' });
    }
}

const isElite = (req,res,next) =>{
    // console.log(req.user.role);
    if (req.user.role === "elite_reader") {
        return next();
    } else {
        return res.render('blogs/error', { err: 'You are not authorized to add a new blog.' });
    }
}

const isBlogAuthor = async(req,res,next)=>{
    let {id} = req.params; //product id
    let blog = await Blog.findById(id); //entire blog
    // console.log(typeof(blog.author));
    if(!blog.author.equals(req.user._id)){
        console.log('you have not access');
        return res.redirect('/blogs');
    }
    next();
}



module.exports = {validate_blog , validate_review , isLoggedin , isEliteOrPremiumWriter , isBlogAuthor , isElite};



