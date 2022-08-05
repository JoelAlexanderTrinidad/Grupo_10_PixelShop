var express = require('express');
var router = express.Router();

/* / */
const adminCheck = require('../middlewares/adminCheck');
const superAdminCheck = require('../middlewares/superAdminCheck');
const {admin} = require('../controllers/adminController')

router
      .get('/admin/listProduct', adminCheck, admin)
      .get('/admin/listUser', superAdminCheck, )
      

module.exports = router;
