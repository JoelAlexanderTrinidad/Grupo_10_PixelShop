'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       
      User.belongsToMany(models.Product,{
        as: 'products',
        through: 'order', // hace referencia a la tabla no a un modelo
        foreignKey: 'userId',
        otherKey: 'productId'
    })
    }
  }
  User.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    tel: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    terminos: DataTypes.STRING,
    privacidad: DataTypes.STRING,
    imagenPerfil: DataTypes.STRING,
    rolId: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    genero: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};