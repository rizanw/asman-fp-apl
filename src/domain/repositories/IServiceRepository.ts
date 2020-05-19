import User from "src/domain/models/User";
import Service from "src/domain/models/Service";

export interface IServiceRepository {
  releaseServices(services: Service[]): Promise<void>;
  finishServices(services: Service[]): Promise<void>;
  findServicesByIds(ids: number[]): Promise<Service[]>;
  getReadyServicesByUser(user: User): Promise<Service[]>;
  getProcessedServicesByUser(user: User): Promise<Service[]>;
  getFinishedServicesByUser(user: User): Promise<Service[]>;
  getBacklogServicesByUser(user: User): Promise<Service[]>;
}
