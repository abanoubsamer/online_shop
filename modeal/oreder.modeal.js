const mongoose = require('mongoose')


const url="mongodb+srv://kokowawa123456:kokowawa123456@atlascluster.wh98haj.mongodb.net/onlineshope?retryWrites=true&w=majority";

let schemaOreder= new mongoose.Schema({
    //user info
    userId:String,
    name: String,
    Country: String,
    phone : String,
    email:String,
    BuildingNumber:String,
    City:String,
    // products info
    productsId:String,
    image: String,
    productName:String,
    productPrice:Number,
    status:Number,
    productAmount:Number,
    orderDate:Number,
});

let Order= mongoose.model('order',schemaOreder);
let Card= mongoose.model('card');
let products=mongoose.model('shop');





exports.getOrder=(userId,callbak)=>{
    mongoose.connect(url).then(()=>{
        return Order.find({userId:userId})
    }).then((orders)=>{
        mongoose.disconnect();
       callbak(null,orders);
    }).catch((err)=>{
        mongoose.disconnect();
        callbak(err,null)
    });
}


 exports.get_form_oreder=(prodId,callbak)=>{
    mongoose.connect(url).then(()=>{
        return products.findById(prodId)
    }).then((prod)=>{
        mongoose.disconnect();
        callbak(null,prod);
    }).catch((err)=>{
        mongoose.disconnect();
        callbak(err,null)
    });
 }


exports.add_form_oreder=(req,res)=>{
return new Promise((resolve,reject)=>{
mongoose.connect(url).then(()=>{
    return products.findById(req.body.productId)
}).then((prod)=>{

  
    let Neworder = new Order(
        {
            //user info
             userId: req.session.userId,
             name: req.body.firstname+" "+req.body.lastname,
             City: req.body.City,
             Country: req.body.Country,
             email :req.body.email,
             phone: req.body.phone,
             BuildingNumber:req.body.BuildingNumber,
             // products info
             image: prod.image[0],
             productName:prod.name,
             productPrice:prod.price,
             productsId: req.body.productId,
             productAmount: req.body.productamount,
             status: 1,
             orderDate: Date.now(),
            }
       );
           return Neworder.save()  
    
}).then(()=>{
    mongoose.disconnect();
    resolve();
}).catch((err)=>{
    mongoose.disconnect();
    reject(err);
})
})
}



exports.getallorders=(callbak)=>{
    mongoose.connect(url).then(()=>{
        return Order.find()
    }).then((orders)=>{
        mongoose.disconnect();
       callbak(null,orders);
    }).catch((err)=>{
        mongoose.disconnect();
        callbak(err,null)
    });


}





exports.updateOrder=(newdata,callbak)=>{

    mongoose.connect(url).then(()=>{
        return Order.findByIdAndUpdate(newdata.productid,{
            email:newdata.email,
            phone:newdata.phone,
            status:newdata.status
        });
    }).then(()=>{
        mongoose.disconnect();
       callbak(null,true);
    }).catch((err)=>{
        mongoose.disconnect();
        callbak(err,null)
    });


}


exports.deleteData=(Id) => {

    return new Promise((resolve, reject) => {

        mongoose.connect(url)
        .then(() => {
            return Order.findByIdAndDelete(Id);
        })
        .then((cart) => {
            resolve();
            mongoose.disconnect();
        })
        .catch((err) => {
            mongoose.disconnect();
            reject(err);
        });

    })


}

exports.Order=Order;