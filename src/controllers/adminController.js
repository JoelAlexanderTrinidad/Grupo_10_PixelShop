
const db = require('../database/models');
const { Op } = require("sequelize");

module.exports={
admin:(req,res)=> {
    db.Product.findAll()
        .then(products => {
            return res.render('listProduct', {
                products
            })
        })
        .catch(error => console.log(error))
},
superAdmin:(req,res)=> {
    db.User.findAll({
        where :{
            rolId:{
            [Op.ne]: 3
            } 
        }
    })
        .then(user => {
            return res.render('listUsers', {
                user
            })
        })
        .catch(error => console.log(error))
}
}