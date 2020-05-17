module.exports = {
    up: (queryInterface, DataTypes) => {
      return queryInterface.createTable("types", {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
        },
        color: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
      });
    },
  
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable("types");
    },
  };