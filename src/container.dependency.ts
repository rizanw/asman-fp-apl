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
import { RegisterGroupSubIndukService } from "./application/group/RegisterGroupSubIndukService";
import { GetAllSubIndukService } from "./application/group/GetAllSubIndukService";
import { RegisterGroupEquipmentService } from "./application/group/RegisterGroupEquipmentService";
import { GetAllEquipmentService } from "./application/group/GetAllEquipmentService";
import { IClassRepository } from "./domain/repositories/IClassRepository";
import { ClassRepository } from "./infra/database/repositories/ClassRepository";
import { IGrowthTypeRepository } from "./domain/repositories/IGrowthTypeRepository";
import { GrowthTypeRepository } from "./infra/database/repositories/GrowthTypeRepository";
import { ITypeRepository } from "./domain/repositories/ITypeRepository";
import { TypeRepository } from "./infra/database/repositories/TypeRepository";
import { ClassMapper } from "./infra/database/mappers/ClassMapper";
import { GetAllClassService } from "./application/class/GetAllClassService";
import { GrowthTypeMapper } from "./infra/database/mappers/GrowthTypeMapper";
import { GetAllGrowthTypeService } from "./application/growthType/GetAllGrowthTypeService";
import { TypeMapper } from "./infra/database/mappers/TypeMapper";
import { GetAllTypeService } from "./application/type/GetAllTypeService";
import { AssetMapper } from "./infra/database/mappers/AssetMapper";
import { GetAllAssetService } from "./application/asset/GetAllAssetService";
import { IAssetRepository } from "./domain/repositories/IAssetRepository";
import { AssetRepository } from "./infra/database/repositories/AssetRepository";
import { RegisterAssetService } from "./application/asset/RegisterAssetService";
import { FindAssetByIdService } from "./application/asset/FindAssetByIdService";
import { ReleaseServicesService } from "./application/service/ReleaseServicesService";
import { FinishServicesService } from "./application/service/FinishServicesService";
import { DeleteAssetService } from "./application/asset/DeleteAssetService";
import { EditAssetService } from "./application/asset/EditAssetService";
import { SetServicePlanAssetService } from "./application/asset/SetServicePlanAssetService";
import { GetUnplannedAssetsService } from "./application/service/GetUnplannedAssetsService";
import { SetServicePlanService } from "./application/service/SetServicePlanService";
import { RegisterAssetCSVService } from "./application/asset/RegisterAssetCSVService";
import { GetServicePlanCsvService } from "src/application/service/GetServicePlanCsvService";
import { RentalMapper } from "./infra/database/mappers/RentalMapper";
import { IRentalRepository } from "./domain/repositories/IRentalRepository";
import { RentalRepository } from "./infra/database/repositories/RentalRepository";
import { AddRentalAssetService } from "./application/rental/AddRentalAssetService";
import { GetRentalAssetExceptOwnerService } from "./application/rental/GetRentalAssetExceptOwnerService";
import { CreateRentalTransactionService } from "./application/rental/CreateRentalTransactionService";
import { RentalTransactionMapper } from "./infra/database/mappers/RentalTransactionMapper";
import { IRentalTransactionRepository } from "./domain/repositories/IRentalTransactionRepository";
import { RentalTransactionRepository } from "./infra/database/repositories/RentalTransactionRepository";
import { GetRentalTransactionByRenterService } from "./application/rental/GetRentalTransactionByRenterService";
import { UpdateRentalTransactionDateService } from "./application/rental/UpdateRentalTransactionDateService";
import { DeleteRentalAssetService } from "./application/rental/DeleteRentalAssetService";
import { UpdateRentalTransactionStatusService } from "./application/rental/UpdateRentalTransactionStatusService";
import { GetRentalAssetByOwnerService } from "./application/rental/GetRentalAssetByOwnerService";
import { GetRentalTransactionByOwnerService } from "./application/rental/GetRentalTransactionByOwnerService";

let container = new Container();

// Rental Module
container.bind<RentalMapper>(RentalMapper).toSelf();
container.bind<IRentalRepository>(TYPES.RentalRepository).to(RentalRepository);
container.bind<AddRentalAssetService>(AddRentalAssetService).toSelf();
container.bind<GetRentalAssetExceptOwnerService>(GetRentalAssetExceptOwnerService).toSelf();
container.bind<GetRentalAssetByOwnerService>(GetRentalAssetByOwnerService).toSelf();

container.bind<RentalTransactionMapper>(RentalTransactionMapper).toSelf();
container.bind<IRentalTransactionRepository>(TYPES.RentalTransactionRepository).to(RentalTransactionRepository);
container.bind<CreateRentalTransactionService>(CreateRentalTransactionService).toSelf();
container.bind<GetRentalTransactionByRenterService>(GetRentalTransactionByRenterService).toSelf();
container.bind<GetRentalTransactionByOwnerService>(GetRentalTransactionByOwnerService).toSelf();
container.bind<UpdateRentalTransactionDateService>(UpdateRentalTransactionDateService).toSelf();
container.bind<DeleteRentalAssetService>(DeleteRentalAssetService).toSelf();
 container.bind<UpdateRentalTransactionStatusService>(UpdateRentalTransactionStatusService).toSelf();

container.bind<EditAssetService>(EditAssetService).toSelf();
container.bind<SetServicePlanAssetService>(SetServicePlanAssetService).toSelf();

container.bind<IGroupRepository>(TYPES.GroupRepository).to(GroupRepository);
container
  .bind<ICategoryRepository>(TYPES.CategoryRepository)
  .to(CategoryRepository);
container
  .bind<IConsumptionTypeRepository>(TYPES.ConsumptionTypeRepository)
  .to(ConsumptionTypeRepository);
container.bind<IClassRepository>(TYPES.ClassRepository).to(ClassRepository);
container
  .bind<IGrowthTypeRepository>(TYPES.GrowthTypeRepository)
  .to(GrowthTypeRepository);
container.bind<ITypeRepository>(TYPES.TypeRepository).to(TypeRepository);
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container
  .bind<ICompanyRepository>(TYPES.CompanyRepository)
  .to(CompanyRepository);
container.bind<IAssetRepository>(TYPES.AssetRepository).to(AssetRepository);
container
  .bind<IServiceRepository>(TYPES.ServiceRepository)
  .to(ServiceRepository);
container.bind<IServer>(TYPES.Server).to(ExpressServer);

container.bind<GroupMapper>(GroupMapper).toSelf();
container.bind<RegisterGroupIndukService>(RegisterGroupIndukService).toSelf();
container.bind<GetAllIndukService>(GetAllIndukService).toSelf();

container.bind<AssetMapper>(AssetMapper).toSelf();
container.bind<RegisterAssetService>(RegisterAssetService).toSelf();
container.bind<RegisterAssetCSVService>(RegisterAssetCSVService).toSelf();
container.bind<FindAssetByIdService>(FindAssetByIdService).toSelf();
container.bind<GetAllAssetService>(GetAllAssetService).toSelf();
container.bind<DeleteAssetService>(DeleteAssetService).toSelf();

container
  .bind<RegisterGroupSubIndukService>(RegisterGroupSubIndukService)
  .toSelf();
container.bind<GetAllSubIndukService>(GetAllSubIndukService).toSelf();

container
  .bind<RegisterGroupEquipmentService>(RegisterGroupEquipmentService)
  .toSelf();
container.bind<GetAllEquipmentService>(GetAllEquipmentService).toSelf();

container.bind<ConsumptionTypeMapper>(ConsumptionTypeMapper).toSelf();
container
  .bind<GetAllConsumptionTypeService>(GetAllConsumptionTypeService)
  .toSelf();

container.bind<ClassMapper>(ClassMapper).toSelf();
container.bind<GetAllClassService>(GetAllClassService).toSelf();

container.bind<GrowthTypeMapper>(GrowthTypeMapper).toSelf();
container.bind<GetAllGrowthTypeService>(GetAllGrowthTypeService).toSelf();

container.bind<TypeMapper>(TypeMapper).toSelf();
container.bind<GetAllTypeService>(GetAllTypeService).toSelf();

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
container.bind<ReleaseServicesService>(ReleaseServicesService).toSelf();
container.bind<FinishServicesService>(FinishServicesService).toSelf();
container.bind<GetUnplannedAssetsService>(GetUnplannedAssetsService).toSelf();
container.bind<SetServicePlanService>(SetServicePlanService).toSelf();
container.bind<GetServicePlanCsvService>(GetServicePlanCsvService).toSelf();

container
  .bind<InversifyExpressServer>(InversifyExpressServer)
  .toConstantValue(new InversifyExpressServer(container));

container
  .bind<JWTToken>(JWTToken)
  .toConstantValue(new JWTToken(process.env.JWT_SECRET || "secret"));

export default container;
