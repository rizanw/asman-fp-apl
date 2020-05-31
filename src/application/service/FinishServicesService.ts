import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { IServiceRepository } from "src/domain/repositories/IServiceRepository";

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
      service.finish();
    }

    await this._serviceRepository.updateServices(services);

    return services.length;
  }
}
