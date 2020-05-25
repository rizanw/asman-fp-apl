import { injectable } from "inversify";
import { IMapper } from "./IMapper";
import Rental from "src/domain/models/Rental";
import RentalEntity from "../entities/rental";

@injectable()
export class RentalMapper implements IMapper<Rental, RentalEntity> {
  get(entity: RentalEntity): Rental {
    const rental = new Rental(
      entity.id,
      entity.asset_id,
      entity.owner_id,
      entity.status
    );

    return rental;
  }
}
