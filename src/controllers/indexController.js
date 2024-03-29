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
            limit: 6
        })
        let ofertasEpeciales = db.Product.findAll({
            where: {
                discount : {
					[Op.gte] : 40
				}
			},
			order : [['id','DESC']],
			limit : 8
            }
        )
        let recomendados = db.Product.findAll({
            where: {
                ranking: {
                    [Op.gte] : 0
                }
                },
                order: [['createdAt', 'DESC']],
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
    aboutUs: (req,res) => {
        return res.render("aboutUs")
    },
    contacts: (req,res) => {
        return res.render("contacts")
    }
}