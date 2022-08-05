"use strict";

const rols = [
  {
    name: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "superAdmin",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Rols", rols, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Rols", null, {});
  },
};