import Type from "./Type";
import GrowthType from "./GrowthType";
import Class from "./Class";
import ConsumptionType from "../../infra/database/entities/consumptionType";
import Category from "../../infra/database/entities/category";
import Service from "../../infra/database/entities/service";
import Group from "./Group";
export default class Asset {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly growth_rate: number,
    public readonly manufacturer: string,
    public readonly capacity: number,
    public readonly capacity_unit: string,
    public readonly serial_number: string,
    public readonly price: number,
    public readonly manufacture_date: Date,
    public readonly installation_date: Date,
    public readonly service_plan: Object,
    public readonly group: Group,
    public readonly type: Type,
    public readonly growth_type: GrowthType,
    public readonly kelas: Class,
    public readonly consumption_type: ConsumptionType,
    public readonly category: Category,
    public readonly services: Service,
    public readonly custom_fields: Object | null
  ) {}
}
