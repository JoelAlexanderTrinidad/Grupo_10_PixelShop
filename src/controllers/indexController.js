// const products = require("../data/products.json");
// const adminCheck = require("../middlewares/adminCheck");
const db = require('../database/models');
const { Op } = require("sequelize");

module.exports={
    index:(req,res)=> {

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
					[Op.gte] : 40
				}
			},
			order : [['id','DESC']],
			limit : 6
            }
        )
        let recomendados = db.Product.findAll({
            where: {
                  discount : {
					[Op.gte] : 5
				},
                ranking: {
                    [Op.gte] : 6
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