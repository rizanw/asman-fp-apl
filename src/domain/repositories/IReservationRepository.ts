import Reservation from '../models/Reservation';

export interface IReservationRepository {
    getAll(): Promise<Reservation[]>
    
}