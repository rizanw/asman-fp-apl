import { injectable } from "inversify";
import { IUserRepository } from "src/domain/repositories/IUserRepository";
import User from "src/domain/models/User";
import UserEntity from "src/infra/database/entities/user";
import { UserMapper } from "src/infra/database/mappers/UserMapper";
import { UpdateBlacklistRequest } from "src/application/user/UpdateBlacklistedRequest";

@injectable()
export class UserRepository implements IUserRepository {
  private readonly _dataMapper: UserMapper;

  constructor(dataMapper: UserMapper) {
    this._dataMapper = dataMapper;
  }

  async findById(id: number): Promise<User> {
    const userEntity = await UserEntity.findByPk(id, {
      include: [
        {
          association: UserEntity.associations.company,
        },
      ],
    });

    if (!userEntity) {
      throw new Error("User not found.");
    }

    return this._dataMapper.get(userEntity);
  }

  async findByUsername(username: string): Promise<User> {
    const userEntity = await UserEntity.findOne({
      where: {
        username: username,
      },
      include: [
        {
          association: UserEntity.associations.company,
        },
      ],
    });

    if (!userEntity) {
      throw new Error("User not found.");
    }

    return this._dataMapper.get(userEntity);
  }

  async add(user: User): Promise<User> {
    const userEntity = await UserEntity.create<UserEntity>({
      name: user.name,
      username: user.username,
      password: user.password,
      role: user.role,
      company_id: user.company?.id,
    });

    return this._dataMapper.get(userEntity);
  }

  async updateBlacklisted(user: UpdateBlacklistRequest): Promise<User> {
    const userEntity = await UserEntity.update<UserEntity>(
      {
        blacklisted: user.status,
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    return this._dataMapper.get(userEntity);
  }
}
