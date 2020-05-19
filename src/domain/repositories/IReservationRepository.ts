import Reservation from '../models/Reservation';
import { GetAllCategoryService } from 'src/application/category/GetAllCategoryService';

export interface IReservationRepository {
    getAll(): Promise<Reservation[]>
    
}