const {check} = require("express-validator");

module.exports = [
    check("name")
        .notEmpty().withMessage("Debes ingresar el nombre del producto").bail()
        .isLength({min : 5}).withMessage("Debes ingresar como mínimo 5 letras"),
    check("description")
        .isLength({min : 20}).withMessage("Debes ingresar como mínimo 20 letras"),
]