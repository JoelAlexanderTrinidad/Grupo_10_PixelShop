"use strict";
const users = require("../../data/users.json")

const user = users.map(usuario => {
  return {
    ...usuario,
    createdAt : new Date(),
    updatedAt: new Date(),
  }
})

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", user, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};