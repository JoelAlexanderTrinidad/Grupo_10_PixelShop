const { User, Order } = require('../database/models');
const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');
const moment = require('moment');
const db = require('../database/models');

module.exports={
    register:(req,res)=>{
        return res.render('register')
    },
    login:(req,res)=>{
        return res.render('login')
    },
    processRegister:(req, res)=>{
        const errores = validationResult(req);
        if(errores.isEmpty()){
            
            let {id, nombre, apellido, tel, email, password, terminos, privacidad} = req.body;

            User.create({
                id,
                nombre,
                apellido,
                tel,
                email,
                password: bcryptjs.hashSync(password, 10),
                terminos,
                privacidad,
                imagenPerfil: req.file ? req.file.filename : 'no-image.png',
                rolId : '1'
            })
       /*      .then(usuarioNuevo => {
                req.session.userLogin = {
                    id : usuarioNuevo.id,
                    nombre : usuarioNuevo.nombre,
                    apellido : usuarioNuevo.apellido,
                    imagenPerfil : usuarioNuevo.imagenPerfil,
                    rolId : usuarioNuevo.rolId
                }
            
                res.locals.user = req.session.userLogin; */
               .then(()=>{
                res.redirect('/users/login');
            })
            .catch(error => console.log(error))
        }else{
        if(req.file){
            const imageName = req.file.filename
            fs.unlinkSync(path.resolve(__dirname,'..','..','public','images', imageName));
            }
            res.render('register',{
                errores: errores.mapped(),
                old: req.body
            });
        }
        
    },
    processLogin:(req,res)=>{
    let errores = validationResult (req);
        if(errores.isEmpty()){
        
            User.findOne({
                where : { email : req.body.email  }
            })
            .then( async ({id,nombre, rolId, apellido, fecha}) => {
              let order = await db.Order.findOne({
                where:{
                    userId:id,
                    status:1
                },
                include: [
                    {
                      association: "carts",
                      attributes: ["id", "quantity"],
                      include: [
                        {
                          association: "product",
                          attributes: ["id","img", "name", "price", "discount"],
                        },
                      ],
                    },
                  ],
              })
                req.session.userLogin = {
                    id,
                    nombre,
                    apellido,
                    rolId,
                    fecha,
                    order 
                }
                if(req.body.recordame){
                    res.cookie("userPixelShop", req.session.userLogin,{maxAge: 1000*60*10})
                }
                return res.redirect('/?user=true');
            })
        }else{
            res.render('login',{
                errores :errores.mapped(),
                old: req.body
            });
        }
    },
    editProfile: (req,res) => {
        User.findByPk(req.session.userLogin.id)
        .then(usuario => {
            const fecha = !usuario.fecha ? null : moment(usuario.fecha).toISOString().slice(0,10)  
            res.render("editProfile", {
                usuario,
                fecha
            })
        })
        .catch(error => console.log(error))
    },
    logout: (req,res) => {
        req.session.destroy();
        res.cookie("userPixelShop", null, {maxAge : -1})
        return res.redirect("/")
    },
    updateProfile : async (req,res) => {
       
        try {
            let errores = validationResult(req);
            const usuario = await User.findAll({
                where : {
                    id: req.session.userLogin.id
                },
                attributes : ['imagenPerfil', 'password', 'fecha']
            })


            
            if(errores.isEmpty()){
               await User.update({
                    ...req.body,
                    password: usuario[0].password && !req.body.nuevaPass1 ? usuario[0].password : bcryptjs.hashSync(req.body.nuevaPass1, 10),
                    imagenPerfil: req.file ? req.file.filename : usuario[0].imagenPerfil,
                    fecha: req.body.fecha ? moment(req.body.fecha).toISOString().slice(0,10) : null
                },{
                    where : { id : req.session.userLogin.id }
                });
                if(req.file && usuario[0].imagenPerfil != "no-image.png"){
                    fs.unlinkSync(path.resolve(__dirname,'..', '..','public','images',usuario[0].imagenPerfil))
                }
                req.session.userLogin = {
                    ...req.session.userLogin
                  }
                  return res.redirect("/users/profile");
            }else{
                    return res.render("editProfile", {
                        usuario : req.body,
                        errores : errores.mapped(),
                        fecha : moment(usuario[0].fecha).toISOString().slice(0,10)
                      });
                }


        } catch (error) {
            console.log(error)
        }

    },
    profile : async (req, res) => {

        try {
           
            const user = await User.findByPk(req.session.userLogin.id)
            const  fecha = !user.fecha ? null : moment(user.fecha).toISOString().slice(0,10)          
            return res.render("profile", {
                user,
                fecha
            })
        } catch (error) {
            console.log(error)
        }
    },
    removeUser : async (req,res) => {
        try {
            const user = await User.findAll({
                where : {
                    id : req.session.userLogin.id
                },
                attributes: ['imagenPerfil']
            })
            User.destroy({
                where : {
                    id : req.session.userLogin.id
                }
            })
            if(user[0].imagenPerfil !== 'no-image.png') {
                fs.unlinkSync(path.resolve(__dirname, "..", "..", "public", "images", user[0].imagenPerfil))
            }
            res.cookie("userPixelShop", null, {maxAge : -1})
            req.session.destroy();
            return res.redirect("/");
        } catch (error) {
            console.log(error)
        }
    }
}
