var express = require('express');
var router = express.Router();
const upload = require('../middlewares/uploadProfilePicture');
const registerValidator = require('../validations/registerValidator');
const loginValidator = require ('../validations/loginValidator');
const profileValidator = require('../validations/profileValidator');

/* /users */
const {register,login, processLogin, processRegister, profile, logout, updateProfile}=require('../controllers/userController');
const userCheck = require('../middlewares/userCheck');
router
      .get('/login',login)
      .get('/register',register)
      .post('/register', upload.single('image'),registerValidator,processRegister)
      .post('/login',loginValidator, processLogin)
      .get('/logout', logout)
      .get('/profile',userCheck, profile)
      .put('/update-profile', profileValidator,updateProfile)

module.exports = router;
