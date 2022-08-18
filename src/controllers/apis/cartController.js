const db = require("../../database/models");
const getOrder = async (id) => {
    try {
      let order = await db.Order.findOne({
        where: {
          userId: id,
          status: 1,
        },
        include: [
          {
            association: "carts",
            attributes: ["id", "quantity"],
            include: [
              {
                association: "product",
                attributes: ["id", "img","name", "price", "discount"],
              },
            ],
          },
        ],
      });
      return order;
    } catch (error) {
      console.log(error);
    }
  };
module.exports ={
    list : async (req,res) =>{
        if(req.session.userLogin?.order){
            return res.status(200).json({
                ok: true,
                carts: req.session.userLogin.order.carts,
                order:  req.session.userLogin.order.id,
            })
        }else{
            return res.status(200).json({
                ok: false,
                order:  null,
                carts: [],
            })
            }
    }, 
    addItem : async (req,res) =>{
        let product = await db.Product.findByPk(req.body.id);
        if(req.session.userLogin){
            if(req.session.userLogin.order){
              let item = req.session.userLogin.order.carts.find(
                (cart)=> cart.product.id == product.id);
                if(item){
                  await db.Cart.update({
                    quantity : item.quantity + 1,
                  },
                  {where: {id : item.id}
                })
                }else{
                  await db.Cart.create({
                    userId: req.session.userLogin.order.userId,
                    productId: product.id, 
                    quantity: 1,
                    orderId: req.session.userLogin.order.id
                  });
                }
              }else{
                let newOrder = await db.Order.create({
                    userId: req.session.userLogin.id,
                    status : 1,
                    total: 0
                });
                await db.Cart.create({
                    userId: newOrder.userId,
                    productId: product.id,
                    quantity: 1,
                    orderId: newOrder.id
                });                
            }
            let order = await getOrder(req.session.userLogin.id)
            req.session.userLogin.order = order
            return res.status(201).json({
                ok: true,
                order: order.id,
                carts: order.carts,
            })
        }
    }, 
    removeItem : async (req,res) =>{

    }, 
    removeAll : async (req,res) =>{

    }, 
}