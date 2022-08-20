const db= require('../../database/models');
const { Op } = require("sequelize");


module.exports ={

exploreApi : async (req, res) =>{
    try {
        let products = await db.Product.findAll({
            where : {
              name : {
                [Op.startsWith] : [req.body.L]
              }
            }
        })
        let response = {
          ok: true,
          meta: {
            status: 200,
            total: products.length
          },
          data : products
        }
        return res.status(200).json(response)
            
        } catch (error) {
            console.log(error)
            let response = {
              ok: false,
              meta: {
                  status: 500
              },
              msg: error.message ? error.message : 'Comuniquese con el administrador del sitio'
          }
          return res.status(error.statusCode || 500).json(response)
        }
    }
}
