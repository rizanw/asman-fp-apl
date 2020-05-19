import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { IGrowthTypeRepository } from "../../domain/repositories/IGrowthTypeRepository";

@injectable()
export class GetAllGrowthTypeService {
  constructor(
    @inject(TYPES.GrowthTypeRepository)
    private readonly _growthTypeRepository: IGrowthTypeRepository
  ) {}

  async execute() {
    const data = await this._growthTypeRepository.getAll();

    if (!data) {
      return undefined;
    }

    return data;
  }
}
