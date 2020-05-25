import Asset from "src/infra/database/entities/asset";
import User from "./User";

export default class Rental {
  constructor(
    public readonly id: number,
    public readonly asset_id: number, 
    public readonly owner_id: number,
    public status: number
  ) {}

  public updateStatus(status: number) {
    this.status = status;
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
}
