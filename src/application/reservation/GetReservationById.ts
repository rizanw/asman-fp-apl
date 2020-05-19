import { injectable, inject, id } from "inversify";
import TYPES from "src/types.dependency";
import { IReservationRepository } from "../../domain/repositories/IReservationRepository";

@injectable()
export class GetReservationById {
    constructor(
        @inject(TYPES.ReservationRepository)
        private readonly _reservationRepository: IReservationRepository
    ){}

    async execute(id: number) {
        const data = await this._reservationRepository.getById(id)

        if (!data) {
            return undefined;
        }

        return data;
    }
}