import Asset from "src/domain/models/Asset";
import { ServiceStatus } from "./ServiceStatus";
import moment from "moment";

export default class Service {
  constructor(
    public readonly id: number | null,
    public readonly start_date: Date | string,
    public readonly end_date: Date | string,
    public readonly service_date: Date | null,
    public status: number | null,
    public readonly asset: Asset | null
  ) {}

  public isBacklog(): Boolean {
    const now = moment();

    return this.status === ServiceStatus.READY && now.isAfter(this.end_date);
  }

  public release() {
    const now = moment();

    if (
      !(
        this.status === ServiceStatus.READY &&
        now.isSameOrAfter(moment(this.start_date)) &&
        now.isSameOrBefore(moment(this.end_date))
      )
    ) {
      throw new Error("Service is not ready for release");
    }

    this.status = ServiceStatus.PROCESSED;
  }

  public finish() {
    if (this.status !== ServiceStatus.PROCESSED) {
      throw new Error("Service cannot finished");
    }

    this.status = ServiceStatus.FINISHED;
  }
}
