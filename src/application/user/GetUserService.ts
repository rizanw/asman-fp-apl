import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { IUserRepository } from "src/domain/repositories/IUserRepository";

@injectable()
export class GetUserService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly _userRepository: IUserRepository
  ) {}

  async execute(id: number) {
    const user = await this._userRepository.findById(id);

    if (!user) {
      return undefined;
    }

    return user;
  }
}
