import User from "./User";
import Rental from "./Rental";
import Company from "./Company"; 

export default class RentalTransaction {
  constructor(
    public readonly id: number, 
    public readonly rental: Rental | null,
    public readonly renter: Company | null,
    public readonly duration: number,
    public issue_date: Date,
    public return_date: Date,
    public status: number
  ) {}

  public updateIssueDate(date: Date) {
    this.issue_date = date
  }

  public updateStatus(status: number) {
    this.status = status
  }

  public isPending() {
    if(this.status != 0){
      return false
    }
    return true
  }

  public isReserved(): boolean {
    if (this.return_date != null) {
      return false;
    }
    return true;
  }
}
