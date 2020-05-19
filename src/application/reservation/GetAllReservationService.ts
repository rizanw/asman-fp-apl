import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { IReservationRepository } from "../../domain/repositories/IReservationRepository";

@injectable()
export class GetAllReservationService {
    constructor(
        @inject(TYPES.ReservationRepository)
        private readonly _reservationRepository: IReservationRepository
    ){}

    async execute() {
        const data = await this._reservationRepository.getAll()

        if (!data) {
            return undefined;
        }

        return data;
    }
}