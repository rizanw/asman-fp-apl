import User from "./User";

export default class RentalTransaction {
  constructor(
    public readonly id: number,
    public readonly rental_id: number,
    public readonly renter_id: number,
    public readonly issue_date: Date,
    public readonly return_date: Date
  ) {}

  public isReserved(): boolean {
    if (this.return_date != null) {
      return false;
    }
    return true;
  }
}
