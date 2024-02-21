const router = require('express').Router();
const amdinContral = require('../contral/admin.contral');
let bodyParser=require('body-parser');
bodyParser=bodyParser.urlencoded({ extended: true });
const isAdmin = require('./gareds/admin.gured');
const multer= require('multer');

router.get('/add',isAdmin,amdinContral.getadd)


router.get('/manage',isAdmin,amdinContral.getMproducts)


router.post('/manage/updata',isAdmin,bodyParser,amdinContral.updateData)

router.post('/manage/delete/:id',isAdmin,amdinContral.deleteData)


router.post('/add',isAdmin,multer({
    storage: multer.diskStorage({
        //location storage data
       destination: (req,file,callback)=>{
         callback(null,'images')
       } ,//  upload file name
       filename: (req,file,callback)=>{
            // hna a7na 3mlna time kol mile sacand hytzwd 3la ale name bta3 ale sora 3l4an lw 3mlt upload marten ly nfs ale sora ykon fe a5tlaf
            callback(null,Date.now()+'-'+file.originalname)
       }
    }) 
}).array('product-images[]'),bodyParser,amdinContral.postadd)


module.exports=router; 