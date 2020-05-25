'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

   return queryInterface.createTable("rental_transactions", {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    rental_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      references: {
        model: {
          tableName: "rentals"
        },
        key: "id"
      },
      onDelete: 'cascade',
    },
    renter_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      references: {
        model: {
          tableName: "users"
        },
        key: "id"
      },
      onDelete: 'cascade',
    }, 
    issue_date: {
      type: DataTypes.DATEONLY
    },
    return_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  })
  },

  down: (queryInterface, DataTypes) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

   return queryInterface.dropTable("rental_transactions")
  }
};
