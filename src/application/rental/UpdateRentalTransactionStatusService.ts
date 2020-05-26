import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { IRentalTransactionRepository } from "src/domain/repositories/IRentalTransactionRepository";
import { UpdateRentalTransactionStatusRequest } from "./UpdateRentalTransactionStatusRequest";


@injectable()
export class UpdateRentalTransactionStatusService {
    constructor(
        @inject(TYPES.RentalTransactionRepository)
        private readonly _rentalTransactionRepository: IRentalTransactionRepository
    ) {}

    async execute(request: UpdateRentalTransactionStatusRequest) {
        try {
            let transaction = await this._rentalTransactionRepository.findById(request.id)
            transaction.updateStatus(request.status)
            const data = await this._rentalTransactionRepository.update(transaction)
            return data
        } catch (error) {
            return error
        }
    }
}