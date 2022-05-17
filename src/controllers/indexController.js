const fs = require('fs');
const path = require('path');

module.exports={
    index:(req,res)=> {
        
        const products = require("../data/products.json");
        const OfertasEspeciales = products.filter(product => product.category.toLocaleLowerCase() === "ofertas especiales");
        const Destacados = products.filter(product => product.category === "Destacados");
        const Recomendados = products.filter(product => product.category === "Recomendados");

        return res.render('index', {
            products, OfertasEspeciales, Destacados, Recomendados
        })
    }
}

