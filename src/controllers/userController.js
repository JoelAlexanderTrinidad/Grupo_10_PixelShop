const usuarios = require('../data/users.json');
const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');
const bcryptjs = require('bcryptjs');
module.exports={
    login:(req,res)=>res.render('login'),
    register:(req,res)=>res.render('register'),
    
    profile: (req,res) => {
        return res.render ("profile")

        const users = JSON.parse(fs.readFileSync("./data/users.json","utf-8"));
        const user = users.find(user => user.id === req.session.userLogin.id);
        return res.render("profile",{
            user
        })
    },
    
    logout: (req,res) => {
        req.session.destroy();
        res.cookie("PixelShop", null, {maxAge : -1})
        return res.redirect("/")
    }
}

module.exports={
    register:(req,res)=>{
        return res.render('register')
    },
    login:(req,res)=>{
        return res.render('login')
    },
    processRegister:(req, res)=>{
        const errors = validationResult(req);
        

        if(errors.isEmpty()){
            
            const {nombre, apellido, tel, email, password, fecha, genero, terminos, privacidad,rol} = req.body;
    
            const lastId = usuarios.length !== 0 ? usuarios[usuarios.length - 1].id : 0;
           
            const nuevoUsuario = {
                id: +lastId + 1,
                nombre: nombre.trim(),
                apellido: apellido.trim(),
                tel: +tel.trim(),
                email,
                password: bcryptjs.hashSync(password, 10),
                fecha,
                genero,
                terminos,
                privacidad,
                imagenPerfil: req.file ? req.file.filename : null,
                rol
            };

            usuarios.push(nuevoUsuario);

            fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'users.json'), JSON.stringify(usuarios, null, 3), 'utf-8');

            return res.redirect('/');   
        }
        else{
            return res.render('register',{
               
                old: req.body,
                errores: errors.mapped()
            });
        }
       
    },
    processLogin:(req,res)=>{
    let errors = validationResult (req);
        if(errors.isEmpty()){
            const {id, nombre, rol} = usuarios.find(usuario => usuario.email === req.body.email);
                
            req.session.userLogin = {
               id, 
               nombre,
               rol
            }

            return res.redirect("/");
        }else{

            return res.render('login',{
                errores :errors.mapped(),
                old: req.body
            });
        }
             
    },
    
};
  