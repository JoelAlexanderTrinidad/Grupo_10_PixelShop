var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const adminCheck = require('../middlewares/adminCheck');
const productCreateValidator = require("../validations/productCreateValidator");
const productEditValidator = require("../validations/productEditValidator")

const {productCart,productDetail, add, edit, store, search, update, remove}=require('../controllers/productController');

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
      .get('/detail/:id', productDetail)
      .get('/crear', adminCheck,add)
      .post('/crear', upload.single('img'), productCreateValidator, store)
      .get('/edit/:id', adminCheck,edit)
      .put('/update/:id', upload.single('img'), adminCheck, productEditValidator,update)
      .get('/result', search)
      .delete('/remove/:id', adminCheck,remove)

module.exports = router;
