export class RegisterGroupRequest {
  constructor(
    public readonly company_id: number,
    public readonly name: string,
    public readonly tel: string,
    public readonly address: string,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly parent_id: number | null,
  ) {}
}
