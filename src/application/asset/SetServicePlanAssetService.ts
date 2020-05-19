import { inject, injectable } from "inversify";
import TYPES from "src/types.dependency";

import { IAssetRepository } from "../../domain/repositories/IAssetRepository";
import RegisterAssetRequest from "./RegisterAssetRequest";
import SetServicePlanAssetRequest from "./SetServicePlanAssetRequest";

@injectable()
export class SetServicePlanAssetService {
  constructor(
    @inject(TYPES.AssetRepository)
    private readonly _assetRepository: IAssetRepository
  ) {}

  async execute(request: SetServicePlanAssetRequest) {
    return await this._assetRepository.setServicePlan(request);
  }
}
