// const products = require("../data/products.json");
// const adminCheck = require("../middlewares/adminCheck");
const db = require('../database/models');
const { Op } = require("sequelize");

module.exports={
    index:(req,res)=> {
        /* const OfertasEspeciales = products.filter(product => product.category.toLocaleLowerCase() === "ofertas especiales");
        const Destacados = products.filter(product => product.category === "Destacados");
        const Recomendados = products.filter(product => product.category === "Recomendados"); */

        let destacados = db.Product.findAll({
            where: {
                ranking: {
                    [Op.gte] : 8
                }
            },
			order : [['ranking','DESC']],
            limit: 2
        })
        let ofertasEpeciales = db.Product.findAll({
            where: {
                discount : {
					[Op.gte] : 20
				}
			},
			order : [['id','DESC']],
			limit : 6
            }
        )
        /* >>>>>>>>> CHECKEAR RECOMENDADOS <<<<<<<<<<<< >:C*/
        let recomendados = db.Product.findAll({
            where: {
                createdAt: {
                    [Op.lt]: new Date(),
                    [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
                  }
                },
                order: [['createdAt', 'ASC']],
                limit: 6
        })
        Promise.all([destacados, ofertasEpeciales, recomendados])
            .then(([destacados, ofertasEpeciales, recomendados]) => {
                return res.render('index', {
                    destacados,
                    ofertasEpeciales,
                    recomendados
                })
            })
            .catch(error => console.log(error))        
    },
    admin:(req,res)=> {
        db.Product.findAll()
            .then(products => {
                return res.render('admin', {
                    products
                })
            })
            .catch(error => console.log(error))
    }
}