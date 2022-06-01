const {check,body}= require('express-validator');
const usuarios = require ('../data/users.json')
const bcryptjs = require('bcryptjs');

module.exports = [
        
    check('email')
        .notEmpty().withMessage('Debes ingresar tu email').bail()
        .isEmail().withMessage('Email no valido'),
    
    check('password')
        .notEmpty().withMessage('Debes ingresar tu contraseña').bail()
        .custom((vaule, {req})=>{
            const usuario = usuarios.find(usuario => usuario.email === req.body.email);
            if (!usuario){
                return false
            }else{
                if(!bcryptjs.compareSync(vaule, usuario.password))
                    return false
            }
            return true
        }).withMessage('Credenciales invalidas'),
    
]