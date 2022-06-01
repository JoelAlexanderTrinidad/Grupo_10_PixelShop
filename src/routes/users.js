var express = require('express');
var router = express.Router();
const upload = require('../middlewares/uploadProfilePicture');
const registerValidator = require('../validations/registerValidator');

/* /users */
const {register, login, processRegister}=require('../controllers/userController')
router
      .get('/login',login)
      .get('/register',register)
      .post('/register', upload.single('image'),registerValidator,processRegister)

module.exports = router;
