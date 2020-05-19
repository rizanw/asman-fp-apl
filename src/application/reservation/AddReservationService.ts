import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { IReservationRepository } from "src/domain/repositories/IReservationRepository";
import { ReservationRequest } from "./AddReservationRequest";

@injectable()
export class AddReservationService {
    constructor(
        @inject(TYPES.ReservationRepository)
        private readonly _reservationRepository: IReservationRepository
    ){}

    async execute(reservation: ReservationRequest) {
        const data = await this._reservationRepository.add(reservation);

        return data;
    }
}