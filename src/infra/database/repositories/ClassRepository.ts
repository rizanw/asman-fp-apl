import { injectable } from "inversify";
import { ClassMapper } from "../mappers/ClassMapper";
import ClassEntity from "../entities/class";
import { IClassRepository } from "../../../domain/repositories/IClassRepository";
import Class from "../../../domain/models/Class";

@injectable()
export class ClassRepository implements IClassRepository {
  private readonly _dataMapper: ClassMapper;

  constructor(dataMapper: ClassMapper) {
    this._dataMapper = dataMapper;
  }

  async getAll(): Promise<Class[]> {
    const dataEntity = await ClassEntity.findAll();

    if (!dataEntity) {
      throw new Error("User not found.");
    }

    return dataEntity.map((data) => this._dataMapper.get(data));
  }
}
