export default class Group {
  constructor(
    public readonly id: number | null,
    public readonly parent_id: number | null,
    public readonly company_id: number,
    public readonly name: string,
    public readonly tel: string,
    public readonly address: string,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly level: number,
    public readonly parent: Group | null
  ) {}
}
