import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { IUserRepository } from "src/domain/repositories/IUserRepository";
import { UpdateBlacklistRequest } from "./UpdateBlacklistedRequest";

@injectable()
export class UpdateBlacklistedService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly _userRepository: IUserRepository
  ) {}

  async execute(user: UpdateBlacklistRequest) {
    const data = await this._userRepository.updateBlacklisted(user);

    return data;
  }
}
