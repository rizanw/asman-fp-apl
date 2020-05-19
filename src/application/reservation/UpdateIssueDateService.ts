import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { IReservationRepository } from "src/domain/repositories/IReservationRepository"; 
import { UpdateIssueDateRequest } from "./UpdateIssueDateRequest";

@injectable()
export class UpdateIssueDateService {
    constructor(
        @inject(TYPES.ReservationRepository)
        private readonly _reservationRepository: IReservationRepository
    ){}

    async execute(reservation: UpdateIssueDateRequest) {
        const data = await this._reservationRepository.updateIssueDate(reservation);

        return data;
    }
}