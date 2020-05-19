import Reservation from '../models/Reservation';
import { AddReservationRequest } from 'src/application/reservation/AddReservationRequest';
import { UpdateStatusRequest } from 'src/application/reservation/UpdateStatusRequest';

export interface IReservationRepository {
    getAll(): Promise<Reservation[]>
    getReservationByUser(): Promise<Reservation[]>
    add(reservation: AddReservationRequest): Promise<Reservation>;
    updateStatus(reservation: UpdateStatusRequest): Promise<Reservation>
}