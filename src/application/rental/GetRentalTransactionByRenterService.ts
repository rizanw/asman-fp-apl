import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { IRentalTransactionRepository } from "src/domain/repositories/IRentalTransactionRepository";

@injectable()
export class GetRentalTransactionByRenterService {
  constructor(
    @inject(TYPES.RentalTransactionRepository)
    private readonly _rentalTransactionRepository: IRentalTransactionRepository
  ) {}

  async execute(id: number) {
      try {
        const data = await this._rentalTransactionRepository.getByRenter(id);
        if (!data) {
          return undefined;
        }
        return data;
        
      } catch (error) {
          return error
      }
  }
}
