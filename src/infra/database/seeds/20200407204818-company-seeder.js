"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("companies", [
      {
        name: "Tracktor",
        email: "Tracktor@email.com",
        tel: "087703402012",
        address: "Jl. Merdeka",
        latitude: 0,
        longitude: 0
      },
      {
        name: "PLN",
        email: "pln@pln.com",
        tel: "087702402012",
        address: "Jl. Merdeka",
        latitude: 2,
        longitude: 1
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("companies", null, {});
  }
};
