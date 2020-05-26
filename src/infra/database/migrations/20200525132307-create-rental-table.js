'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    return queryInterface.createTable("rentals", {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true
      },
      asset_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNullL: false,
        references: {
          model: {
            tableName: "assets",
          },
          key: "id",
        },
        onDelete: "cascade",
      },
      owner_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references:{
          model: {
            tableName: "companies",
          },
          key: "id",
        },
        onDelete: "cascade",
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      availability: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1,
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

    return queryInterface.dropTable("rentals")
  }
};
