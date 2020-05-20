import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { IReservationRepository } from "src/domain/repositories/IReservationRepository";
import { UpdateStatusRequest } from "./UpdateStatusRequest";
import { IAssetRepository } from "src/domain/repositories/IAssetRepository";

@injectable()
export class UpdateStatusService {
    constructor(
        @inject(TYPES.ReservationRepository)
        private readonly _reservationRepository: IReservationRepository,
        @inject(TYPES.AssetRepository)
        private readonly _assetRepository: IAssetRepository
    ){}

    async execute(request: UpdateStatusRequest) {
        const reservation = await this._reservationRepository.getById(request.id)
        const data = await this._reservationRepository.updateStatus(reservation, request);
        if (!reservation.isStatusAccepted(request.status)){
          await this._assetRepository.updateAvailability(reservation.asset_id, 1);
        }
        return data;
    }
}