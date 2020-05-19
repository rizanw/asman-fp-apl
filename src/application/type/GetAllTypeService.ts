import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { ITypeRepository } from "../../domain/repositories/ITypeRepository";

@injectable()
export class GetAllTypeService {
  constructor(
    @inject(TYPES.TypeRepository)
    private readonly _typeRepository: ITypeRepository
  ) {}

  async execute() {
    const data = await this._typeRepository.getAll();

    if (!data) {
      return undefined;
    }

    return data;
  }
}
