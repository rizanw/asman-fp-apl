import ConsumptionType from "../models/ConsumptionType"

export interface IConsumptionTypeRepository {
  add(user: ConsumptionType): Promise<ConsumptionType>;
  findById(id: number): Promise<ConsumptionType>;
  getAll(): Promise<ConsumptionType[]>;
}
