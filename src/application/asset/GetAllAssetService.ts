import { inject, injectable } from "inversify";
import TYPES from "src/types.dependency";
import { IAssetRepository } from "../../domain/repositories/IAssetRepository";

@injectable()
export class GetAllAssetService {
  constructor(
    @inject(TYPES.AssetRepository)
    private readonly _assetRepository: IAssetRepository
  ) {}

  async execute(id: number) {
    return await this._assetRepository.getAll(id);
  }
}
