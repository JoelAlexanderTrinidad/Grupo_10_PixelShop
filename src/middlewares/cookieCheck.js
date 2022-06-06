module.exports = (req,res,next) => {

    if(req.cookies.userPixelShop){
        req.session.userLogin = req.cookies.userPixelShop
    }
    next()
}