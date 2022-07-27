const {check, body} = require("express-validator");

module.exports = [
    check("name")
        .notEmpty().withMessage("Debes ingresar el nombre del producto").bail()
        .isLength({min : 5}).withMessage("El nombre debe tener como mínimo 5 caracteres"),
    check("description")
        .notEmpty().withMessage("Debes ingresar una descripción").bail()
        .isLength({min : 20}).withMessage("La descripción debe tener como mínimo 20 caracteres"),
    /* check("img")
        .¿?¿?¿?(".JPG",".JPEG",".PNG",".GIF").withMessage("Solo formatos JPG, JPEG, PNG, GIF"), */
    check("genres")
        .notEmpty().withMessage("Debes especificar el/los generos del producto"),
    check("price")
        .notEmpty().withMessage("Debes especificar el precio del producto").bail()
        .isFloat({min : 0}).withMessage("El precio ingresado no es valido"),
    check("discount")
        .notEmpty().withMessage("Debes especificar el descuento del producto").bail()
        .isFloat({min : 0, max : 100}).withMessage("El descuento ingresado no es valido"),
    check("ranking")
        .notEmpty().withMessage("Debes ingresar el Ranking del producto").bail()
        .isFloat({min : 1, max : 10}).withMessage("el ranking ingresado no es valido")
]