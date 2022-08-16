const db = require("../../database/models");
const order = require("../../database/models/order");

module.exports ={
    list : async (req,res) =>{

    }, 
    addItem : async (req,res) =>{
        let product = await db.Product.findByPk(req.body.id);
        if(req.session.userLogin){
            if(req.session.userLogin.order){

            }else{
                let newOrder = await db.Order.create({
                    userId: req.session.userLogin.id,
                    status : 1,
                    total: 0
                })
                await db.Cart.create({
                    userId: newOrder.userId,
                    productId: product.id,
                    quantity: 1,
                    orderId: newOrder.id
                })

                let order = await Order.findAll({
                    where:{
                        userId:usuario.id,
                        status:1
                    },
                    include: [{
                       associaton: 'carts',
                       include:[
                        {
                            associaton : 'product'
                        }
                       ]
                    }]
                  })

                req.session.userLogin.order = order
            }
            return res.send(201).json({
                ok: true,
                carts: order.carts
            })
        }
    }, 
    removeItem : async (req,res) =>{

    }, 
    removeAll : async (req,res) =>{

    }, 
}