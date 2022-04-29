var express = require('express');
var router = express.Router();

/* /users */
const {register,login}=require('../controllers/userController')
router
      .get('/login',login)
      .get('/register',register)

module.exports = router;
