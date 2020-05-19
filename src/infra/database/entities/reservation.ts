import {
  Model,
  DataTypes,
  BelongsToGetAssociationMixin,
  Association,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyCreateAssociationMixin,
} from "sequelize";
import sequelize from "../database";
import User from "./user";
import Asset from "./asset";

export default class Reservation extends Model {
  public id!: number;
  public asset_id!: number;
  public borrower_id!: number;
  public admin_id!: number;
  public issue_date!: Date;
  public return_date!: Date;
  public status!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly asset?: Asset;
  public readonly user?: User;

  public getAsset!: BelongsToGetAssociationMixin<Asset>;
  public getUser!: BelongsToGetAssociationMixin<User>;

  public static associations: {
      asset: Association<Reservation, Asset>;
      user: Association<Reservation, User>;
  }
}

Reservation.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    asset_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    borrower_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    admin_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    issue_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate: true
      }
    },
    return_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate: true
      }
    },
    status: {
      type: DataTypes.STRING
    },
  },
  {
    sequelize: sequelize,
    tableName: "reservations",
  }
);

Reservation.belongsTo(Asset, {
    foreignKey: "asset_id",
    as: "asset",
    onDelete: 'cascade'
});

Reservation.belongsTo(User, {
    foreignKey: "borrower_id",
    as: "user",
    onDelete: 'cascade'
});

Reservation.belongsTo(User, {
    foreignKey: "admin_id",
    as: "user",
    onDelete: 'cascade'
});


