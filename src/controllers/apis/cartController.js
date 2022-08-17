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
                attributes: ["id", "name", "price", "discount"],
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