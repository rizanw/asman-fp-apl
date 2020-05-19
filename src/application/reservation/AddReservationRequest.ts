export class ReservationRequest {
    constructor(
      public readonly asset_id: number,
      public readonly borrower_id: number,
      public readonly admin_id: number,
      public readonly issue_date: Date,
      public readonly return_date: Date,
      public readonly status: number
    ) {}
  }
  