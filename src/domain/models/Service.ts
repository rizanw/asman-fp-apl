import Asset from "src/domain/models/Asset";
import { ServiceStatus } from "./ServiceStatus";
import moment from "moment";

export default class Service {
  constructor(
    public readonly id: number | null,
    public readonly start_date: Date | string,
    public readonly end_date: Date | string,
    public readonly service_date: Date | null,
    public readonly status: number | null,
    public readonly asset: Asset | null
  ) {}

  public isBacklog(): Boolean {
    const now = moment();

    return this.status === ServiceStatus.READY && now.isAfter(this.end_date);
  }
}
