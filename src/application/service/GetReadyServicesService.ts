import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { IServiceRepository } from "src/domain/repositories/IServiceRepository";
import User from "src/domain/models/User";

@injectable()
export class GetReadyServicesService {
  constructor(
    @inject(TYPES.ServiceRepository)
    private readonly _serviceRepository: IServiceRepository
  ) {}

  async execute(user: User) {
    return await this._serviceRepository.getReadyServicesByUser(user);
  }
}
