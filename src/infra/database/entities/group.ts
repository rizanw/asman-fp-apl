import {
  Model,
  DataTypes,
  BelongsToGetAssociationMixin,
  Association
} from "sequelize";
import sequelize from "../database";
import Company from "./company";

export default class Group extends Model {
  public id!: number;
  public company_id!: number;
  public parent_id!: number;
  public name!: string;
  public tel!: string;
  public address!: string;
  public latitude!: number;
  public longitude!: number;
  public level!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly company?: Company;
  public readonly parent?: Group;

  public getCompany!: BelongsToGetAssociationMixin<Company>;
  public getParent!: BelongsToGetAssociationMixin<Group>;

  public static associations: {
    company: Association<Company, Group>;
    parent: Association<Group, Group>;
  };
}

Group.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    company_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    parent_id: {
      type: DataTypes.BIGINT.UNSIGNED
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
      type: DataTypes.SMALLINT
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize: sequelize,
    tableName: "groups"
  }
);

Company.hasMany(Group, {
  foreignKey: "company_id",
  as: "groups"
});

Group.belongsTo(Company, {
  foreignKey: "company_id",
  as: "company",
  onDelete: 'cascade'
});

Group.belongsTo(Group, {
  foreignKey: "parent_id",
  as: "parent",
  onDelete: 'cascade'
});
