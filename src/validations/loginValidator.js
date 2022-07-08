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
        .custom((value, {req})=>{
            const usuario = db.User.findAll({
                where : {
                    email: req.body.email
                }
            })
            if (!usuario){
                return false
            }else{
                if(!bcryptjs.compareSync(value, usuario.password))
                    return false
            }
            return true
        }).withMessage('Credenciales invalidas'),
]