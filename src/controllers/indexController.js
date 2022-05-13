const products = require("../data/products.json");

module.exports={
    index:(req,res)=> {
        const productfilter = products.filter(product => product.id === 1)
        return res.send(productfilter)
        return res.render('index', {
            products
        })
    }
}

