module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("groups", {
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
        allowNull: false
      },
      parent_id: {
        type: DataTypes.BIGINT.UNSIGNED,
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
        allowNull: false,
        unique: true
      },
      tel: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      level: {
        type: DataTypes.SMALLINT,
        allowNull: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("groups");
  }
};
