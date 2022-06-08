var express = require('express');
var router = express.Router();

/* / */
const{index, admin}= require('../controllers/indexController');
const adminCheck = require('../middlewares/adminCheck');
router
      .get('/',index)
      .get('/admin', adminCheck, admin)

module.exports = router;
