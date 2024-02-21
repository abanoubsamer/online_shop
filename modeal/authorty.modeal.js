
const mongoose = require('mongoose');


//t4fer ael password
const bcrypt=require('bcrypt');

const url="mongodb+srv://kokowawa123456:kokowawa123456@atlascluster.wh98haj.mongodb.net/onlineshope?retryWrites=true&w=majority";

//create a new user account
let schemuser=mongoose.Schema({
    email: String,
    name: String,
    phone: String,
    password: String,
    address: String,
    discrptionAddress2:String,
    City: String,
    image: String,
    isAdmin:{
        type: Boolean,
        default: false,
    }
});

// call the doucoment in database
let User=mongoose.model('user',schemuser);

//
///////////////////////////////////(create a new user account)\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

exports.create_account = (req, res) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
        .then(() => {
            return User.findOne({ email: req.body.email });
        })
        .then((existingUser) => {
            if (existingUser) {
           
                reject("User already exists");
            } else {
                return bcrypt.hash(req.body.password, 10);
            }
        })
        .then((hashedPassword) => {
            let newUser = new User({
                email: req.body.email,
                password: hashedPassword,
                name:req.body.firstname+" "+req.body.lastname,
                address: req.body.Address,
                descriptionAddress2: req.body.Address2,
                city: req.body.City,
            });
            return newUser.save();
        })
        .then(() => {
      
           resolve("Successfully saved new user");
        })
        .catch((err) => {
       
            res.status(500).send("Internal Server Error");
        })
        .finally(() => {
            mongoose.disconnect();
        });    
    })
    
}

/// login user
///////////////////////////////////(login user form website)\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

exports.login_account = (email,password)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(url)
        .then(()=>{
            return User.findOne({email:email})
        }) .then((user)=>{
            if (!user) {
                // User not found
               
                reject("User not found")
               
            }else
        if(user.password)
        {
            bcrypt.compare(password,user.password) 
            .then((valid_email)=>{
            if(!valid_email)
            {
              
                reject("password is incorrect");
            }
            else{
               
                resolve({    
                    id:user._id,
                    isAdmin:user.isAdmin,
                    name:user.name,
                }); 
            }
        })
        }
        else
        {
            reject("this email login in google"); 
        }
              
        })
      
        .catch((err)=>{
           
            console.log(err);
            res.status(500).send("Internal Server Error");
        })
        .finally(()=>{
            mongoose.disconnect();
        })
       
    })
}




////////////////////////////////////(login user with google credentials)\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ 

exports.login_account_google = (email, name, image) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
            .then(() => {
                // Find the user in the database by email
                return User.findOne({ email: email });
            })
            .then((existingUser) => {
                if (existingUser) {
                    mongoose.disconnect();
                    resolve(existingUser.id);
                } else {
                    // Create a new user object
                    let newUser = new User({
                        email: email,
                        name: name,
                        image: image,
                    });
                    // Save the new user to the database
                    return newUser.save();
                }
            })
            .then(() => {
                mongoose.disconnect();
                resolve("Successfully saved new user");
            })
            .catch((err) => {
                mongoose.disconnect();
                reject(err); // Reject the Promise with an error message
            }).finally(() => {
                mongoose.disconnect();
            });
    });
}

 

