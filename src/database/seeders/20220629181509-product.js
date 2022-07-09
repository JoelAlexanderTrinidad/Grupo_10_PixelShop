"use strict";
const products = require("../../data/products.json")

const product = products.map(producto => {
  return {
    ...producto,
    createdAt : new Date(),
    updatedAt: new Date(),
  }
})

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", product, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};