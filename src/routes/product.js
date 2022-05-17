var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');

const {productCart,productDetail, formCrear, formEdit, store}=require('../controllers/productController');

const storage = multer.diskStorage({
      destination: (req, file, callback) =>{
          callback(null, 'public/images')
      },
      filename: (req, file, callback) =>{
          callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      }
  });

  const upload = multer({
      storage
  })

/* /product */

router
      .get('/cart',productCart)
      .get('/detail', productDetail)
      .get('/crear', formCrear)
      .post('/crear',upload.single('img'), store )
      .get('/edit', formEdit)

module.exports = router;
