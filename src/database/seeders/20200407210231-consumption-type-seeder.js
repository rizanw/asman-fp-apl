"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("consumption_types", [
      {
        name: "Low Cost",
        color: "#BF2365",
      },
      {
        name: "Medium Cost",
        color: "#2D44B9",
      },
      {
        name: "High Cost",
        color: "#26B87C",
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("consumption_types", null, {});
  },
};
