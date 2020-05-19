import { injectable } from "inversify";
import { IConsumptionTypeRepository } from "../../../domain/repositories/IConsumptionTypeRepository";
import { ConsumptionTypeMapper } from '../mappers/ConsumptionTypesMapper';
import ConsumptionType from '../../../domain/models/ConsumptionType';
import ConsumptionTypeEntity from '../entities/consumptionType';

@injectable()
export class ConsumptionTypeRepository implements IConsumptionTypeRepository {
  private readonly _dataMapper: ConsumptionTypeMapper;

  constructor(dataMapper: ConsumptionTypeMapper) {
    this._dataMapper = dataMapper;
  }

  async getAll(): Promise<ConsumptionType> {
    const dataEntity = await ConsumptionTypeEntity.findAll();

    if (!dataEntity) {
      throw new Error("User not found.");
    }

    return dataEntity.map(data => this._dataMapper.get(data));
  }

}
