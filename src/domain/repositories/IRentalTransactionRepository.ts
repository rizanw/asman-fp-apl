import Rental from '../models/Rental'; 
import RentalTransaction from '../models/RentalTransaction';
import { CreateRentalTransactionRequest } from 'src/application/rental/CreateRentalTransactionRequest';

export interface IRentalTransactionRepository {
    add(request: CreateRentalTransactionRequest): Promise<RentalTransaction>;
    update(transaction: RentalTransaction): Promise<boolean>;
    getByOwner(id: number): Promise<RentalTransaction[]>;
    getByRenter(id: number): Promise<RentalTransaction[]>;
    findById(id: number): Promise<RentalTransaction>;
}