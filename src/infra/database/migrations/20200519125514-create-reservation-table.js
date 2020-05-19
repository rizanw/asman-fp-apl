'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    return queryInterface.createTable("reservations", {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      asset_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        references: {
          model: {
            tableName: "assets"
          },
          key: "id"
        },
        onDelete: 'cascade',
      },
      borrower_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        references: {
          model: {
            tableName: "users"
          },
          key: "id"
        },
        onDelete: 'cascade',
      },
      admin_id: {
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
        type: DataTypes.DATEONLY
      },
      status: {
        type: DataTypes.STRING
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable("reservations");
  }
};
