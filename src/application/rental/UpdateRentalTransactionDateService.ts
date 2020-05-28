import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { IRentalTransactionRepository } from "src/domain/repositories/IRentalTransactionRepository";
import { UpdateRentalTransactionDateRequest } from "./UpdateRentalTransactionDateRequest";

@injectable()
export class UpdateRentalTransactionDateService {
  constructor(
    @inject(TYPES.RentalTransactionRepository)
    private readonly _rentalTransactionRepository: IRentalTransactionRepository
  ) {}

  async execute(request: UpdateRentalTransactionDateRequest) {
    try {
      let transaction = await this._rentalTransactionRepository.findById(request.id);
      if (transaction.isPending()) {
            transaction.updateIssueDate(request.issue_date);
            const data = await this._rentalTransactionRepository.update(transaction);
            return data
      }
      console.log("==============")
      return "You cant change again laa";
    } catch (error) {
      return error;
    }
  }
}
