"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("users", {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      company_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        references: {
          model: {
            tableName: "companies"
          },
          key: "id"
        },
        onDelete: 'cascade',
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  }
};
