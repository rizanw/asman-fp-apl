import { injectable } from "inversify";

import { IReservationRepository } from "src/domain/repositories/IReservationRepository";
import { ReservationMapper } from "../mappers/RentalMapper";
import Reservation from "src/domain/models/Rental";
import ReservationEntity from "../entities/rental";
import { AddReservationRequest } from "src/application/reservation/AddReservationRequest";
import { UpdateStatusRequest } from "src/application/reservation/UpdateStatusRequest";
import { UpdateIssueDateRequest } from "src/application/reservation/UpdateIssueDateRequest"; 
import moment from "moment";

@injectable()
export class ReservationRepository implements IReservationRepository {
  private readonly _dataMapper: ReservationMapper;

  constructor(dataMapper: ReservationMapper) {
    this._dataMapper = dataMapper;
  }

  async getAll(): Promise<Reservation[]> {
    const dataEntity = await ReservationEntity.findAll();

    if (!dataEntity) {
      throw new Error("data not found.");
    }

    return dataEntity.map((data) => this._dataMapper.get(data));
  }

  async getById(id: number): Promise<Reservation> {
    const dataEntity = await ReservationEntity.findOne({
      where: {
        id: id,
      }
    });

    if (!dataEntity) {
      throw new Error("data not found.");
    }

    return this._dataMapper.get(dataEntity);
  }

  async getByBorrower(id: number): Promise<Reservation[]> {
    const dataEntity = await ReservationEntity.findAll<ReservationEntity>({
      where: {
        borrower_id: id,
      },
    });

    if (!dataEntity) {
      throw new Error("data not found.");
    }

    return dataEntity.map((data) => this._dataMapper.get(data));
  }

  async getByAsset(id: number): Promise<Reservation[]> {
    const dataEntity = await ReservationEntity.findAll<ReservationEntity>({
      where: {
        asset_id: id,
      },
    });

    if (!dataEntity) {
      throw new Error("data not found.");
    }

    return dataEntity.map((data) => this._dataMapper.get(data));
  }

  async add(reservation: AddReservationRequest): Promise<Reservation> {
    const dataEntity = await ReservationEntity.create<ReservationEntity>({
      asset_id: reservation.asset_id,
      borrower_id: reservation.borrower_id,
      admin_id: reservation.admin_id,
      issue_date: reservation.issue_date,
      return_date: reservation.return_date,
      status: reservation.status,
    });

    return this._dataMapper.get(dataEntity);
  }

  async updateStatus(reservation: Reservation, request: UpdateStatusRequest): Promise<Reservation> {
    const now = moment(); 
    if(reservation.isStatusReturned(request.status)){
      var dataEntity = await ReservationEntity.update<ReservationEntity>(
        {
          admin_id: request.admin_id,
          return_date: now,
          status: request.status,
        },
        {
          where: {
            id: reservation.id,
          },
        }
      );
    }else{
      var dataEntity = await ReservationEntity.update<ReservationEntity>(
        {
          admin_id: request.admin_id,
          status: request.status,
        },
        {
          where: {
            id: reservation.id,
          },
        }
      );
    }

    return this._dataMapper.get(dataEntity);
  }

  async updateIssueDate(
    reservation: UpdateIssueDateRequest
  ): Promise<Reservation> {
    const dataEntity = await ReservationEntity.update<ReservationEntity>(
      {
        issue_date: reservation.issue_date,
      },
      {
        where: {
          id: reservation.id,
        },
      }
    );

    return this._dataMapper.get(dataEntity);
  }
}
