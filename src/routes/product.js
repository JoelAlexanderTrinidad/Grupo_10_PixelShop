var express = require('express');
var router = express.Router();
const {productCart,productDetail, formCrear, formEdit, store}=require('../controllers/productController')

/* /product */

router
      .get('/cart',productCart)
      .get('/detail', productDetail)
      .get('/crear', formCrear)
      .post('/crear', store )
      .get('/edit', formEdit)

module.exports = router;
