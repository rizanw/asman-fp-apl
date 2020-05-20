import { inject, injectable } from "inversify";
import TYPES from "src/types.dependency";
import { IAssetRepository } from "../../domain/repositories/IAssetRepository";
import RegisterAssetRequest from "./RegisterAssetRequest";
import RegisterAssetCSVRequest from "./RegisterAssetCSVRequest";

@injectable()
export class RegisterAssetCSVService {
  constructor(
    @inject(TYPES.AssetRepository)
    private readonly _assetRepository: IAssetRepository
  ) {}

  async execute(request: RegisterAssetCSVRequest) {
    return await this._assetRepository.registerAssetCSV(request);
  }
}
