import Reservation from '../models/Rental';
import { AddReservationRequest } from 'src/application/reservation/AddReservationRequest';
import { UpdateStatusRequest } from 'src/application/reservation/UpdateStatusRequest';
import { UpdateIssueDateRequest } from 'src/application/reservation/UpdateIssueDateRequest';

export interface IReservationRepository {
    getAll(): Promise<Reservation[]>
    getById(id: number): Promise<Reservation>
    getByBorrower(id: number): Promise<Reservation[]>
    getByAsset(id: number): Promise<Reservation[]>
    add(reservation: AddReservationRequest): Promise<Reservation>;
    updateStatus(reservation: Reservation, request: UpdateStatusRequest): Promise<Reservation>
    updateIssueDate(reservation: UpdateIssueDateRequest): Promise<Reservation>
}