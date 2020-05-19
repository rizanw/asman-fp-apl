import { inject, injectable } from "inversify";
import TYPES from "src/types.dependency";
import { IAssetRepository } from "../../domain/repositories/IAssetRepository";

@injectable()
export class GetAssetByAvailabilityService {
  constructor(
    @inject(TYPES.AssetRepository)
    private readonly _assetRepository: IAssetRepository
  ) {}

  async execute() {
    return await this._assetRepository.getByAvailability();
  }
}
