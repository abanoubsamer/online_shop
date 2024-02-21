
const productModel = require("../modeal/products.modeal")
const orderModel = require("../modeal/oreder.modeal")
exports.getadd=(req,res,next) => {
res.render('add-product',{
    image:req.session.passport?req.session.passport.user.picture:false,
    isUser:true,
    isAdmin:true,
    pagetitale: "Add Product"
})
};

exports.postadd=(req,res,next) => {
    const imageArray = req.files.map(file => file.filename);
    productModel.addnewproducts({
      name:req.body.name,
      category:req.body.category,
      price:req.body.price,
      stock:req.body.stock,
      image: imageArray,
      discrption:req.body.discrption,
    }).then(() => {
      res.redirect('/admin/add?addedToProduct=true')
    }).catch(err => {
      next(err)
    })
}



exports.getMproducts = (req, res,nex) => {

orderModel.getallorders((err,orders)=>{

  if(err) next(err)
  else{
    res.render('m-orders',{
      image:req.session.passport?req.session.passport.user.picture:false,
      isUser:true,
      isAdmin:true,
      name:req.session.name,
      orders:orders,
      pagetitale: "Manage Product"
  });
}
    
  
})

}

exports.updateData=(req, res, next)=>{
  orderModel.updateOrder(JSON.parse(req.body.newdata),(err,result)=>{
    if(err)  next(err)
    else{
      res.redirect('/admin/manage')
    }
  })
}

exports.deleteData=(req, res, next)=>{
  orderModel.deleteData(req.params.id).then(()=>{res.redirect('/admin/manage')}).catch((err)=>{ next(err);})
  
}