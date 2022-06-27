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
        createdAt : "created_at",
        updateAt : "update_at",
        deleteAt : "deleted_at"

    }
    const product = sequelize.define(alias, cols, config);

    return product
}