const { User } = require('../database/models');
const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');
const moment = require('moment');

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
            .then(usuarioNuevo => {
                req.session.userLogin = {
                    id : usuarioNuevo.id,
                    nombre : usuarioNuevo.nombre,
                    apellido : usuarioNuevo.apellido,
                    imagenPerfil : usuarioNuevo.imagenPerfil,
                    rolId : usuarioNuevo.rolId
                }
                res.locals.user = req.session.userLogin;
                res.redirect('/');
            })
            .catch(error => console.log(error))
        }else{
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
                where : { email : req.body.email }
            })
            .then(usuario => {
                
                req.session.userLogin = {
                    id: usuario.id,
                    nombre : usuario.nombre,
                    apellido : usuario.apellido,
                    rolId : usuario.rolId,
                    fecha: usuario.fecha
                }
                if(req.body.recordame){
                    res.cookie("userPixelShop", req.session.userLogin,{maxAge: 1000*60*10})
                }
                res.locals.user = req.session.user;
                res.redirect("/");
            })
            .catch(error => console.log(error))
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
            return res.render("editProfile", {
                usuario
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
                attributes : ['imagenPerfil', 'password']
            })
            if(errores.isEmpty()){
                if(req.file){
                        fs.unlinkSync(path.resolve(__dirname,'..', '..','public','images',usuario[0].imagenPerfil))
                    }

                User.update({
                    ...req.body,
                    password: usuario[0].password && !req.body.nuevaPass1 ? usuario[0].password : bcryptjs.hashSync(req.body.nuevaPass1, 10),
                    imagenPerfil: req.file ? req.file.filename : usuario[0].imagenPerfil
                },{
                    where : { id : req.session.userLogin.id }
                });
                
                req.session.userLogin = {
                    ...req.session.userLogin
                  }
                  return res.redirect("/users/profile");
            }else{
                return res.render("editProfile", {
                    usuario : req.body,
                    errores : errores.mapped()
                  });
            }

        } catch (error) {
            console.log(error)
        }

     /*      const usuarioModificados = usuarios.map((usuario) => {
            if (usuario.id === id) {
              let usuarioModificados = {
                ...usuario,
                nombre : nombre.trim(),
                apellido : apellido.trim(),
                tel,
                email,
                password: password && !req.body.nuevaPass1 ? password : bcryptjs.hashSync(req.body.nuevaPass1, 10),
                imagenPerfil: req.file ? req.file.filename : imagenPerfil,
                fecha
              }
              return usuarioModificados;
            }
            return usuario;
          });

          if(req.file){
            if(fs.existsSync(path.resolve(__dirname,'..','public','images',imagenPerfil)) && imagenPerfil !== 'no-image.png'){
                fs.unlinkSync(path.resolve(__dirname,'..','public','images',imagenPerfil))
            }
        } 

          fs.writeFileSync(path.resolve(__dirname, "..", "data", "users.json"), JSON.stringify(usuarioModificados, null, 3), "utf-8");
          req.session.userLogin = {
            ...req.session.userLogin, nombre
          }
          return res.redirect("/users/profile");
        
        }else{
        //   console.log(errores);
          return res.render("editProfile", {
            usuario : req.body,
            errores : errores.mapped()
          });
        } */
    },
    profile : (req, res) => {
        User.findByPk(req.session.userLogin.id)
        .then(user => {
            const fecha = user.fecha = moment().format('DD-MM-YYYY');
            res.render("profile", {
                user,
                fecha
            })
        })
        .catch(error => console.log(error))
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
    },
}
