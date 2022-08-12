const db = require('../database/models');
const { Op } = require("sequelize");
const fs = require('fs')
const path = require('path');

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
        },
    })
    const rols = await db.Rol.findAll()

return res.render('listUsers', {
                users,
                rols
            })
       
   } catch (error) {
    console.log(error)
   }
},
update : async (req,res) => {
    try { 
        await db.User.update({
            rolId : req.body.rolId
        },{
            where :{
                id : req.params.id
            }
        })
        
        return res.redirect('/admin/listUsers')

    } catch (error) {
        console.log(error)
    }
}, 
remove : async (req, res) =>{
    try {
        const user = await db.User.findAll({
            where :{
                id: req.params.id
            },
            attributes : ['imagenPerfil']
        })
        if(user[0].imagenPerfil !== 'no-image.png') {
            fs.unlinkSync(path.resolve(__dirname, "..", "..", "public", "images", user[0].imagenPerfil))
        }
        await db.User.destroy({
            where :{
                id : req.params.id
            }
        })
        return res.redirect('/admin/listUsers')
    } catch (error) {
        console.log(error)
    }
}
}