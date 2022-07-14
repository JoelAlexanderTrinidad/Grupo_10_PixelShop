const {check,body}= require('express-validator');
// const usuarios = require ('../data/users.json')
const bcryptjs = require('bcryptjs');
const db = require('../database/models')

module.exports = [
        
    check('email')
        .notEmpty().withMessage('Debes ingresar tu email').bail()
        .isEmail().withMessage('Email no valido'),
    
    check('password')
        .notEmpty().withMessage('Debes ingresar tu contraseña').bail()
        .custom((value, {req}) => {
            return db.User.findOne({
              where : {
                email : req.body.email
              }
            }).then(user => {
              if(!user || !bcryptjs.compareSync(value, user.password)){
                return Promise.reject()
              }
            }).catch(() => Promise.reject('Credenciales inválidas'))
          })
      ];
