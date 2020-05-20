export default class SetServicePlanRequest {
  constructor(
    public readonly asset_id: number,
    public readonly start_date: Date,
    public readonly long: number,
    public readonly periodic: number
  ) {}
}
