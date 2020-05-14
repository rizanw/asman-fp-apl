"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("groups", [
      {
        company_id: 1,
        name: "Induk",
        tel: "087703402012",
        address: "Jl. Merdeka 2",
        latitude: 0,
        longitude: 0,
        level: 1
      },
      {
        company_id: 1,
        name: "Sub Induk",
        tel: "087703402011",
        address: "Jl. Merdeka 2",
        latitude: 0,
        longitude: 0,
        parent_id: 1,
        level: 2
      },
      {
        company_id: 1,
        name: "Equipment",
        tel: "087703402010",
        address: "Jl. Merdeka 2",
        latitude: 0,
        longitude: 0,
        parent_id: 2,
        level: 3
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("groups", null, {});
  }
};
