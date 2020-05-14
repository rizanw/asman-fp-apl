import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

export default class ConsumptionType extends Model {
  public id!: number;
  public name!: string;
  public color!: string;
}

ConsumptionType.init(
  {
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
      validate: {
        notNull: true,
        notEmpty: true,
        isAlpha: true,
        len: [3, 50],
      },
    },
    color: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    tableName: "consumption_types",
    timestamps: false,
  }
);
