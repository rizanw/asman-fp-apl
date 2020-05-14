"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("growth_types", [
      {
        name: "Depression",
        color: "#6D776D",
      },
      {
        name: "Growth",
        color: "#69CE5A",
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("growth_types", null, {});
  },
};
