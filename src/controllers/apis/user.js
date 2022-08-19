const { User } = require('../../database/models');

module.exports ={
    checkEmail : async (req, res) =>{
        try {
            let user = await User.findOne({
                where : {
                  email : req.body.email
                }
            })
            let response = {
              ok: true,
              data : user ? true : false
            }
            return res.status(200).json(response)
                
            } catch (error) {
                console.log(error)
                return res.status(error.status || 500).json({
                    ok:false,
                    msg: error.message || 'Comuniquese con el administrador'
            })
            }
        },
    deleteUser : async (req,res) => {
      let {id} = req.body
      try {
          const user = await User.findAll({
              where : {
                  id : id
              },
              attributes: ['imagenPerfil']
          })

          const idUser = id
          User.destroy({
              where : {
                  id : id
              }
          })
          if(user[0].imagenPerfil !== 'no-image.png') {
              fs.unlinkSync(path.resolve(__dirname, "..", "..", "public", "images", user[0].imagenPerfil))
          }
          res.cookie("userPixelShop", null, {maxAge : -1})
          req.session.destroy();
       
          return res.status(201).json({
              ok: true,
              id: idUser
          })
         } catch (error) {
           console.log(error)
           return res.status(201).json({
             ok:false,
             msg: error.message
           })
         }
  }
}

