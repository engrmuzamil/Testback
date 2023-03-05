const express = require('express')
const  router = express.Router()
const config = require("./../config.json");

const Auditeur  = require('../Controllers/AuditeurController');



//router.post('/login', Client.login)
router.get('/showw', Auditeur.recupererclient)
router.get('/showh', Auditeur.recupererauditeur)
router.get('/show/:key', Auditeur.recupererphase)
router.post('/login', Auditeur.login)




module.exports= router