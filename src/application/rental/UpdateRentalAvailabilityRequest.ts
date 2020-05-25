
export class UpdateRentalAvailabilityRequest {
    constructor(
        public readonly id: number,
        public readonly status: number
    ) {}
}