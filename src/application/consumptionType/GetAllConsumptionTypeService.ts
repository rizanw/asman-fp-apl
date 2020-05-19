import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { IConsumptionTypeRepository } from '../../domain/repositories/IConsumptionTypeRepository';

@injectable()
export class GetAllConsumptionTypeService {
  constructor(
    @inject(TYPES.ConsumptionTypeRepository)
    private readonly _consumptionTypeRepository: IConsumptionTypeRepository
  ) {}

  async execute() {
    const data = await this._consumptionTypeRepository.getAll()

    if (!data) {
      return undefined;
    }

    return data;
  }
}
