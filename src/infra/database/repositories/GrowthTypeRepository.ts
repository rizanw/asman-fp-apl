import { injectable } from "inversify";
import GrowthTypeEntity from "../entities/growthType";
import { IGrowthTypeRepository } from "../../../domain/repositories/IGrowthTypeRepository";
import { GrowthTypeMapper } from "../mappers/GrowthTypeMapper";
import GrowthType from "../../../domain/models/GrowthType";

@injectable()
export class GrowthTypeRepository implements IGrowthTypeRepository {
  private readonly _dataMapper: GrowthTypeMapper;

  constructor(dataMapper: GrowthTypeMapper) {
    this._dataMapper = dataMapper;
  }

  async getAll(): Promise<GrowthType[]> {
    const dataEntity = await GrowthTypeEntity.findAll();

    if (!dataEntity) {
      throw new Error("User not found.");
    }

    return dataEntity.map((data) => this._dataMapper.get(data));
  }
}
