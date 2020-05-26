import { injectable, inject, multiInject } from "inversify";
import TYPES from "src/types.dependency";
import { IRentalTransactionRepository } from "src/domain/repositories/IRentalTransactionRepository";
import { CreateRentalTransactionRequest } from "./CreateRentalTransactionRequest";
import { IRentalRepository } from "src/domain/repositories/IRentalRepository";



@injectable()
export class CreateRentalTransactionService {
    constructor(
        @inject(TYPES.RentalTransactionRepository)
        private readonly _rentalTransactionRepository: IRentalTransactionRepository,
        @inject(TYPES.RentalRepository)
        private readonly _rentalRepository: IRentalRepository
    ) {}

    async execute(request: CreateRentalTransactionRequest) {
        try {
            const transaction = await this._rentalTransactionRepository.add(request);
            console.log("========trans", transaction)
            if(transaction){
                let rental = await this._rentalRepository.findById(request.rental_id)
                rental.updateAvailability(0)
                await this._rentalRepository.update(rental)
            }
            return transaction;
        } catch (error) {
            return error
        }
    }
}