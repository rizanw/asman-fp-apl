// "use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let pass = bcrypt.hashSync("password", 10);
    return queryInterface.bulkInsert("users", [
      {
        name: "Super Admin",
        username: "super_admin",
        role: "super_admin",
        password: pass
      },
      {
        name: "User Tracktor",
        username: "tracktor",
        role: "company",
        password: pass
      },
      {
        name: "User PLN",
        username: "pln",
        role: "company",
        password: pass
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
