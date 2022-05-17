var express = require('express');
var router = express.Router();
const {productCart,productDetail, formCrear, formEdit}=require('../controllers/productController')

/* /product */

router
      .get('/cart',productCart)
      .get('/detail', productDetail)
      .get('/crear', formCrear)
      .post('/crear', )
      .get('/edit', formEdit)

module.exports = router;
