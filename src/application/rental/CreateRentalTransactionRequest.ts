
export class CreateRentalTransactionRequest {
    constructor(
        public readonly rental_id: number,
        public readonly renter_id: number, 
        public readonly duration: number, 
        public readonly issue_date: Date
    ) {}
}