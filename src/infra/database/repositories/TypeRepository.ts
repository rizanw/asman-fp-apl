import { injectable } from "inversify";
import { IConsumptionTypeRepository } from "../../../domain/repositories/IConsumptionTypeRepository";
import { ConsumptionTypeMapper } from "../mappers/ConsumptionTypesMapper";
import ConsumptionType from "../../../domain/models/ConsumptionType";
import TypeEntity from "../entities/type";
import { ITypeRepository } from "../../../domain/repositories/ITypeRepository";
import { TypeMapper } from "../mappers/TypeMapper";
import Type from "../../../domain/models/Type";

@injectable()
export class TypeRepository implements ITypeRepository {
  private readonly _dataMapper: TypeMapper;

  constructor(dataMapper: TypeMapper) {
    this._dataMapper = dataMapper;
  }

  async getAll(): Promise<Type[]> {
    const dataEntity = await TypeEntity.findAll();

    if (!dataEntity) {
      throw new Error("User not found.");
    }

    return dataEntity.map((data) => this._dataMapper.get(data));
  }
}
