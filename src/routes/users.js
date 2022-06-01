var express = require('express');
var router = express.Router();
const upload = require('../middlewares/uploadProfilePicture');
const registerValidator = require('../validations/registerValidator');
const loginValidator = require ('../validations/loginValidator');

/* /users */
const {register,login, processLogin, processRegister, profile, logout}=require('../controllers/userController');

router
      .get('/login',login)
      .get('/register',register)
      .post('/register', upload.single('image'),registerValidator,processRegister)
      .post('/login',loginValidator, processLogin)
      .get('/logout', logout)
      .get('/profile', profile)
      //.put('/update-profile', updateProfile)

module.exports = router;
