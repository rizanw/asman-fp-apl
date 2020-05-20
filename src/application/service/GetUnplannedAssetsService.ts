import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { IServiceRepository } from "src/domain/repositories/IServiceRepository";
import User from "src/domain/models/User";

@injectable()
export class GetUnplannedAssetsService {
  constructor(
    @inject(TYPES.ServiceRepository)
    private readonly _serviceRepository: IServiceRepository
  ) {}

  async execute(user: User) {
    const companyId = user.company?.id;

    if (!companyId) {
      throw new Error("Unauthorized: user is not member of a company");
    }

    return await this._serviceRepository.getUnplannedAssets(companyId);
  }
}
