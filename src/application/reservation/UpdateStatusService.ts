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

    async execute(request: UpdateStatusRequest) {

        const reservation = await this._reservationRepository.getById(request.id)
        const data = await this._reservationRepository.updateStatus(reservation, request);

        return data;
    }
}