import {
  Model,
  DataTypes,
  BelongsToGetAssociationMixin,
  Association,
} from "sequelize";
import sequelize from "../database";
import User from "./user";
import Asset from "./asset";

export default class Rental extends Model {
  public id!: number;
  public asset_id!: number;
  public owner_id!: number;
  public status!: number;

  public readonly asset?: Asset;
  public readonly owner?: User;

  public getAsset!: BelongsToGetAssociationMixin<Asset>;
  public getUser!: BelongsToGetAssociationMixin<User>;

  public static associations: {
    asset: Association<Rental, Asset>;
    owner: Association<Rental, User>;
  };
}

Rental.init(
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
    owner_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.SMALLINT,
    },
  },
  {
    sequelize: sequelize,
    tableName: "rentals",
    timestamps: false,
  }
);

Rental.belongsTo(Asset, {
  foreignKey: "asset_id",
  as: "asset",
  onDelete: "cascade",
});

Rental.belongsTo(User, {
  foreignKey: "owner_id",
  as: "owner",
  onDelete: "cascade",
});
