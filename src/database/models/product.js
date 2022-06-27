module.exports = (sequelize, datatypes) => {
    let alias = "Product";
    let cols = {
        id: {
            type : datatypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        name : {
            type : datatypes.STRING(45),
            allowNull : false,
        },
        price : {
            type : datatypes.INTEGER,
            allowNull : false,
        },
        discount : {
            type : datatypes.INTEGER,
            allowNull : false,
        },
        description : {
            type : datatypes.TEXT,
            allowNull : false
        },
        img : {
            type : datatypes.STRING(100),
        }
    }
    let config = {
        tableName : "products",
        timestamps : true,
        underscore : true
    }
    const Product = sequelize.define(alias, cols, config);
/* 
    Product.associate = function(modelos) {
        Product.belongsToMany(modelos.User,{
            as: 'users',
            through: 'orders',
            foreignKey: 'products_id',
            otherKey: 'users_id',
            timestamps: false
        })
    } */

    return Product
}