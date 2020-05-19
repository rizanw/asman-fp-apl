import { inject, injectable } from "inversify";
import TYPES from "src/types.dependency";
import { ICompanyRepository } from "src/domain/repositories/ICompanyRepository";
import { RegisterCompanyRequest } from "./RegisterCompanyRequest";
import { IAssetRepository } from "../../domain/repositories/IAssetRepository";
import RegisterAssetRequest from "./RegisterAssetRequest";

@injectable()
export class EditAssetService {
  constructor(
    @inject(TYPES.AssetRepository)
    private readonly _assetRepository: IAssetRepository
  ) {}

  async execute(id: number, request: RegisterAssetRequest) {
    return await this._assetRepository.editAsset(id, request);
  }
}
