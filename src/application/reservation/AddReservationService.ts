import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { IReservationRepository } from "src/domain/repositories/IReservationRepository";
import { AddReservationRequest } from "./AddReservationRequest";

@injectable()
export class AddReservationService {
  constructor(
    @inject(TYPES.ReservationRepository)
    private readonly _reservationRepository: IReservationRepository
  ) {}

  async execute(reservation: AddReservationRequest) {
    const rev = await this._reservationRepository.getByAsset(
      reservation.asset_id
    );
    var avail = false;
    rev.forEach((element) => {
      if (!element.isReserved()) {
          avail = true;  
      }
    });
    
    if(avail){
        const data = await this._reservationRepository.add(reservation);
        return data;
    }else{
        throw new Error("Asset not available!")
        
    }
  }
}
