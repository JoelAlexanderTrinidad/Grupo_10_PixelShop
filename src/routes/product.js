var express = require('express');
var router = express.Router();
const {productCart,productDetail, formCrear, formEdit}=require('../controllers/productController')

/* /product */

router
      .get('/cart',productCart)
      .get('/detail', productDetail)
      .get('/form/crear', formCrear)
      .get('/form/edit', formEdit)

module.exports = router;
