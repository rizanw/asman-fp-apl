import { injectable } from "inversify";

import { IReservationRepository } from "src/domain/repositories/IReservationRepository";
import { ReservationMapper } from "../mappers/ReservationMapper";
import Reservation from "src/domain/models/Reservation";
import ReservationEntity from "../entities/reservation";
import { AddReservationRequest } from "src/application/reservation/AddReservationRequest";
import { UpdateStatusRequest } from "src/application/reservation/UpdateStatusRequest";
import { UpdateIssueDateRequest } from "src/application/reservation/UpdateIssueDateRequest";

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

  async getById(id: number): Promise<Reservation[]> {
    const dataEntity = await ReservationEntity.findByPk<ReservationEntity>(id);

    if (!dataEntity) {
      throw new Error("data not found.");
    }

    return dataEntity.map((data) => this._dataMapper.get(data));
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

  async updateStatus(reservation: UpdateStatusRequest): Promise<Reservation> {
    const dataEntity = await ReservationEntity.update<ReservationEntity>(
      {
        admin_id: reservation.admin_id,
        status: reservation.status,
      },
      {
        where: {
          id: reservation.id,
        },
      }
    );

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
