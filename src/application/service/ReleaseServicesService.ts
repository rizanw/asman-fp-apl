import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { IServiceRepository } from "src/domain/repositories/IServiceRepository";
import { ServiceStatus } from "src/domain/models/ServiceStatus";
import moment from "moment";

@injectable()
export class ReleaseServicesService {
  constructor(
    @inject(TYPES.ServiceRepository)
    private readonly _serviceRepository: IServiceRepository
  ) {}

  async execute(serviceIds: number[]) {
    const services = await this._serviceRepository.findServicesByIds(
      serviceIds
    );

    const now = moment();
    for (const service of services) {
      if (
        !(
          service.status === ServiceStatus.READY &&
          now.isSameOrAfter(moment(service.start_date)) &&
          now.isSameOrBefore(moment(service.end_date))
        )
      ) {
        throw new Error("Service is not ready for release");
      }
    }

    await this._serviceRepository.releaseServices(services);

    return services.length;
  }
}
