import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { IReservationRepository } from "src/domain/repositories/IReservationRepository";
import { AddReservationRequest } from "./AddReservationRequest";
import { IUserRepository } from "src/domain/repositories/IUserRepository";

@injectable()
export class AddReservationService {
  constructor(
    @inject(TYPES.ReservationRepository)
    private readonly _reservationRepository: IReservationRepository,
    @inject(TYPES.UserRepository)
    private readonly _userRepository: IUserRepository
  ) {}

  async execute(reservation: AddReservationRequest) {
    const user = await this._userRepository.findById(reservation.borrower_id);

    if (user.isBlacklisted()) {
      throw new Error(
        "Your account is blocked to create Reservation. Call Admin for details!"
      );
    }

    const rev = await this._reservationRepository.getByAsset(
      reservation.asset_id
    );
    var avail = true;
    if (rev != []) {
      rev.forEach((element) => {
        if (element.isReserved()) {
          avail = false;
        }
      });
    }

    if (avail) {
      const data = await this._reservationRepository.add(reservation);
      return data;
    } else {
      throw new Error("Asset not available!");
    }
  }
}
