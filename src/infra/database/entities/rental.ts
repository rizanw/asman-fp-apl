import {
  Model,
  DataTypes,
  BelongsToGetAssociationMixin,
  Association,
} from "sequelize";
import sequelize from "../database";
import Asset from "./asset";
import Company from "./company";

export default class RentalEntitiy extends Model {
  public id!: number;
  public asset_id!: number;
  public owner_id!: number;
  public price!: number;
  public availability!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly asset?: Asset;
  public readonly owner?: Company;

  public getAsset!: BelongsToGetAssociationMixin<Asset>;
  public getOwner!: BelongsToGetAssociationMixin<Company>;

  public static associations: {
    asset: Association<RentalEntitiy, Asset>;
    owner: Association<RentalEntitiy, Company>;
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
    price: {
      type: DataTypes.INTEGER,
    },
    availability: {
      type: DataTypes.SMALLINT,
      defaultValue: 1
    },
  },
  {
    sequelize: sequelize,
    tableName: "rentals",
    timestamps: true,
  }
);

RentalEntitiy.belongsTo(Asset, {
  foreignKey: "asset_id",
  as: "asset",
  onDelete: "cascade",
});

RentalEntitiy.belongsTo(Company, {
  foreignKey: "owner_id",
  as: "owner",
  onDelete: "cascade",
});
