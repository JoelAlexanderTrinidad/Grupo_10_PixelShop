var express = require('express');
var router = express.Router();

/* /users */
const {register,login, profile, logout}=require('../controllers/userController')
router
      .get('/login',login)
      .post('/login')
      .get('/register',register)
      .post('/register')
      .get('/logout', logout)
      .get('/profile', profile)
      //.put('/update-profile', updateProfile)

module.exports = router;
