import User from "src/domain/models/User";

export interface IUserRepository {
  add(user: User): Promise<User>;
  findById(id: number): Promise<User>;
  findByUsername(username: string): Promise<User>;
}
