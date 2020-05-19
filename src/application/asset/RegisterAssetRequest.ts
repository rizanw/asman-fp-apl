export default class RegisterAssetRequest {
  constructor(
    public readonly group_id: number,
    public readonly name: string,
    public readonly type_id: number,
    public readonly growth_type_id: number,
    public readonly growth_rate: number,
    public readonly class_id: number,
    public readonly consumption_type_id: number,
    public readonly category_id: number,
    public readonly manufacturer: string,
    public readonly capacity: number,
    public readonly capacity_unit: string,
    public readonly serial_number: string,
    public readonly price: number,
    public readonly manufacture_date: Date,
    public readonly installation_date: Date,
    public readonly custom_fields: Object | null,
    public readonly start_date: Date | null,
    public readonly long: number | null,
    public readonly periodic: number | null
  ) {}
}
