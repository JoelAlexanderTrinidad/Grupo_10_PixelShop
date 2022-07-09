"use strict";
const genders = require("../../data/genders.json")

const gender = genders.map(genero => {
  return {
    name : genero.name,
    createdAt : new Date(),
    updatedAt: new Date(),
  }
})

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Genders", gender, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Genders", null, {});
  },
};