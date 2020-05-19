import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { IReservationRepository } from "src/domain/repositories/IReservationRepository";
import { UpdateStatusRequest } from "./UpdateStatusRequest";

@injectable()
export class UpdateStatusService {
    constructor(
        @inject(TYPES.ReservationRepository)
        private readonly _reservationRepository: IReservationRepository
    ){}

    async execute(reservation: UpdateStatusRequest) {
        const data = await this._reservationRepository.updateStatus(reservation);

        return data;
    }
}