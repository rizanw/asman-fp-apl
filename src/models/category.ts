import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

export default class Category extends Model {
  public id!: number;
  public company_id!: number;
  public name!: string;
}

Category.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    company_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        len: [2, 50],
      },
    },
  },
  {
    sequelize: sequelize,
    tableName: "categories",
    timestamps: false,
  }
);
