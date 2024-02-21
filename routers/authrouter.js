const router = require('express').Router();
let body=require('body-parser');
 body=body.urlencoded ({extended: true});
 const authcontroal=require("../contral/authcontroal");
 const homeControal= require('../contral/home.controal');
 const auth_gured= require('./gareds/auth.gured');

 require("../passpord");
 const passport = require('passport');
 const check  = require('express-validator').check;
 router.use(passport.initialize());
 router.use(passport.session());



router.get('/signup',auth_gured.notAuth,authcontroal.getsingin)

router.post('/signup',auth_gured.notAuth,body,
check("email").isEmail().withMessage("invalid Email"),
check("password").isLength({ min: 6, max: 20 }).withMessage("Password must be between 6 and 20 characters"),
authcontroal.author_create_account);

router.get('/login',auth_gured.notAuth,authcontroal.getlogin)

router.post('/login',auth_gured.notAuth,body,authcontroal.author_login_account);
 
// login form with google
router.get("/auth/google",auth_gured.notAuth,passport.authenticate('google',{scope:['email','profile']}))
router.get('/auth/google/callback',auth_gured.notAuth,passport.authenticate('google',{successRedirect:'/auth/google/success',failureRedirect:'/auth/google/failure'}));
router.get('/auth/google/success',auth_gured.notAuth,authcontroal.author_login_google)





//logout from website

router.all('/logout',auth_gured.isAuth,authcontroal.logout)

module.exports= router;