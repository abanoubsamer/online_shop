
const orderModel =require('../modeal/oreder.modeal')

exports.get_order=(req,res,next) =>{


    orderModel.getOrder(req.session.userId,(err,orders)=>{
        if(err) next(err);
        else
    {
        res.render('oreder',{orders:orders,
            image:req.session.passport?req.session.passport.user.picture:false,
            isUser: req.session.userId,
            isAdmin:req.session.isAdmin,
            pagetitale: "Orders"

        })
    }
       

    })
         
}




exports.get_form_oreder=(req,res,next) => {

orderModel.get_form_oreder(req.params.id,(err,prod)=>{
    if(err)  next(err);
    else{
     
        res.render('formoreder',{
            prod,
            productamount:req.params.amount,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            image:req.session.passport?req.session.passport.user.picture:false,
            pagetitale: "Form Order"
        });
    
    
    }
        
})

   
}



exports.post_form_oreder=(req,res,next) => {

    orderModel.add_form_oreder(req,res) .then(() =>{
    res.redirect('/oreder');
   }).catch(err =>{
    next(err);
   })

}