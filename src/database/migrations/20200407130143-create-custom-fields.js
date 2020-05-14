module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("custom_fields", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT.UNSIGNED
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
      },
      type: {
        type: DataTypes.SMALLINT,
        allowNull: false
      },
      options: {
        type: DataTypes.JSONB
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("custom_fields");
  }
};
