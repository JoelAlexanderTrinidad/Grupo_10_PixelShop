var express = require('express');
var router = express.Router();

/* / */
const adminCheck = require('../middlewares/adminCheck');
const superAdminCheck = require('../middlewares/superAdminCheck');
const {admin, superAdmin, remove} = require('../controllers/adminController')

router
      .get('/listProduct', adminCheck, admin)
      .get('/listUsers', superAdminCheck, superAdmin)
      .put('/update/:id', superAdminCheck, )
      .delete('/remove/:id', superAdminCheck, remove)
      

module.exports = router;
