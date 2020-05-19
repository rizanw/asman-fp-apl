import Company from "src/domain/models/Company";
import { removeTicks } from "sequelize/types/lib/utils";

export default class User {
  constructor(
    public readonly id: number | null,
    public readonly name: string,
    public readonly username: string,
    public readonly role: string,
    public readonly password: string,
    public readonly company: Company | null, 
    public readonly blacklisted: number
  ) {}

  isBlacklisted() : boolean {
    if(this.blacklisted==1){
      return true;
    }
    return false;
  }
}
