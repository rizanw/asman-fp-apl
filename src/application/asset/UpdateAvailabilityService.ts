import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency"; 
import { IAssetRepository } from "src/domain/repositories/IAssetRepository";
import { UpdateAvailabilityRequest } from "./UpdateAvailabilityRequest";

@injectable()
export class UpdateAvailabilityService {
    constructor(
        @inject(TYPES.AssetRepository)
        private readonly _assetRepository: IAssetRepository
    ){}

    async execute(request: UpdateAvailabilityRequest) {
        const data = await this._assetRepository.updateAvailability(request);
        
        return data;
    }
}