import { injectable } from "inversify";
import { IMapper } from "src/infra/database/mappers/IMapper";
import Service from "src/domain/models/Service";
import ServiceEntity from "src/infra/database/entities/service";
import Asset from "src/domain/models/Asset";

@injectable()
export class ServiceMapper implements IMapper<Service, ServiceEntity> {
  get(entity: ServiceEntity): Service {
    let asset = null;
    if (entity.asset) {
      asset = new Asset(
        entity.asset.id,
        entity.asset.group_id,
        entity.asset.name,
        entity.asset.type_id,
        entity.asset.growth_type_id,
        entity.asset.growth_rate,
        entity.asset.class_id,
        entity.asset.consumption_type_id,
        entity.asset.category_id,
        entity.asset.manufacturer,
        entity.asset.capacity,
        entity.asset.capacity_unit,
        entity.asset.serial_number,
        entity.asset.price,
        entity.asset.manufacture_date,
        entity.asset.installation_date,
        entity.asset.custom_fields
      );
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
