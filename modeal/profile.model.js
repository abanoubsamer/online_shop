
const mongoose = require('mongoose');


//t4fer ael password
const bcrypt=require('bcrypt');

const url="mongodb+srv://kokowawa123456:kokowawa123456@atlascluster.wh98haj.mongodb.net/onlineshope?retryWrites=true&w=majority";

let User=mongoose.model('user');
let Card=mongoose.model("card");
let Order=require('./oreder.modeal').Order

exports.getProfile = (userId, callback) => {
    // Connect to the MongoDB database
    mongoose.connect(url)
        .then(() => {
            // Find the user by ID
            return User.findById(userId);
        })
        .then((user) => {
            // Find cards associated with the user
            Card.find({ userId: userId }).then((cards) => {
                // Find orders associated with the user
                Order.find({ userId: userId }).then((orders) => {
                    // Call the callback function with the results
                    callback(null, user, cards.length, orders.length);
                    // Disconnect from the MongoDB database
                    mongoose.disconnect();
                });
            });
        })
        .catch((err) => {
            // If any errors occur, call the callback function with the error
            callback(err, null, null);
            // Disconnect from the MongoDB database
            mongoose.disconnect();
        });
};

/*return new Promise((resolve, reject)=>{
    mongoose.connect(url)
    .then(()=>{
        return User.findById(userId)
    })
    .then((user)=>{
    Card.findById(userId).then((card)=>{
            resolve(user,card);
            mongoose.disconnect();
        })
        
    })
    .catch((err)=>{
        
        reject(err);
        mongoose.disconnect();
    })
    

})
} */