import Asset from "./Asset";
import Company from "./Company";
import { availabilityIDs, availabilityLabels } from "./RentalStatus";

export default class Rental { 
  constructor(
    public readonly id: number,
    public readonly asset: Asset | null, 
    public readonly owner: Company | null,
    public readonly price: number,
    public availability: number,
    public status: string
  ) {
    this.status = this.getAvailLabel(availability)
  }

  private getAvailLabel(availability: number) : string{
    let availId = availabilityIDs[availability];
    let availLabel = availabilityLabels;

    return availLabel[availId]
  }

  public updateAvailability(status: number) {
    this.availability = status;
  }

  public isAvailable(): boolean {
    if(this.availability != 1){
      return false;
    }
    return true;
  } 
}
