const bcryptjs = require('bcryptjs');
const {check, body} = require('express-validator');
const usuarios = require('../data/users.json');

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
        

    body('passAntiguo')
        .notEmpty().withMessage('Debes ingresar la contraseña antigua')
        .custom((value, {req}) =>{
            const usuario = usuarios.find(usuario => usuario.email === req.body.email);
            if(!usuario){
                return false;
            }
            else{
                if(!bcryptjs.compareSync(value, usuario.password))
                return false;
            }
            return true;
        }).withMessage('DESBES INGRESAR LA CONTRASEÑA ANTIGUA'),

    body('nuevaPass1')
        .notEmpty().withMessage('Desbes ingresar una nueva contraseña!')
        .custom((value, {req}) => {
            if(value !== req.body.nuevaPass2){
                return false;
            }
            return true;
        }).withMessage('¡Las contraseñas no coinciden!'),

    check('fecha')
        .notEmpty().withMessage('Debe ingresar su fecha de nacimiento'),
    
]

