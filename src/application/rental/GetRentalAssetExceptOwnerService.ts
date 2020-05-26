import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { IRentalRepository } from "src/domain/repositories/IRentalRepository";

@injectable()
export class GetRentalAssetExceptOwnerService {
  constructor(
    @inject(TYPES.RentalRepository)
    private readonly _rentalRepository: IRentalRepository
  ) {}

  async execute(id: number) {
      try {
        const data = await this._rentalRepository.getAllExcept(id);
        if (!data) {
          return undefined;
        }
        return data;
      } catch (error) {
          return error
      }
  }
}
