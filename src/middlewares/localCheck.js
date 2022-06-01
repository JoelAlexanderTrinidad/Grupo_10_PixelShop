module.exports = (req,res,next)=>{
    if(req.session.userLogin){
        req.locals.userLogin =req.session.userLogin
    }
    next();
}