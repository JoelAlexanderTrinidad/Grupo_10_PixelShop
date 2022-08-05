module.exports = (req,res,next) => {
    if(req.session.userLogin 
        && req.session.userLogin.rolId == 2 || req.session.userLogin 
        && req.session.userLogin.rolId == 3){
            next()
        }else{
            res.redirect('/')
        }
}