const router = require('express').Router();
const auth= require("./gareds/auth.gured")
const profileController = require("../contral/profile.contral");



router.get('/',auth.isAuth,profileController.getProfile)



module.exports = router