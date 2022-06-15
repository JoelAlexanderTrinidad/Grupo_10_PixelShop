const products = require('../data/products.json');
const path = require('path');
const fs = require('fs');
const genders =  require('../data/genders.json');

module.exports={
    productDetail:(req,res)=>{
        const {id} = req.params;
        const product = products.find(product => product.id === +id);
        const misGeneros = product.gender;
    
    
        res.render('productDetail',{
            product,
            misGeneros,
            genders,
            products,
        })
    },
    productCart:(req,res)=>{
        res.render('productCart', {
            products
        })
    },
    add:(req,res)=>{

    
        res.render('formCrear',{
            genders
        })
       

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
    edit : (req,res) => {
        const product = products.find(product => product.id === +req.params.id);
       
            res.cookie("userPixelShop", req.session.userLogin,{maxAge: 1000*60*10})
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