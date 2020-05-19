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
import { IConsumptionTypeRepository } from './domain/repositories/IConsumptionTypeRepository';
import { ConsumptionTypeRepository } from './infra/database/repositories/ConsumptionTypeRepository';
import { ConsumptionTypeMapper } from './infra/database/mappers/ConsumptionTypesMapper';
import { GetAllConsumptionTypeService } from './application/consumptionType/GetAllConsumptionTypeService';
import { CategoryRepository } from './infra/database/repositories/CategoryRepository';
import { ICategoryRepository } from './domain/repositories/ICategoryRepository';
import { GetAllCategoryService } from './application/category/GetAllCategoryService';
import { CategoryMapper } from './infra/database/mappers/CategoryMapper';
import { AddCategoryService } from './application/category/AddCategoryService';

let container = new Container();

container.bind<ICategoryRepository>(TYPES.CategoryRepository).to(CategoryRepository)
container.bind<IConsumptionTypeRepository>(TYPES.ConsumptionTypeRepository).to(ConsumptionTypeRepository)
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IServer>(TYPES.Server).to(ExpressServer);

container.bind<ConsumptionTypeMapper>(ConsumptionTypeMapper).toSelf();
container.bind<UserMapper>(UserMapper).toSelf();
container.bind<CategoryMapper>(CategoryMapper).toSelf();

container.bind<AuthenticationService>(AuthenticationService).toSelf();
container.bind<GetUserService>(GetUserService).toSelf();
container.bind<GetAllConsumptionTypeService>(GetAllConsumptionTypeService).toSelf();
container.bind<GetAllCategoryService>(GetAllCategoryService).toSelf();
container.bind<AddCategoryService>(AddCategoryService).toSelf();

container
  .bind<InversifyExpressServer>(InversifyExpressServer)
  .toConstantValue(new InversifyExpressServer(container));

container
  .bind<JWTToken>(JWTToken)
  .toConstantValue(new JWTToken(process.env.JWT_SECRET || "secret"));

export default container;
