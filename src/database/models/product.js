'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       
      Product.belongsToMany(models.Gender,{
        as: 'genders',
        through: 'product_gender', // hace referencia a la tabla no a un modelo
        foreignKey: 'productId',
        otherKey: 'genderId'
    }),

      Product.belongsToMany(models.User,{
        as: 'users',
        through: 'order', // hace referencia a la tabla no a un modelo
        foreignKey: 'productId',
        otherKey: 'userId'
    })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    discount: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    img: DataTypes.STRING,
    ranking: DataTypes.INTEGER,
    genres: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};