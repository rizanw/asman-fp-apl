import { IMapper } from "src/infra/database/mappers/IMapper";
import User from "src/domain/models/User";
import UserEntity from "src/infra/database/entities/user";
import { injectable } from "inversify";

@injectable()
export class UserMapper implements IMapper<User, UserEntity> {
  get(entity: UserEntity): User {
    const user = new User(
      entity.id,
      entity.name,
      entity.username,
      entity.role,
      entity.password,
      null
    );

    return user;
  }
}
