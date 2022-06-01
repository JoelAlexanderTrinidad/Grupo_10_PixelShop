const { validationResult } = require("express-validator");



module.exports={
    register:(req,res)=>{
        return res.render('register')
    },
    login:(req,res)=>{
        return res.render('login')
    },
    processLogin:(req,res)=>{
    let errors = validationResult (req);
        if(errors.isEmpty()){
            const {id, nombre, categoryUsers} = usuarios.find(usuario => usuario.email === req.body.email);
                
            req.session.userLogin ={
               id, 
               nombre,
               categoryUsers
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
  
