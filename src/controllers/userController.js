module.exports={
    login:(req,res)=>res.render('login'),
    register:(req,res)=>res.render('register'),
    
    profile: (req,res) => {
        return res.render ("profile")

        const users = JSON.parse(fs.readFileSync("./data/users.json","utf-8"));
        const user = users.find(user => user.id === req.session.userLogin.id);
        return res.render("profile",{
            user
        })
    },
    
    logout: (req,res) => {
        req.session.destroy();
        res.cookie("PixelShop", null, {maxAge : -1})
        return res.redirect("/")
    }
}

