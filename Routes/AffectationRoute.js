const express = require('express')
const  router = express.Router()
const config = require("./../config.json");

const affectation  = require('../Controllers/AffectationController');



//router.post('/login', Client.login)
router.post('/add', affectation.affecte)
router.get('/showaff/:key', affectation.recupereaff)
router.get('/showaud/:key', affectation.recupereaffaud)




module.exports= router