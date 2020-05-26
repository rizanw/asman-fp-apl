
export class UpdateRentalTransactionDateRequest {
    constructor(
        public readonly id: number,
        public readonly issue_date: Date
    ) {}
}