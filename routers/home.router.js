const router = require('express').Router();
const homeControal= require('../contral/home.controal');

const auth_gured= require('./gareds/auth.gured');
router.get('/',homeControal.getHome)

module.exports= router;