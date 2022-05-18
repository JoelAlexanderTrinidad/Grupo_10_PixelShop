const products = require('../data/products.json');
const path = require('path');
const fs = require('fs');
const gender =  require('../data/gender.json');

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
        const {id} = req.params;
        const product = products.find(product=>product.id === +id)

        res.render('formEdit',{
            product,
            gender, 
        })
    },
    update: (req,res)=>{
        const {id}=req.params;
        const {name, price, category, discount, gender, description, requeriment}= req.body;
       
        let productsModify =  products.map(product =>{
             if(product.id === +id){
                 let productModify={
                ...product,
                name: name,
                price: +price,
                discount:+discount,
                category,
                description: description,
                img: req.file ? req.file.filename : product.img,
                gender,
                requeriment
                 }
             if(req.file){
                if(fs.existsSync(path.resolve(__dirname,'..','public','images',product.img)) && product.img !== "noimage.jpeg"){
                    fs.unlinkSync(path.resolve(__dirname,'..','public','images',product.img))
                }
            }
                return productModify
             }
            return product     
    
        })
        fs.writeFileSync(path.resolve(__dirname, '..', 'data', 'products.json'),JSON.stringify(productsModify, null, 3), 'utf8')

        return res.redirect('/')
    },    
    store: (req,res) => {
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
    },
    edith : (req,res) => {
        const {id} = req.params;
        const product = product.find(product => product.id === +id);

        return res.render("formEdit", {product, gender});
    }
}