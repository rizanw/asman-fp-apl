import { IMapper } from "src/infra/database/mappers/IMapper";
import AssetEntity from "../entities/asset";
import { injectable } from "inversify";
import Category from "../../../domain/models/Category";
import Asset from "../../../domain/models/Asset";

@injectable()
export class AssetMapper implements IMapper<Asset, AssetEntity> {
  get(entity: AssetEntity): Asset {
    const asset = new Asset(
      entity.id,
      entity.name,
      entity.growth_rate,
      entity.manufacturer,
      entity.capacity,
      entity.capacity_unit,
      entity.serial_number,
      entity.price,
      entity.manufacture_date,
      entity.installation_date,
      entity.service_plan,
      entity.group,
      entity.type,
      entity.growth_type,
      entity.class,
      entity.consumption_type,
      entity.category,
      entity.services,
      entity.custom_fields
    );

    return asset;
  }
}
