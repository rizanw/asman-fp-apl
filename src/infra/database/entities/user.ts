import {
  Model,
  DataTypes,
  BelongsToGetAssociationMixin,
  Association,
} from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../database";
import Company from "./company";

export const Role = {
  super_admin: "super_admin",
  company: "company",
};

export default class User extends Model {
  public id!: number;
  public company_id!: number;
  public name!: string;
  public username!: string;
  public role!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly company?: Company;

  public getCompany!: BelongsToGetAssociationMixin<Company>;

  public static associations: {
    company: Association<User, Company>;
  };

  public async verifyPassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    company_id: {
      type: DataTypes.BIGINT.UNSIGNED,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: "users",
  }
);

User.prototype.toJSON = function () {
  let values: { [key: string]: string } = Object.assign({}, this.get());

  delete values.password;
  return values;
};

Company.hasMany(User, {
  foreignKey: "company_id",
  as: "users",
});

User.belongsTo(Company, {
  foreignKey: "company_id",
  as: "company",
  onDelete: "cascade",
});
