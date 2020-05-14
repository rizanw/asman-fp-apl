"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("assets", {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      group_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: {
            tableName: "groups"
          },
          key: "id"
        },
        onDelete: 'cascade',
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      type_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: {
            tableName: "types"
          },
          key: "id"
        },
        onDelete: 'cascade',
      },
      growth_type_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        references: {
          model: {
            tableName: "growth_types"
          },
          key: "id"
        },
        onDelete: 'cascade',
      },
      growth_rate: {
        type: DataTypes.FLOAT
      },
      class_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: {
            tableName: "classes"
          },
          key: "id"
        },
        onDelete: 'cascade',
      },
      consumption_type_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: {
            tableName: "consumption_types"
          },
          key: "id"
        },
        onDelete: 'cascade',
      },
      category_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: {
            tableName: "categories"
          },
          key: "id"
        },
        onDelete: 'cascade',
      },
      manufacturer: {
        type: DataTypes.STRING
      },
      capacity: {
        type: DataTypes.DOUBLE
      },
      capacity_unit: {
        type: DataTypes.STRING(20)
      },
      serial_number: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.DOUBLE
      },
      manufacture_date: {
        type: DataTypes.DATEONLY
      },
      installation_date: {
        type: DataTypes.DATEONLY
      },
      custom_fields: {
        type: DataTypes.JSONB
      },
      service_plan: {
        type: DataTypes.JSONB
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("assets");
  }
};
