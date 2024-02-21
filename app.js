const express=require('express');
const app = express();
const path = require('path');
const session = require('express-session');
require("dotenv").config();
const passport = require('passport');
require("./passpord");
const productRouter=require('./routers/product.router');
const authRouter=require('./routers/authrouter');
const SessionStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const port = process.env.PORT||3000;
const homeRouter=require('./routers/home.router');
const cardRouter=require('./routers/card.router');
const profileRouter=require('./routers/profile.router');
const orederRouter=require('./routers/oreder.router')
const amdinRouter=require('./routers/admin.router');

app.set('view engine', 'ejs'); // Set your view engine
app.set('views', path.join(__dirname, 'views'));



app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));
app.use(flash());





const Store= new SessionStore({
    uri:"mongodb+srv://kokowawa123456:kokowawa123456@atlascluster.wh98haj.mongodb.net/onlineshope?retryWrites=true&w=majority",
    collection:"session"
}); 
app.use(session({
    secret:"this my seecret to increbt to session storage.....",
    resave: false,
    saveUninitialized:false,
    secret:process.env.SESSION_SECRET,
    cookie:{secure:false},

    // cookie:{
    //     //hya btt7sb by ale millis 
    //     //millis seconds to store
    //     maxAge :1*60*60*1000
       
    // }
 store:Store

}))


app.use('/',homeRouter);
app.use(productRouter);
app.use('/',authRouter);
app.use("/login",authRouter);
app.use('/auth/google',authRouter);
app.use('/card',cardRouter);
app.use('/profile',profileRouter);
app.use('/oreder',orederRouter)
app.use('/admin',amdinRouter);


app.get('/not-admin',(req,res,next)=>{
     res.status(403);
    res.render('not-admin.ejs')
})

app.get('/404',(req,res,next)=>{
    
    res.redirect('/404')
})


app.use((req,res,next)=>{
    res.status(500)
    res.render('404.ejs',{ pagetitale: "Page Not Found" })
})



app.listen(port,(err) => {
    if(err)
    console.log(err);
    else
    console.log("listening on port:",port)
});