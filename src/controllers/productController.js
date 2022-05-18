const products = require('../data/products.json');
const path = require('path');
const fs = require('fs');
const gender =  require('../data/gender.json');
const { search } = require('../routes/product');

module.exports={
    productDetail:(req,res)=>{
        const {id} = req.params;
        const product = products.find(product => product.id === +id);

        res.render('productDetail',{
            product,
            gender,
        })
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
        const {name, price, discount, category, description, gender,requeriment} = req.body;

        let lastId = products[products.length -1].id;
        let newProduct = {
            id : +lastId +1,
            name: name.trim(),
            price: +price,
            discount:+discount,
            category,
            description: description.trim(),
            img: req.file ? req.file.filename : 'default-image.jpg',
            gender,
            requeriment
        };
        products.push(newProduct);

        fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'products.json'),JSON.stringify(products,null, 3),'utf-8');

        return res.redirect('/');        
    },
    search : (req,res) => {
        const {keyword} = req.query;
        const searchProduct = products.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()));

        return res.render("result", {
            products : searchProduct, keyword
        })
    }
}