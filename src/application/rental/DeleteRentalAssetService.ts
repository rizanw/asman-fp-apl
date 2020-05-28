import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { IRentalRepository } from "src/domain/repositories/IRentalRepository";
import { DeleteRentalAssetRequest } from "./DeleteRentalAssetRequest";



@injectable()
export class DeleteRentalAssetService {
    constructor(
        @inject(TYPES.RentalRepository)
        private readonly _rentalRepository: IRentalRepository
    ) {}

    async execute(request: DeleteRentalAssetRequest) {
        try {
            let rental = await this._rentalRepository.findById(request.id)
            if(rental.isAvailable()){
                return await this._rentalRepository.delete(rental)
            }
            return "asset is in transaction"
        } catch (error) {
            return error
        }
    }
}