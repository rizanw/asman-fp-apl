import Company from "domain/models/Company";

export default class User {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly username: string,
    public readonly role: string,
    public readonly password: string,
    public readonly company: Company | null
  ) {}
}
