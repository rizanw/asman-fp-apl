"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("types", [
      {
        name: "Production",
        color: "#FB5A5A",
      },
      {
        name: "Supporting",
        color: "#8A44C9",
      },
      {
        name: "Non-supporting",
        color: "#7EA2B5",
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("types", null, {});
  },
};