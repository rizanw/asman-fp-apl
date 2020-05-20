import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { IServiceRepository } from "src/domain/repositories/IServiceRepository";
import SetServicePlanRequest from "./SetServicePlanRequest";
import { ServiceStatus } from "src/domain/models/ServiceStatus";
import Service from "src/domain/models/Service";
import moment from "moment";

@injectable()
export class SetServicePlanService {
  constructor(
    @inject(TYPES.ServiceRepository)
    private readonly _serviceRepository: IServiceRepository
  ) {}

  async execute(request: SetServicePlanRequest) {
    // update service plan
    const updatedAsset = await this._serviceRepository.setServicePlan(request);

    if (!updatedAsset) {
      throw new Error("Asset not found");
    }

    // cek masing" service apakah sedang aktif, kalo iya dihapus
    let servicesToDelete = [];
    for (const service of updatedAsset.services) {
      if (service.status === ServiceStatus.READY && !service.isBacklog()) {
        servicesToDelete.push(service);
      }
    }

    const numOfDeletedService = await this._serviceRepository.deleteServices(
      servicesToDelete
    );

    console.log("deleted: ", numOfDeletedService);

    if (numOfDeletedService === null) {
      throw new Error("Cannot delete active services");
    }

    // buatkan service sesuai service plan
    const { start_date, long } = request;
    const edate = moment(start_date).add(long - 1, "days");
    const serviceToCreate = new Service(
      null,
      start_date,
      edate.toDate(),
      null,
      null,
      updatedAsset
    );

    const numOfCreatedServce = await this._serviceRepository.addServices([
      serviceToCreate,
    ]);

    if (numOfCreatedServce === null) {
      throw new Error("Cannot add service");
    }
  }
}
