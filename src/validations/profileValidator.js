const bcryptjs = require('bcryptjs');
const {check, body} = require('express-validator');
// const usuarios = require('../data/users.json');
const db = require('../database/models')

module.exports = [
    check('nombre')
        .isLength({min: 2}).withMessage('Debe ingresar como mínimo 2 letras').bail()
        .isAlpha().withMessage('El nombre debe contener solo letras'),

    check('apellido')
        .isLength({min: 2}).withMessage('Debe ingresar como mínimo 2 letras').bail()
        .isAlpha().withMessage('El apellido debe contener solo letras'),

    check('tel')
        .notEmpty().withMessage('Debe ingresar un número de teléfono'),

    check('email')
        .notEmpty().withMessage('Debes ingresar un email').bail()
        .isEmail().withMessage('Email inválido'),

    body('nuevaPass1')
        .custom((value, {req}) => {
            if(value !== req.body.nuevaPass2){
                return false;
            }
            return true;
        }).withMessage('¡Las contraseñas no coinciden!'),
    
    body('passAntiguo')
        .custom((value, {req}) =>{
            return db.User.findOne({
                where : {
                  email : req.body.email
                }
              }).then(user => {
                if(!user || !bcryptjs.compareSync(value, user.password)){
                  return Promise.reject()
                }
              }).catch(() => Promise.reject('Debes ingresar la contraseña antigua'))
            }),
]

