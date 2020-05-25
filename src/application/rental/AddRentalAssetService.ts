import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { IRentalRepository } from "src/domain/repositories/IRentalRepository";
import { AddRentalAssetRequest } from "./AddRentalAssetRequest";


@injectable()
export class AddRentalAssetService {
    constructor(
        @inject(TYPES.RentalRepository)
        private readonly _rentalRepository: IRentalRepository
    ) {}

    async execute(request: AddRentalAssetRequest) {
        try {
            const data = await this._rentalRepository.add(request);
            return data;
        } catch (error) {
            return error;
        }
    }
}