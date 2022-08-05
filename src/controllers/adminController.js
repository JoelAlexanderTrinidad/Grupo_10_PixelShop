
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
superAdmin:async(req,res)=> {
   try {
    const users = await db.User.findAll({
        where :{
            rolId:{
            [Op.ne]: 3
            } 
        }
    })
    const rol = await db.Rol.findAll()

return res.render('listUsers', {
                users,
                rol
            })
       
   } catch (error) {
    console.log(error)
   }
}
}