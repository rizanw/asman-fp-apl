import { inject, injectable } from "inversify";
import TYPES from "src/types.dependency";
import { IUserRepository } from "src/domain/repositories/IUserRepository";
import { AuthenticationRequest } from "src/application/authentication/AuthenticationRequest";
import { compare } from "bcrypt";

@injectable()
export class AuthenticationService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly _userRepository: IUserRepository
  ) {}

  async execute({ username, password }: AuthenticationRequest) {
    const user = await this._userRepository.findByUsername(username);

    if (!user || !(await compare(password, user.password))) {
      return undefined;
    }

    return user;
  }
}
