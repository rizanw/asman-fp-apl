"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("classes", [
      {
        name: "Critical",
        color: "#982222",
      },
      {
        name: "Important",
        color: "#C89F14",
      },
      {
        name: "Non-important",
        color: "#8B6B5E",
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("classes", null, {});
  },
};
