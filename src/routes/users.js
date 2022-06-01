var express = require('express');
var router = express.Router();

/* /users */
const {register,login, processLogin}=require('../controllers/userController');
const loginValidator = require ('../validations/loginValidator.js');


router
      .get('/login',login)
      .get('/register',register)
      .post('/login',loginValidator, processLogin)

module.exports = router;
