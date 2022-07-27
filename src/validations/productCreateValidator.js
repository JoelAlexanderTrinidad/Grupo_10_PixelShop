const {check, body} = require("express-validator");

module.exports = [
    check("name")
        .notEmpty().withMessage("Debes ingresar el nombre del producto").bail()
        .isLength({min : 5}).withMessage("Debes ingresar como mínimo 5 letras"),
    check("description")
        .notEmpty().withMessage("Debes ingresar una descripción").bail()
        .isLength({min : 20}).withMessage("Debes ingresar como mínimo 20 letras"),
    /* check("img")
        .¿?¿?¿?(".JPG",".JPEG",".PNG",".GIF").withMessage("Solo formatos JPG, JPEG, PNG, GIF"), */
    check("genres")
        .notEmpty().withMessage("Debes especificar los generos del producto"),
    check("price")
        .notEmpty().withMessage("Debes especificar el precio del producto").bail()
        .isFloat({min : 0}).withMessage("Precio invalido"),
    check("discount")
    .notEmpty().withMessage("Debes especificar el descuento del producto").bail()
        .isFloat({min : 0, max : 100}).withMessage("Descuento invalido"),
    check("ranking")
        .notEmpty().withMessage("Debes ingresar el Ranking del producto").bail()
        .isFloat({min : 1, max : 10}).withMessage("Ranking invalido")
]