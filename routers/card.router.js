
const router = require('express').Router()
let bodyParser = require('body-parser')
const check = require("express-validator").check;
bodyParser=bodyParser.urlencoded ({extended: true});
const card_contral=require("../contral/card.contral");
const auth_gured= require('./gareds/auth.gured');

router.get('/', auth_gured.isAuth, card_contral.get_cart);

router.post('/', auth_gured.isAuth, bodyParser, check("amount")
    .not().isEmpty()
    .withMessage("amount is required")
    .isInt({min: 1})
    .withMessage("amount must be greater than 0"),
    card_contral.add_Card
);

router.get('/delete/:id', auth_gured.isAuth,card_contral.delete_card)

module.exports= router;