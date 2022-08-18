var express = require('express');
var router = express.Router();

/* / */
const{index, aboutUs}= require('../controllers/indexController');


router
      .get('/',index)
      .get("/aboutUs",aboutUs)

module.exports = router;
