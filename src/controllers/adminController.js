const db = require('../database/models');
const { Op } = require("sequelize");
const fs = require('fs')
const path = require('path');

module.exports={
admin: async (req,res)=> {
    // let page = req.query.page
    const resultadoPorPagina = 5
    try {
        let products = await db.Product.findAll()
        // console.log('>>>>>>>>>>>>>>>>>>>', page);
        const resultados = products.length
        const numeroPaginas = Math.ceil(resultados / resultadoPorPagina)
        let page = req.query.page ? Number(req.query.page) : 1
        if(page > numeroPaginas){
            res.redirect(`/?page=${encodeURIComponent(numeroPaginas)}`)
        }else if(page < 1){
            res.redirect(`/?page=${encodeURIComponent('1')}`)
        }

        const comenzando = (page - 1) * resultadoPorPagina
        products = await db.Product.findAll({
            offset: comenzando, limit: resultadoPorPagina
        })

        let iterador = (page - 5) - 1 ? 1 : page - 5
        let ultimoLink = (iterador + 9) <= numeroPaginas ? (iterador + 9) : page + (numeroPaginas - page)

        if(ultimoLink < (page + 4)){
            iterador -= (page + 4) - numeroPaginas
        }

        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',iterador);

        return res.render('listProduct', {
            products,
            resultados,
            page,
            iterador,
            ultimoLink,
            numeroPaginas
        })
    } catch (error) {
        console.log(error)
    }
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
        const {rolId} = req.body

        await db.User.update({
            rolId
        },{
            where :{
                id : req.params.id
            }
        })
        
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>' + rolId)
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