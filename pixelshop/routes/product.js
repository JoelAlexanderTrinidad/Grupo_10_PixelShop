var express = require('express');
var router = express.Router();

/* /product */
const {productCart,productDetail}=require('../controllers/productController')
router
      .get('/cart',productCart)
      .get('/detail', productDetail)

module.exports = router;
