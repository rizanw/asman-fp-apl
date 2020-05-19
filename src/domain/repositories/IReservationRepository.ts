import Reservation from '../models/Reservation';
import { ReservationRequest } from 'src/application/reservation/AddReservationRequest';

export interface IReservationRepository {
    getAll(): Promise<Reservation[]>
    add(reservation: ReservationRequest): Promise<Reservation>;
}