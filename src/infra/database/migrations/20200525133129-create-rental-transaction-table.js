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
          tableName: "companies"
        },
        key: "id"
      },
      onDelete: 'cascade',
    }, 
    duration: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1,
    },
    issue_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    return_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    status: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
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
