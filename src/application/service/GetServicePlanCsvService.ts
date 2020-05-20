import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import User from "src/domain/models/User";
import { IAssetRepository } from "src/domain/repositories/IAssetRepository";

@injectable()
export class GetServicePlanCsvService {
  constructor(
    @inject(TYPES.AssetRepository)
    private readonly _assetRepository: IAssetRepository
  ) {}

  async execute(user: User) {
    const companyId = user.company?.id;

    if (!companyId) {
      throw new Error("Unauthorized: user is not member of a company");
    }

    const assets = await this._assetRepository.getAll(companyId);

    let data = [];
    const header = [
      "ID Aset",
      "Nama Aset",
      "Induk",
      "Sub Induk",
      "Equipment",
      "Nomor Seri",
      "Tgl. Mulai",
      "Lama",
      "Periodik",
    ];

    data.push(header);
    for (const asset of assets) {
      let start_date = "",
        long = "",
        periodic = "";

      if (asset.service_plan) {
        const servicePlan = asset.service_plan as any;

        start_date = servicePlan.start_date;
        long = servicePlan.long;
        periodic = servicePlan.periodic;
      }

      data.push([
        asset.id,
        asset.name,
        asset.group?.parent?.parent?.name,
        asset.group?.parent?.name,
        asset.group?.name,
        asset.serial_number,
        start_date,
        long,
        periodic,
      ]);
    }

    return data;
  }
}
