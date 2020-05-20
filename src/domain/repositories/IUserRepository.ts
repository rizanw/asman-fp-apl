import User from "src/domain/models/User";
import { UpdateBlacklistRequest } from "src/application/user/UpdateBlacklistedRequest";

export interface IUserRepository {
  add(user: User): Promise<User>;
  findById(id: number): Promise<User>;
  findByUsername(username: string): Promise<User>;
  updateBlacklisted(user: UpdateBlacklistRequest): Promise<User>;
}
