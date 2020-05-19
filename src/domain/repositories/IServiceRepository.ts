import User from "src/domain/models/User";
import Service from "src/domain/models/Service";
import Asset from "src/domain/models/Asset";

export interface IServiceRepository {
  releaseServices(services: Service[]): Promise<void>;
  finishServices(services: Service[]): Promise<void>;
  findServicesByIds(ids: number[]): Promise<Service[]>;
  getUnplannedAssets(companyId: number): Promise<Asset[]>;
  getReadyServicesByUser(user: User): Promise<Service[]>;
  getProcessedServicesByUser(user: User): Promise<Service[]>;
  getFinishedServicesByUser(user: User): Promise<Service[]>;
  getBacklogServicesByUser(user: User): Promise<Service[]>;
}
