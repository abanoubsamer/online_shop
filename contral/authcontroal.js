
const authortyModel = require('../modeal/authorty.modeal');
const homeControal= require('../contral/home.controal');
const { validationResult } = require('express-validator');


///////////////////////////////////(get singin page)\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

exports.getsingin = (req, res, next) => {
    // Retrieve flashed messages for creat_error and value_vali
    const create_error = req.flash('creat_error')[0];
    const validationResults = req.flash('value_vali');

    // Render the signup template, passing data to it
    res.render('signup', {
        // Pass create_error to the template
        create_error: create_error,
        isUser :req.session.userId, image:req.session.passport?req.session.passport.user.picture:false,
        isAdmin:false,
        // Pass validationResult to the template
        validationResults: validationResults,
        pagetitale: "SignUp"
    });
}


///////////////////////////////////(create account from website)\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
exports.author_create_account = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        authortyModel.create_account(req, res)
            .then(() => {
                res.redirect('/login');
            })
            .catch(err => {
                req.flash('creat_error', err);
                res.redirect('/signup');
            });
    } else {
        req.flash("value_vali",errors.array()[0].msg);
        
        res.redirect('/signup');
    }
}


///////////////////////////////////(get login page)\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

exports.getlogin = (req, res, next) => {
    const authError = req.flash('authError')[0]; // Retrieve the value of authError

    res.render('login', { authError ,isUser :req.session.userId, image:req.session.passport?req.session.passport.user.picture:false,isAdmin:false,pagetitale: "Login"}); // Pass authError to the template
}


///////////////////////////////////(login from website)\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


exports.author_login_account = (req, res, next) => {
    authortyModel.login_account(req.body.email, req.body.password)
        .then((result) => {
            req.session.userId = result.id;
            req.session.isAdmin=  result.isAdmin;
            req.session.name =     result.name;
            res.redirect('/');
        })
        .catch(err => {
            // Flash the error message
            req.flash('authError', err);
             
            // Redirect to login page
            res.redirect('/login'); // Add return statement here
        });
}


///////////////////////////////////(login from google)\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

exports.author_login_google = (req, res,next) => {
    // Check if the name properties are present in req.user
    const fullName = req.user.name ? `${req.user.name.givenName} ${req.user.name.familyName}` : 'Unknown User';
    const email = req.user.email;
    const picture = req.user.picture;

    authortyModel.login_account_google(email, fullName, picture)
        .then((id) => {   
          
            req.session.userId = id;
            req.flash('picture', picture);
           
            res.redirect("/");

        })
        .catch(err => {
            res.redirect('/login');
        })

    
};


///////////////////////////////////(logout from website)\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

exports.logout=(req,res,next)=>{
req.session.destroy(()=>{
    res.redirect('/');
})

}