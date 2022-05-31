var express = require('express');
var router = express.Router();

/* /users */
const {register,login, profile}=require('../controllers/userController')
router
      .get('/login',login)
      .get('/register',register)
      .get('/profile', profile)

module.exports = router;
