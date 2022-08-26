var express = require('express');
var router = express.Router();
const upload = require('../middlewares/uploadProfilePicture');
const registerValidator = require('../validations/registerValidator');
const loginValidator = require ('../validations/loginValidator');
const profileValidator = require('../validations/profileValidator');

/* /users */
const {register,login, processLogin, processRegister, editProfile, logout, updateProfile, removeUser, profile}=require('../controllers/userController');
const {checkEmail} = require('../controllers/apis/user')
const userCheck = require('../middlewares/userCheck');
const sessionCheck = require('../middlewares/sessionCheck');

router
      .get('/login', sessionCheck,login)
      .get('/register',sessionCheck,register)
      .post('/register', upload.single('imagenPerfil'),registerValidator,processRegister)
      .post('/login',loginValidator, processLogin)
      .get('/logout', logout)
      .get('/editProfile',userCheck, editProfile)
      .put('/update-profile', upload.single('imagenPerfil'), profileValidator, userCheck,updateProfile)
      .delete('/deleteUser',removeUser)
      .get('/profile',userCheck,profile)

      /* apis */
      .post('/api/check-email', checkEmail)
      
module.exports = router;
