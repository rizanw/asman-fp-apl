import Rental from '../models/Rental'; 
import { AddRentalAssetRequest } from 'src/application/rental/AddRentalAssetRequest';

export interface IRentalRepository {
    findById($id: number): Promise<Rental>;
    add(request: AddRentalAssetRequest): Promise<Rental>;
    update(rental: Rental): Promise<Rental>;
}