import {
  Model,
  DataTypes,
  BelongsToGetAssociationMixin,
  Association,
} from "sequelize";
import sequelize from "../database";
import Asset from "./asset";

export default class Service extends Model {
  public id!: number;
  public asset_id!: number;
  public order_detail!: Object;
  public start_date!: Date;
  public end_date!: Date;
  public service_date!: Date;
  public status!: number;

  public static STATUS_RELEASED = 1;
  public static STATUS_PROCESS = 2;
  public static STATUS_COMPLETE = 3;
  public static STATUS_FINISH = 4;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly asset?: Asset;

  public getAsset!: BelongsToGetAssociationMixin<Asset>;

  public static associations: {
    asset: Association<Asset, Service>;
  };
}

Service.init(
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
    },
    order_detail: {
      type: DataTypes.JSONB,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    service_date: {
      type: DataTypes.DATEONLY,
    },
    status: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: "services",
  }
);

Asset.hasMany(Service, {
  foreignKey: "asset_id",
  as: "services",
});

Service.belongsTo(Asset, {
  foreignKey: "asset_id",
  as: "asset",
  onDelete: "cascade",
});
