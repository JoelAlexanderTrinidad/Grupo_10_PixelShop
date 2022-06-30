"use strict";
const gender = [];

const max = 12;
const min = 1;

for (let index = 1; index < 16; index++) {
    gender.push({
      genderId: Math.floor(Math.random() * (max-min + 1)) + min,
      productId: index
    })  
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Product_genders", gender, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Product_genders", null, {});
  },
};