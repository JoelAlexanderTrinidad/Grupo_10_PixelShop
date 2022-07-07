const db = require('../database/models');
const { Op } = require("sequelize");
/* const products = require('../data/products.json'); */
const path = require('path');


module.exports={
    productDetail:(req,res)=>{
        const product = db.Product.findByPk(req.params.id);
        
        const products = db.Product.findAll();
               
        const juegoGen = db.Gender.findAll({
            attributes : ['id','name']
            })
        const generos = db.Product_gender.findAll(
             {
                where :{
                    productId: req.params.id
                } 
            })
        Promise.all([juegoGen, generos, product, products])
        .then(([juegoGen, generos, product, products])=> {
                let generoJuego = []
                for (let i=0; i<generos.length; i++) {
                    generoJuego.push(generos[i].genderId)       
                }
                let generosAsociados = []
                for (let i=0; i<juegoGen.length; i++) {
                    generosAsociados.push(juegoGen[i].name)
                }
                let misGeneros=[]
                for(let i=0; i<generoJuego.length; i++){
                    for (let j=0; j<=12; j++) {
                        if(generoJuego[i]===j){
                            misGeneros.push(generosAsociados[j-1])
                        }
                    }
                //    a.push(i)
                }
                return res.render('productDetail',{
                    product,
                    misGeneros,
                    products
                })
            }) 
    },
    productCart:(req,res)=>{
        db.Product.findAll()
        .then(products => {
            return  res.render('productCart', {
                products})
        })
        .catch(error=> console.log(error))
    },
    add:(req,res)=>{
        db.Gender.findAll()
        .then(genders =>{
            return  res.render('formCrear',{
                genders
            })    
        })
        .catch(error=> console.log(error))
    },
    store: async (req,res) => {

        try {
            const {id, name, price, discount, description, ranking, genres} = req.body;
            // console.log(genres)
            
            let nuevoProducto = await db.Product.create(
                {   id : id, 
                    name: name.trim(),
                    price: +price,
                    discount:+discount,
                    description: description.trim(),
                    img: req.file ? req.file.filename : 'default-image.jpg',
                    ranking : ranking,
                    genres : genres.join()
                })

            let nuevoProductArray = JSON.parse("[" + genres + "]");

            for (let index = 0; index < nuevoProductArray.length; index++) {
               
                    await db.Product_gender.create({
                    
                    genderId: nuevoProductArray[index],
                    productId: nuevoProducto.id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
            }
            return res.redirect('/admin')

        } catch (error) {
            console.log(error)
        }
            
    },

    //FALTA EDIT Y UPDATE ----> asociacion de genders
    edit : (req,res) => {
        const product = db.Product.findByPk(req.params.id);
        const genders = db.Gender.findAll({
           
        });
        const generosJ = db.Product_gender.findAll({
            where :{
                productId : req.params.id
            }
        })
        Promise.all([product, genders,generosJ])
        .then(([product,genders,generosJ])=> {
            res.render('formEdit',{
                product,
                genders,
                generosJ
            })
        })
        .catch(error=>console.log(error))
    },   
    update:  async (req,res) => {

        try {
            const { name, price, discount, description, ranking, genres} = req.body;
            const producto = await db.Product.findByPk(req.params.id)
                              
            const productoModificado = await db.Product.update(
                {   
                    name: name.trim(),
                    price: +price,
                    discount:+discount,
                    description: description.trim(),
                    img: req.file ? req.file.filename : producto.img,
                    ranking : ranking,
                    genres : genres
                },{
                    where :{
                        id : producto.id
                    }
                }) 
            
            
            

            console.log(img)
            return res.send(img)
            let generosJ = JSON.parse("["+ prod.genres +"]")

            for (let i = 0; i < generoJ.length; i++) {

                await db.Product_gender.update(
                    {   
                        genderId: generosJ[i],
                        productId: producto.id
                    })
                
            }
           
        } catch (error) {
            console.log(error)
        }
            
    },    

    search : (req,res) => {
        let {keyword} = req.query
        db.Product.findAll({
            where:{
                name: {
                    [Op.substring]:[keyword.toLowerCase()]
                }
            }
        })
        .then(products=>{
            return res.render('result',{
                products,
                keyword
            })
        })
    },
    
    remove : async (req,res) =>  { 
        try {
            
            const eliminarProduct= await db.Product.destroy({
                where : { id : req.params.id}
            })
            const eliminarGender = await db.Product_gender.destroy({
                where : {
                    productId : req.params.id
                }
            })
            if(eliminarProduct.img !== 'default-image.jpg') {
                fs.unlinkSync(path.resolve(__dirname, "..", "..", "public", "images", eliminarProduct.img))
            }
            
            return  console.log(eliminarGender)
            res.redirect("/admin");
        } 
        catch (error) {
            console.log(error)
            
        }
    }
}


    
