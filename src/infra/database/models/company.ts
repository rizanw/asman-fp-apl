import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyCreateAssociationMixin,
  Association
} from "sequelize";
import sequelize from "../database";
import Group from "./group";
import User from "./user";

export default class Company extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public tel!: string;
  public address!: string;
  public latitude!: number;
  public longitude!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly groups?: Group[];
  public readonly users?: User[];

  public getGroups!: HasManyGetAssociationsMixin<Group>;
  public addGroup!: HasManyAddAssociationMixin<Group, number>;
  public createGroup!: HasManyCreateAssociationMixin<Group>;

  public getUsers!: HasManyGetAssociationsMixin<User>;
  public addUser!: HasManyAddAssociationMixin<User, number>;
  public createUser!: HasManyCreateAssociationMixin<User>;

  public static associations: {
    groups: Association<Company, Group>;
    users: Association<Company, User>;
  };
}

Company.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isEmail: true,
        len: [6, 255]
      }
    },
    tel: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isNumeric: true,
        len: [9, 15]
      }
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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize: sequelize,
    tableName: "companies"
  }
);
