const products = require('../data/products.json');
const path = require('path');
const fs = require('fs');
const gender =  require('../data/gender.json');

module.exports={
    productDetail:(req,res)=>{
        res.render('productDetail')
    },
    productCart:(req,res)=>{
        res.render('productCart')
    },
    formCrear:(req,res)=>{

    
        res.render('formCrear',{
            gender
        })
       

    },
    formEdit:(req,res)=>{
        res.render('formEdit')
    },
    store : (req,res) => {
        const {id, name, price, discount, category, description,  platform, categoryGames} = req.body;

        let lastId = products[products.length -1].id;
        let newProduct = {
            id : +lastId +1,
            name: name.trim(),
            price: +price,
            discount:+discount,
            category,
            description: description.trim(),
            platform,
            categoryGames
        }
        products.push(newProduct);


        return res.send(products)
     
        
    }
}