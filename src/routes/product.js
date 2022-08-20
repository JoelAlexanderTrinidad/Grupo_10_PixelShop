var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const adminCheck = require('../middlewares/adminCheck');
const userCheck = require('../middlewares/userCheck');
const formCrearValidator = require("../validations/formCrearValidator");
const formEditValidator = require("../validations/formEditValidator")

const {productCart,productDetail, add, edit, store, search, update, remove, explore, AtoZ}=require('../controllers/productController');
const {exploreApi} = require('../controllers/apis/products')

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
      .get('/cart',userCheck,productCart)
      .get('/detail/:id', productDetail)
      .get('/crear', adminCheck,add)
      .post('/crear', upload.single('img'), formCrearValidator, store)
      .get('/edit/:id', adminCheck,edit)
      .put('/update/:id', upload.single('img'), adminCheck, formEditValidator,update)
      .get('/result', search)
      .delete('/remove/:id', adminCheck,remove)
      .get('/explore', explore)

      /* /api/product */
      .post('/explore', AtoZ)
      .post('/exploreProducts/?', exploreApi) //http://localhost:3002/api/product/exploreProducts
      
module.exports = router;
