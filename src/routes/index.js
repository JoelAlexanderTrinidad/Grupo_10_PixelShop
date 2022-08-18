var express = require('express');
var router = express.Router();

/* / */
const{index, aboutUs, contacts}= require('../controllers/indexController');


router
      .get('/',index)
      .get("/aboutUs",aboutUs)
      .get("/contacts",contacts)

module.exports = router;
