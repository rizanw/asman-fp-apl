
export class UpdateRentalTransactionStatusRequest {
    constructor(
        public readonly id: number,
        public readonly status: number
    ) {}
}