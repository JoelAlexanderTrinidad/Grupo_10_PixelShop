const {check, body} = require('express-validator');
// const usuarios = require('../data/users.json');
const db = require('../database/models')

module.exports = [
    check('nombre')
        /* .custom(value => !/\s/.test(value)).withMessage('No se permiten espacios').bail() */
        .isLength({min: 2}).withMessage('Debe ingresar como mínimo 2 letras').bail()
        .withMessage('El nombre debe contener solo letras'),
        
    check('apellido')
        .isLength({min: 2}).withMessage('Debe ingresar como mínimo 2 letras').bail()
        .withMessage('El apellido debe contener solo letras'),

    check('tel')
        .notEmpty().withMessage('Debe ingresar un número de teléfono'),

    check('email')
        .notEmpty().withMessage('Debes ingresar un email').bail()
        .isEmail().withMessage('Email inválido').bail()
        .custom( value => {
            return db.User.findOne({
                where : {
                    email : value
                }
            })
            .then(user => {
                if (user) {
                    return Promise.reject()
                }
            })
            .catch(() => Promise.reject('El mail ya se encuentra registrado'))
        }),

    check('password')
        .isLength({min: 6, max: 12}).withMessage('La contraseña debe tener entre 6 y 12 caracteres').bail(),
        

    body('password2')
        .custom((value, {req}) => {
            if(value !== req.body.password){
                return false;
            }
            return true;
        }).withMessage('¡Las contraseñas no coinciden!'),
    body("imagenPerfil")
        .custom((value, {req}) => {
            let allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
            if (!req.file) {
                return true
            } if (!allowedExtensions.exec(req.file.filename)) {
                return Promise.reject("Solo archivos con extensión .jpg, .jpeg, .png o .gif")
            } else {
                return true
            }
        }),

    check('terminos')
        .isString('on').withMessage('Debes aceptar los términos y condiciones'),

    check('privacidad')
        .isString('on').withMessage('Dbes aceptar las políticas de privacidad')
]

