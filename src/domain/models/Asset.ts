import Type from "src/domain/models/Type";
import GrowthType from "src/domain/models/GrowthType";
import Class from "src/domain/models/Class";
import ConsumptionType from "src/domain/models/ConsumptionType";
import Category from "src/domain/models/Category";
import Service from "src/domain/models/Service";
import Group from "src/domain/models/Group";

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
    public readonly group: Group | null,
    public readonly type: Type | null,
    public readonly growth_type: GrowthType | null,
    public readonly kelas: Class | null,
    public readonly consumption_type: ConsumptionType | null,
    public readonly category: Category | null,
    public readonly services: Service[],
    public readonly custom_fields: Object | null,
    public readonly availability: number
   ) {}
}
