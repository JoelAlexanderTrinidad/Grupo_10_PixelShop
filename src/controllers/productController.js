const products = require('../data/products.json');
const path = require('path');
const fs = require('fs');

module.exports={
    productDetail:(req,res)=>{
        res.render('productDetail')
    },
    productCart:(req,res)=>{
        res.render('productCart')
    },
    formCrear:(req,res)=>{
        const categoryGames = products.filter(category=> category === category.categoryGames)


        return res.send(categoryGames)
        res.render('formCrear',{
            categoryGames
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