export default class Company {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly tel: string,
    public readonly address: string,
    public readonly latitude: number,
    public readonly longitude: number
  ) {}
}
