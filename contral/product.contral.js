
const productsMoudal=require('../modeal/products.modeal')


exports.getproduct=(req,res,next)=>
{
 
    // get id
    
    //get product
    productsMoudal.filterproducts("getid",req.params.id,(err,product)=>{
        if(err)  next(err);
        else
         {
            // render product
             res.render('product',{
                product:product,
                isUser: req.session.userId ,
                isAdmin:req.session.isAdmin,
                image:req.session.passport?req.session.passport.user.picture:false,
                pagetitale: "Product",
                cardError: req.flash("cardError")[0],
            });
        }
        
    })


}