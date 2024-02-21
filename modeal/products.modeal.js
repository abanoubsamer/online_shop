const mongoose = require('mongoose');
const url="mongodb+srv://kokowawa123456:kokowawa123456@atlascluster.wh98haj.mongodb.net/onlineshope?retryWrites=true&w=majority";


let schemaproducts=mongoose.Schema({
    name: String,
    category: String,
    price : Number,
    stock: Number,
    image: Array,
    discrption:String,


});
let products=mongoose.model('shop',schemaproducts);

exports.getallproducts=(callback)=>{

    mongoose.connect(url)
    .then(()=>{
       
       return  products.find()
    })
    .then((products)=>{
      
        mongoose.disconnect();
        callback(null,products);
    })
    .catch(err => {
        callback(err,null);
    }).finally(()=>{ mongoose.disconnect();});


}

exports.filterproducts=(process,filter,callback)=>{

    mongoose.connect(url)
    .then(()=>{
        switch(process)
        {
            case"filter":
            return  products.find({category:filter});
            break;
            case"getid":
            return products.findById(filter);
            break;
        }
        
      
    })
    .then((products)=>{
        mongoose.disconnect();
        callback(null,products);
    })
    .catch(err => {
        callback(err,null);
    });

}


//add new products

exports.addnewproducts=(data)=>{
return new Promise((resolve,reject)=>{
    mongoose.connect(url)
    .then(()=>{
        let newproducts= new products(data);
        return newproducts.save();
    })
    .then(()=>{
        mongoose.disconnect();
        resolve();
    })
    .catch(err=>{
        mongoose.disconnect();
        rejected(err)
    })
});
}
