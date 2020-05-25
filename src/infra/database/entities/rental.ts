import {
  Model,
  DataTypes,
  BelongsToGetAssociationMixin,
  Association,
} from "sequelize";
import sequelize from "../database";
import User from "./user";
import Asset from "./asset";

export default class RentalEntitiy extends Model {
  public id!: number;
  public asset_id!: number;
  public owner_id!: number;
  public status!: number;

  public readonly asset?: Asset;
  public readonly owner?: User;

  public getAsset!: BelongsToGetAssociationMixin<Asset>;
  public getUser!: BelongsToGetAssociationMixin<User>;

  public static associations: {
    asset: Association<RentalEntitiy, Asset>;
    owner: Association<RentalEntitiy, User>;
  };
}

RentalEntitiy.init(
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

RentalEntitiy.belongsTo(Asset, {
  foreignKey: "asset_id",
  as: "asset",
  onDelete: "cascade",
});

RentalEntitiy.belongsTo(User, {
  foreignKey: "owner_id",
  as: "owner",
  onDelete: "cascade",
});
