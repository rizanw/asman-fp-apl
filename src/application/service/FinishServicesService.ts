import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { IServiceRepository } from "src/domain/repositories/IServiceRepository";
import { ServiceStatus } from "src/domain/models/ServiceStatus";

@injectable()
export class FinishServicesService {
  constructor(
    @inject(TYPES.ServiceRepository)
    private readonly _serviceRepository: IServiceRepository
  ) {}

  async execute(serviceIds: number[]) {
    const services = await this._serviceRepository.findServicesByIds(
      serviceIds
    );

    for (const service of services) {
      if (service.status !== ServiceStatus.PROCESSED) {
        throw new Error("Service cannot finished");
      }
    }

    await this._serviceRepository.finishServices(services);

    return services.length;
  }
}
