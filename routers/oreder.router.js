const router = require('express').Router()
let bodyParser = require('body-parser')
bodyParser=bodyParser.urlencoded ({extended: true});
const oreder_contral=require("../contral/oreder.contral");
const auth_gured= require('./gareds/auth.gured');

router.get('/',auth_gured.isAuth,oreder_contral.get_order)
router.get('/form/:id/:amount',auth_gured.isAuth,bodyParser,oreder_contral.get_form_oreder)
router.post('/form',auth_gured.isAuth,bodyParser,oreder_contral.post_form_oreder)


module.exports= router;