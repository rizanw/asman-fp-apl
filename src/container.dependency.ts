import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";

import TYPES from "src/types.dependency";
import { UserRepository } from "src/infra/database/repositories/UserRepository";
import { IUserRepository } from "src/domain/repositories/IUserRepository";
import { ExpressServer } from "src/ui/http/ExpressServer";
import { IServer } from "src/ui/http/IServer";
import { UserMapper } from "src/infra/database/mappers/UserMapper";
import { AuthenticationService } from "src/application/authentication/AuthenticationService";
import { JWTToken } from "./ui/http/express/utils/JWTToken";
import { GetUserService } from "./application/user/GetUserService";

let container = new Container();

container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IServer>(TYPES.Server).to(ExpressServer);

container.bind<UserMapper>(UserMapper).toSelf();
container.bind<AuthenticationService>(AuthenticationService).toSelf();
container.bind<GetUserService>(GetUserService).toSelf();

container
  .bind<InversifyExpressServer>(InversifyExpressServer)
  .toConstantValue(new InversifyExpressServer(container));

container
  .bind<JWTToken>(JWTToken)
  .toConstantValue(new JWTToken(process.env.JWT_SECRET || "secret"));

export default container;
