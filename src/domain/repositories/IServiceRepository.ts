import User from "src/domain/models/User";
import Service from "src/domain/models/Service";
import Asset from "src/domain/models/Asset";
import SetServicePlanAssetRequest from "src/application/asset/SetServicePlanAssetRequest";

export interface IServiceRepository {
  findServicesByIds(ids: number[]): Promise<Service[]>;
  getUnplannedAssets(companyId: number): Promise<Asset[]>;
  getReadyServicesByUser(user: User): Promise<Service[]>;
  getProcessedServicesByUser(user: User): Promise<Service[]>;
  getFinishedServicesByUser(user: User): Promise<Service[]>;
  getBacklogServicesByUser(user: User): Promise<Service[]>;
  setServicePlan(request: SetServicePlanAssetRequest): Promise<Asset | null>;
  addServices(services: Service[]): Promise<number | null>;
  updateServices(services: Service[]): Promise<number | null>;
  deleteServices(services: Service[]): Promise<number | null>;
}
