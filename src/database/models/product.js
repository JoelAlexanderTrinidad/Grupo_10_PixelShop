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
            type : datatypes.STRING(100),
            allowNull : false,
        },
        price : {
            type : datatypes.DECIMAL(10,0),
            allowNull : false,
        },
        discount : {
            type : datatypes.INTEGER,
            allowNull : false,
        },
        category : {
            type : datatypes.STRING(100),
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
        timestamps : true
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