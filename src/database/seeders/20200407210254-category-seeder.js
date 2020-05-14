"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("categories", [
      {
        company_id: 1,
        name: "AC"
      },
      {
        company_id: 1,
        name: "Komputer"
      },
      {
        company_id: 1,
        name: "Meja"
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("categories", null, {});
  }
};
