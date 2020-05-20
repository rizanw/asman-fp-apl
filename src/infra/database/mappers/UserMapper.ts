import { IMapper } from "src/infra/database/mappers/IMapper";
import User from "src/domain/models/User";
import UserEntity from "src/infra/database/entities/user";
import { injectable } from "inversify";
import Company from "src/domain/models/Company";

@injectable()
export class UserMapper implements IMapper<User, UserEntity> {
  get(entity: UserEntity): User {
    let company = null;
    if (entity.company) {
      company = new Company(
        entity.company.id,
        entity.company.name,
        entity.company.email,
        entity.company.tel,
        entity.company.address,
        entity.company.latitude,
        entity.company.longitude
      );
    }

    const user = new User(
      entity.id,
      entity.name,
      entity.username,
      entity.role,
      entity.password,
      company,
      entity.blacklisted
    );

    return user;
  }
}
