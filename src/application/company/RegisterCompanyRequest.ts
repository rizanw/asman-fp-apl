export class RegisterCompanyRequest {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly tel: string,
    public readonly address: string,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly username: string,
    public readonly password: string
  ) {}
}
