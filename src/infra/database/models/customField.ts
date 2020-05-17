import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

export default class CustomField extends Model {
  public id!: number;
  public company_id!: number;
  public name!: string;
  public type!: number;
  public options!: Object;
}

CustomField.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    company_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isAlpha: true,
        len: [3, 50]
      }
    },
    type: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    options: {
      type: DataTypes.JSONB
    }
  },
  {
    sequelize: sequelize,
    tableName: "custom_fields",
    timestamps: false
  }
);
