const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const seedDB = require('./seed');
const session = require('express-session');
const LocalStrategy =  require('passport-local')
const passport = require('passport');
const User = require('./models/User');
const cors = require('cors')



const blogRoutes = require('./routes/blogs');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');



mongoose.connect('mongodb://127.0.0.1:27017/Blogs_App')
.then(()=>{
    console.log("mongodb connected successfully");
})
.catch((err)=>{
    console.log("error");
})

app.use(cors());


let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly : true,
        expires : Date.now() + 7*24*60*60*1000,   // 7 din 24 ghante 60 min 60 sec 1000 milisec
        maxAge : 7*24*60*60*1000
    }
  };

app.engine('ejs' , ejsMate);
app.set('view engine' , "ejs");
app.set('views' , path.join(__dirname , 'views'));
app.use(express.static(path.join(__dirname , 'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json()); //json data
app.use(session(configSession))





// passport
app.use(passport.session())
app.use(passport.initialize());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));





app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
})


app.use(blogRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(profileRoutes);

// seedDB();


app.listen(8080 , ()=>{
    console.log("SERVER IS CONNECTED ON PORT 8080");
})