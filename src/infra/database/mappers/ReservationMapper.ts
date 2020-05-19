import { injectable } from "inversify";
import { IMapper } from "./IMapper";
import Reservation from "src/domain/models/Reservation";
import ReservationEntity from "../entities/reservation";

@injectable()
export class ReservationMapper implements IMapper<Reservation, ReservationEntity> {
  get(entity: ReservationEntity): Reservation {
    const consumtionType = new Reservation(
      entity.id,
      entity.asset_id,
      entity.borrower_id,
      entity.admin_id,
      entity.issue_date,
      entity.return_date,
      entity.status
    );

    return consumtionType;
  }
}
