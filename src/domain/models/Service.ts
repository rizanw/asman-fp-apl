import Asset from "src/domain/models/Asset";

export default class Service {
  constructor(
    public readonly id: number,
    public readonly start_date: Date,
    public readonly end_date: Date,
    public readonly service_date: Date,
    public readonly status: number,
    public readonly asset: Asset | null
  ) {}
}
