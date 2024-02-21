const card_moder=require('../modeal/card.modeal');
const validationResult = require("express-validator").validationResult;




exports.get_cart = (req, res, next) => {

    card_moder.get_cart(req.session.userId,(err,card) => {
        if (err) {
            next(err);
        } else {
            res.render('list', {
                 card: card ,
                 isUser: req.session.userId,
                 isAdmin:req.session.isAdmin,
                 image:req.session.passport?req.session.passport.user.picture:false,
                 pagetitale: "Cart"
                });
        }
    });
};

exports.add_Card=(req,res,nex)=>{
  
    if(validationResult(req).isEmpty())
    {
       
        card_moder.addCard({
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            userId: req.session.userId,
            productId: req.body.productId,
            image: req.body.image,
            timeOrder: Date.now() 
        }).then(()=>{
            res.redirect('/card');
        }).catch(err=>{
            next(err);
        })

    }else
    {
        
        req.flash('cardError',validationResult(req).array())
        req.flash('cardidproduct',req.body.productId)
        res.redirect(req.body.redirectTo);
    }
   
}


exports.delete_card=(req, res, next) => {

card_moder.delete_card(req.params.id)
.then(()=>{
    res.redirect('/card');
}).catch((err)=>{
    next(err);
})

}