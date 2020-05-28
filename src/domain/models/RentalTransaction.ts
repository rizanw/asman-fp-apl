import User from "./User";
import Rental from "./Rental";
import Company from "./Company"; 
import { statusLabels, statusIDs } from "./RentalTransactionStatus";

export default class RentalTransaction {
  constructor(
    public readonly id: number, 
    public readonly rental: Rental | null,
    public readonly renter: Company | null,
    public readonly duration: number,
    public issue_date: Date,
    public return_date: Date,
    public statusId: number,
    public status: string
  ) {
    this.status = this.getStatusLabel(this.statusId);
  }

  private getStatusLabel(status: number) : string{
    let statusId = statusIDs[status];
    let statusLabel = statusLabels;

    return statusLabel[statusId];
  }

  public updateIssueDate(date: Date) {
    this.issue_date = date
  }

  public updateStatus(status: number) {
    this.statusId = status
  }

  public isPending() {
    if(this.statusId != 0){
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
