import { injectable } from "inversify";

import { IReservationRepository } from "src/domain/repositories/IReservationRepository";
import { ReservationMapper } from "../mappers/ReservationMapper";
import Reservation from "src/domain/models/Reservation";
import ReservationEntity from "../entities/reservation";

@injectable()
export class ReservationRepository implements IReservationRepository {
    private readonly _dataMapper: ReservationMapper;

    constructor(dataMapper: ReservationMapper){
        this._dataMapper = dataMapper;
    }

    async getAll(): Promise<Reservation> {
        const dataEntity = await ReservationEntity.findAll();

        if(!dataEntity) {
            throw new Error("data not found.");
        }

        return dataEntity.map(data => this._dataMapper.get(data));
    }
}