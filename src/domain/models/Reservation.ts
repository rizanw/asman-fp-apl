import Asset from "src/infra/database/entities/asset";
import User from "./User";

export default class Reservation {
  constructor(
    public readonly id: number,
    public readonly asset_id: number,
    public readonly borrower_id: number,
    public readonly admin_id: number,
    public readonly issue_date: Date,
    public readonly return_date: Date,
    public readonly status: number
  ) {}

  public isStatusPending(): boolean {
    if(this.status != 0){
      return false;
    }
    return true;
  }

  public isStatusReturned(status: number): boolean {
    if(status != 3){
      return false;
    }
    return true;
  }

  public isStatusAccepted(status: number): boolean {
    if(status != 1){
      return false;
    }
    return true;
  }

  public isReserved(): boolean {
    if(this.return_date != null){
      return false;
    }
    return true;
  }
}
