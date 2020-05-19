import { inject, injectable } from "inversify";
import TYPES from "src/types.dependency";
import { IAssetRepository } from "../../domain/repositories/IAssetRepository";

@injectable()
export class FindAssetByIdService {
  constructor(
    @inject(TYPES.AssetRepository)
    private readonly _assetRepository: IAssetRepository
  ) {}

  async execute(company_id: number, id: number) {
    return await this._assetRepository.findById(company_id, id);
  }
}
