import {
  Model,
  DataTypes,
  BelongsToGetAssociationMixin,
  Association,
} from "sequelize";
import sequelize from "../database";
import Rental from "./rental";
import Company from "./company";

export default class RentalTransactionEntity extends Model {
  public id!: number;
  public rental_id!: number;
  public renter_id!: number;
  public duration!: number;
  public issue_date!: Date;
  public return_date!: Date;
  public status!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly rental?: Rental;
  public readonly renter?: Company;

  public getRental!: BelongsToGetAssociationMixin<Rental>;
  public getRenter!: BelongsToGetAssociationMixin<Company>;

  public static associations: {
    rental: Association<RentalTransactionEntity, Rental>;
    renter: Association<RentalTransactionEntity, Company>;
  };
}

RentalTransactionEntity.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    rental_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    renter_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    }, 
    duration: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    issue_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
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
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    sequelize: sequelize,
    tableName: "rental_transactions",
    timestamps: false,
  }
);

RentalTransactionEntity.belongsTo(Rental, {
  foreignKey: "rental_id",
  as: "rental",
  onDelete: "cascade",
});

RentalTransactionEntity.belongsTo(Company, {
  foreignKey: "renter_id",
  as: "renter",
  onDelete: "cascade",
});
