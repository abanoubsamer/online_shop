
const profileModel=require('../modeal/profile.model')



exports.getProfile=(req,res,next)=>{
    profileModel.getProfile(req.session.userId,(err,profile,card,order)=>{
    if(err) next(err)
       
    else {res.render('profile',{
        profile,
        isAdmin:req.session.isAdmin,
        isUser: req.session.userId,
        image:profile.image,
        cardlenght: card,
        orderlenght: order,
        pagetitale: "Profile"
    })}

    })
} 
