import { injectable } from "inversify";
import { IMapper } from "./IMapper";
import RentalTransaction from "src/domain/models/RentalTransaction";
import RentalTransactionEntity from "../entities/rentalTransaction";
import Rental from "src/domain/models/Rental";
import Company from "src/domain/models/Company";

@injectable()
export class RentalTransactionMapper
  implements IMapper<RentalTransaction, RentalTransactionEntity> {
  get(entity: RentalTransactionEntity): RentalTransaction {
    let rental = null;
    if (entity.rental) {
      rental = new Rental(
        entity.rental.id,
        entity.rental.asset,
        entity.rental.owner,
        entity.rental.price,
        entity.rental.availability
      );
    }

    let renter = null;
    if (entity.renter) {
      renter = new Company(
        entity.renter.id,
        entity.renter.name,
        entity.renter.email,
        entity.renter.tel,
        entity.renter.address,
        entity.renter.latitude,
        entity.renter.longitude
      );
    }

    const rentalTransaction = new RentalTransaction(
      entity.id,
      rental,
      renter,
      entity.duration,
      entity.issue_date,
      entity.return_date,
      entity.status
    );

    return rentalTransaction;
  }
}
