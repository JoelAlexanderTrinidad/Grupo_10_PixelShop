const db = require('../database/models');
const { Op } = require("sequelize");
/* const products = require('../data/products.json'); */
const path = require('path');
/* const fs = require('fs'); */
/* const genders =  require('../data/genders.json'); */

module.exports={
    productDetail:(req,res)=>{
        /* const producto = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "products.json"), "utf-8"));

        const {id} = req.params;
        const product = producto.find(product => product.id === +id);
        const misGeneros = product.gender; */

        const product = db.Product.findByPk(req.params.id);
        const misGeneros = db.Gender.findAll();
        const products = db.Product.findAll();
        Promise.all([product, misGeneros, products])
        .then(([product, misGeneros, products])=> {
            return res.render('productDetail',{
                product,
                misGeneros, //FALTA ASOCIAR LOS GENEROS!!!
                products
            })
        }
        )
        .catch(error=> console.log(error))
        
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
    store: (req,res) => {
        const {name, price, discount,category, description} = req.body;
        db.Product.create(
        {
            name: name.trim(),
            price: +price,
            discount:+discount,
            category,
            description: description.trim(),
            img: req.file ? req.file.filename : 'default-image.jpg',
        })
        .then(res.redirect('/'))
        .catch(error=> console.log(error))          
    },
   
    update: (req,res)=>{
        const {id}=req.params;
        const {name, price, category, discount, description, requeriment}= req.body;

        let gender;

        const product = products.find(product => product.id === +req.params.id)
       
        let productsModify =  products.map(product =>{
             if(product.id === +req.params.id){
                 let productModify={
                ...product,
                name: name,
                price: +price,
                discount:+discount,
                category,
                description: description,
                img: req.file ? req.file.filename : product.img,
                gender: !req.body.gender ? gender = product.gender : gender = typeof(req.body.gender) === 'string' ? [req.body.gender] : req.body.gender,
                requeriment
                 }
                 return productModify
                 
                }
                return product 
                
            })

            if(req.file){
               if(fs.existsSync(path.resolve(__dirname,'..','public','images',product.img)) && product.img !== "noimage.jpeg"){
                   fs.unlinkSync(path.resolve(__dirname,'..','public','images',product.img))
               }
           }        
            
            fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'products.json'),JSON.stringify(productsModify, null, 3), 'utf8')

        return res.redirect('/product/detail/' + product.id);
    },    

    search : (req,res) => {
        const {keyword} = req.query;
        const searchProduct = products.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()));

        return res.render("result", {
            products : searchProduct, keyword
        })
    },
    edit : (req,res) => {
        const producto = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "data", "products.json"), "utf-8"));

        const product = producto.find(product => product.id === +req.params.id);
       
            res.render('formEdit', {product, genders});   
    },
    remove : (req,res) => {
        const productFilter = products.filter(product => product.id !== +req.params.id);
        const product = products.find(product => product.id === +req.params.id)

        fs.unlinkSync(path.resolve(__dirname, "..", "..", "public", "images", product.img))
        fs.writeFileSync(path.resolve(__dirname, "..", "data", "products.json"), JSON.stringify(productFilter, null, 3), "utf-8");
        return res.redirect("/");
    }
}