module.exports={
    productDetail:(req,res)=>{
        res.render('productDetail')
    },
    productCart:(req,res)=>{
        res.render('productCart')
    },
    formCrear:(req,res)=>{
        res.render('formCrear')
    },
    formEdit:(req,res)=>{
        res.render('formEdit')
    },
    store : (req,res) => {
        const {id, name, price, discount, category, description, img, platform, categoryGames} = req.body
        return res.send(req.body)
    }
}