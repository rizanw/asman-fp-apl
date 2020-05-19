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
import { IConsumptionTypeRepository } from "./domain/repositories/IConsumptionTypeRepository";
import { ConsumptionTypeRepository } from "./infra/database/repositories/ConsumptionTypeRepository";
import { ConsumptionTypeMapper } from "./infra/database/mappers/ConsumptionTypesMapper";
import { GetAllConsumptionTypeService } from "./application/consumptionType/GetAllConsumptionTypeService";
import { CategoryRepository } from "./infra/database/repositories/CategoryRepository";
import { ICategoryRepository } from "./domain/repositories/ICategoryRepository";
import { GetAllCategoryService } from "./application/category/GetAllCategoryService";
import { CategoryMapper } from "./infra/database/mappers/CategoryMapper";
import { AddCategoryService } from "./application/category/AddCategoryService";
import { CompanyMapper } from "src/infra/database/mappers/CompanyMapper";
import { ICompanyRepository } from "src/domain/repositories/ICompanyRepository";
import { CompanyRepository } from "src/infra/database/repositories/CompanyRepository";
import { GetAllCompanyService } from "./application/company/GetAllCompanyService";
import { RegisterCompanyService } from "./application/company/RegisterCompanyService";
import { ServiceMapper } from "./infra/database/mappers/ServiceMapper";
import { IServiceRepository } from "src/domain/repositories/IServiceRepository";
import { ServiceRepository } from "./infra/database/repositories/ServiceRepository";
import { GetReadyServicesService } from "./application/service/GetReadyServicesService";
import { GetProcessedServicesService } from "./application/service/GetProcessedServicesService";
import { GetFinishedServicesService } from "./application/service/GetFinishedServicesService";
import { GetBacklogServicesService } from "./application/service/GetBacklogServicesService";
import { IGroupRepository } from "./domain/repositories/IGroupRepository";
import { GroupRepository } from "./infra/database/repositories/GroupRepository";
import { GroupMapper } from "./infra/database/mappers/GroupMapper";
import { RegisterGroupIndukService } from "./application/group/RegisterGroupIndukService";
import { GetAllIndukService } from "./application/group/GetAllIndukService";

let container = new Container();

container.bind<IGroupRepository>(TYPES.GroupRepository).to(GroupRepository);
container
  .bind<ICategoryRepository>(TYPES.CategoryRepository)
  .to(CategoryRepository);
container
  .bind<IConsumptionTypeRepository>(TYPES.ConsumptionTypeRepository)
  .to(ConsumptionTypeRepository);
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container
  .bind<ICompanyRepository>(TYPES.CompanyRepository)
  .to(CompanyRepository);
container
  .bind<IServiceRepository>(TYPES.ServiceRepository)
  .to(ServiceRepository);
container.bind<IServer>(TYPES.Server).to(ExpressServer);

container.bind<GroupMapper>(GroupMapper).toSelf();
container.bind<RegisterGroupIndukService>(RegisterGroupIndukService).toSelf();
container.bind<GetAllIndukService>(GetAllIndukService).toSelf();

container.bind<ConsumptionTypeMapper>(ConsumptionTypeMapper).toSelf();
container
  .bind<GetAllConsumptionTypeService>(GetAllConsumptionTypeService)
  .toSelf();

container.bind<CategoryMapper>(CategoryMapper).toSelf();
container.bind<GetAllCategoryService>(GetAllCategoryService).toSelf();
container.bind<AddCategoryService>(AddCategoryService).toSelf();

container.bind<UserMapper>(UserMapper).toSelf();
container.bind<AuthenticationService>(AuthenticationService).toSelf();
container.bind<GetUserService>(GetUserService).toSelf();

container.bind<CompanyMapper>(CompanyMapper).toSelf();
container.bind<GetAllCompanyService>(GetAllCompanyService).toSelf();
container.bind<RegisterCompanyService>(RegisterCompanyService).toSelf();

container.bind<ServiceMapper>(ServiceMapper).toSelf();
container.bind<GetReadyServicesService>(GetReadyServicesService).toSelf();
container
  .bind<GetProcessedServicesService>(GetProcessedServicesService)
  .toSelf();
container.bind<GetFinishedServicesService>(GetFinishedServicesService).toSelf();
container.bind<GetBacklogServicesService>(GetBacklogServicesService).toSelf();

container
  .bind<InversifyExpressServer>(InversifyExpressServer)
  .toConstantValue(new InversifyExpressServer(container));

container
  .bind<JWTToken>(JWTToken)
  .toConstantValue(new JWTToken(process.env.JWT_SECRET || "secret"));

export default container;
