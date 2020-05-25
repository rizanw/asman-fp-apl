import {
  Model,
  DataTypes,
  BelongsToGetAssociationMixin,
  Association,
} from "sequelize";
import sequelize from "../database";
import User from "./user";
import Rental from "./rental";

export default class RentalTransaction extends Model {
  public id!: number;
  public rental_id!: number;
  public renter_id!: number;
  public issue_date!: Date;
  public return_date!: Date;

  public readonly rental?: Rental;
  public readonly renter?: User;

  public getRental!: BelongsToGetAssociationMixin<Rental>;
  public getUser!: BelongsToGetAssociationMixin<User>;

  public static associations: {
    rental: Association<RentalTransaction, Rental>;
    renter: Association<RentalTransaction, User>;
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
    }
  },
  {
    sequelize: sequelize,
    tableName: "rental_transactions",
    timestamps: false,
  }
);

Rental.belongsTo(Rental, {
  foreignKey: "rental_id",
  as: "rental",
  onDelete: "cascade",
});

Rental.belongsTo(User, {
  foreignKey: "renter_id",
  as: "renter",
  onDelete: "cascade",
});
