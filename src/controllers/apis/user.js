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
    }
}

