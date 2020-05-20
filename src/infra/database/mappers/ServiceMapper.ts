import { injectable } from "inversify";
import { IMapper } from "src/infra/database/mappers/IMapper";
import Service from "src/domain/models/Service";
import ServiceEntity from "src/infra/database/entities/service";
import Asset from "src/domain/models/Asset";
import { AssetMapper } from "./AssetMapper";

@injectable()
export class ServiceMapper implements IMapper<Service, ServiceEntity> {
  constructor(protected readonly _assetMapper: AssetMapper) {}

  get(entity: ServiceEntity): Service {
    let asset = null;
    if (entity.asset) {
      asset = this._assetMapper.get(entity.asset);
    }

    const service = new Service(
      entity.id,
      entity.start_date,
      entity.end_date,
      entity.service_date,
      entity.status,
      asset
    );

    return service;
  }
}
