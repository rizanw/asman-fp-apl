import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { IRentalRepository } from "src/domain/repositories/IRentalRepository";
import { UpdateRentalAvailabilityRequest } from "./UpdateRentalAvailabilityRequest";

@injectable()
export class UpdateRentalAvailabilityService {
    constructor(
        @inject(TYPES.RentalRepository)
        private readonly _rentalRepository: IRentalRepository
    ) {}

    async execute(request: UpdateRentalAvailabilityRequest){
        try {
            let rental = await this._rentalRepository.findById(request.id);
            (await rental).updateStatus(request.status);
            const data = await this._rentalRepository.update(rental);
            return data;
        } catch (error) {
            return error;
        }
    }
}