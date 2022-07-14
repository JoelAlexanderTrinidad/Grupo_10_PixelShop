'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gender extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Gender.belongsToMany(models.Product,{
        as: 'products',
        through: 'product_gender', // hace referencia a la tabla no a un modelo
        foreignKey: 'genderId',
        otherKey: 'productId'
    })
    }
  }
  Gender.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Gender',
  });
  return Gender;
};