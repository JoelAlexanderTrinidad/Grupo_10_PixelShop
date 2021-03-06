"use strict";
const productsDB = require('../../data/products.json');

const product_genders = [];

const products = productsDB.map(({id, genres})=> {
  return {
    id: id,
    genres: JSON.parse( "[" + genres +"]")
  }
} ) 

products.forEach(product => {
    product.genres.forEach(gender => {
      product_genders.push({
          productId : product.id,
          genderId : gender,
          createdAt : new Date(),
          updatedAt: new Date(),
      })
    })
});

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Product_genders", product_genders, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Product_genders", null, {});
  },
};