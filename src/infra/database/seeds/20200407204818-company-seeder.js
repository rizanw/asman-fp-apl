"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("companies", [
      {
        name: "Company",
        email: "company@email.com",
        tel: "087703402012",
        address: "Jl. Merdeka",
        latitude: 0,
        longitude: 0
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("companies", null, {});
  }
};
