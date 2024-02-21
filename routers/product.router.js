const router = require('express').Router();
const productControal= require('../contral/product.contral');
// hna ana a5d ale id mn ale qurey 
router.get('/product',(req,res)=>{
    res.redirect('/');
})
router.get('/product/:id',productControal.getproduct);

module.exports= router;