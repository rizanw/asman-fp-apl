module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("categories", {
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
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("categories");
  }
};
