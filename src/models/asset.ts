import {
  Model,
  DataTypes,
  BelongsToGetAssociationMixin,
  Association,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyCreateAssociationMixin
} from "sequelize";
import sequelize from "../database";
import Group from "./group";
import Type from "./type";
import GrowthType from "./growthType";
import Class from "./class";
import ConsumptionType from "./consumptionType";
import Category from "./category";
import Service from "./service";

export interface ServicePlan {
  start_date: Date;
  long: number;
  periodic: number;
}

export default class Asset extends Model {
  public id!: number;
  public group_id!: number;
  public name!: string;
  public type_id!: number;
  public growth_type_id!: number;
  public growth_rate!: number;
  public class_id!: number;
  public consumption_type_id!: number;
  public category_id!: number;
  public manufacturer!: string;
  public capacity!: number;
  public capacity_unit!: string;
  public serial_number!: string;
  public price!: number;
  public manufacture_date!: Date;
  public installation_date!: Date;
  public custom_fields!: Object;
  public service_plan!: ServicePlan;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly group?: Group;
  public readonly type?: Type;
  public readonly growth_type?: GrowthType;
  public readonly class?: Class;
  public readonly consumption_type?: ConsumptionType;
  public readonly category?: Category;
  public readonly services?: Service[];

  public getGroup!: BelongsToGetAssociationMixin<Group>;
  public getType!: BelongsToGetAssociationMixin<Type>;
  public getGrowthType!: BelongsToGetAssociationMixin<GrowthType>;
  public getClass!: BelongsToGetAssociationMixin<Class>;
  public getConsumptionType!: BelongsToGetAssociationMixin<ConsumptionType>;
  public getCategory!: BelongsToGetAssociationMixin<Category>;
  public getServices!: HasManyGetAssociationsMixin<Service>;
  public addService!: HasManyAddAssociationMixin<Service, number>;
  public createService!: HasManyCreateAssociationMixin<Service>;

  public static associations: {
    group: Association<Asset, Group>;
    type: Association<Asset, Type>;
    growth_type: Association<Asset, GrowthType>;
    class: Association<Asset, Class>;
    consumption_type: Association<Asset, ConsumptionType>;
    category: Association<Asset, Category>;
    services: Association<Asset, Service>;
  };
}

Asset.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    group_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        len: [3, 50]
      }
    },
    type_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    growth_type_id: {
      type: DataTypes.BIGINT.UNSIGNED
    },
    growth_rate: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        isDecimal: true
      }
    },
    class_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    consumption_type_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    category_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    manufacturer: {
      type: DataTypes.STRING
    },
    capacity: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      validate: {
        isDecimal: true
      }
    },
    capacity_unit: {
      type: DataTypes.STRING(20),
      allowNull: true,
      validate: {
        len: [1, 20]
      }
    },
    serial_number: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      validate: {
        isDecimal: true
      }
    },
    manufacture_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate: true
      }
    },
    installation_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate: true
      }
    },
    custom_fields: {
      type: DataTypes.JSONB
    },
    service_plan: {
      type: DataTypes.JSONB
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize: sequelize,
    tableName: "assets"
  }
);

Asset.belongsTo(Group, {
  foreignKey: "group_id",
  as: "group",
  onDelete: 'cascade'
});

Asset.belongsTo(Type, {
  foreignKey: "type_id",
  as: "type",
  onDelete: 'cascade'
});

Asset.belongsTo(GrowthType, {
  foreignKey: "growth_type_id",
  as: "growth_type",
  onDelete: 'cascade'
});

Asset.belongsTo(Class, {
  foreignKey: "class_id",
  as: "class",
  onDelete: 'cascade'
});

Asset.belongsTo(ConsumptionType, {
  foreignKey: "consumption_type_id",
  as: "consumption_type",
  onDelete: 'cascade'
});

Asset.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
  onDelete: 'cascade'
});
