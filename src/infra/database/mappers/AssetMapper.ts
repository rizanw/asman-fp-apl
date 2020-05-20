import { IMapper } from "src/infra/database/mappers/IMapper";
import AssetEntity from "src/infra/database/entities/asset";
import { injectable } from "inversify";
import Category from "src/domain/models/Category";
import Asset from "src/domain/models/Asset";
import Type from "src/domain/models/Type";
import GrowthType from "src/domain/models/GrowthType";
import Class from "src/domain/models/Class";
import ConsumptionType from "src/domain/models/ConsumptionType";
import Service from "src/domain/models/Service";
import Group from "src/domain/models/Group";

@injectable()
export class AssetMapper implements IMapper<Asset, AssetEntity> {
  get(entity: AssetEntity): Asset {
    let category = null;
    if (entity.category) {
      const { id, company_id, name } = entity.category;
      category = new Category(id, company_id, name);
    }

    let type = null;
    if (entity.type) {
      const { id, name, color } = entity.type;
      type = new Type(id, name, color);
    }

    let growth_type = null;
    if (entity.growth_type) {
      const { id, name, color } = entity.growth_type;
      growth_type = new GrowthType(id, name, color);
    }

    let assetClass = null;
    if (entity.class) {
      const { id, name, color } = entity.class;
      assetClass = new Class(id, name, color);
    }

    let consumption_type = null;
    if (entity.consumption_type) {
      const { id, name, color } = entity.consumption_type;
      consumption_type = new ConsumptionType(id, name, color);
    }

    let services = [];
    if (entity.services) {
      for (const service of entity.services) {
        const { id, start_date, end_date, service_date, status } = service;
        services.push(
          new Service(id, start_date, end_date, service_date, status, null)
        );
      }
    }

    let group = null;
    if (entity.group) {
      const {
        id,
        parent_id,
        company_id,
        name,
        tel,
        address,
        latitude,
        longitude,
        level,
      } = entity.group;

      // subinduk
      let subinduk = null;
      if (entity.group.parent) {
        const {
          id,
          parent_id,
          company_id,
          name,
          tel,
          address,
          latitude,
          longitude,
          level,
        } = entity.group.parent;

        // induk
        let induk = null;
        if (entity.group.parent.parent) {
          const {
            id,
            parent_id,
            company_id,
            name,
            tel,
            address,
            latitude,
            longitude,
            level,
          } = entity.group.parent.parent;

          induk = new Group(
            id,
            parent_id,
            company_id,
            name,
            tel,
            address,
            latitude,
            longitude,
            level,
            null
          );
        }

        subinduk = new Group(
          id,
          parent_id,
          company_id,
          name,
          tel,
          address,
          latitude,
          longitude,
          level,
          induk
        );
      }

      group = new Group(
        id,
        parent_id,
        company_id,
        name,
        tel,
        address,
        latitude,
        longitude,
        level,
        subinduk
      );
    }

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
      group,
      type,
      growth_type,
      assetClass,
      consumption_type,
      category,
      services,
      entity.custom_fields,
      entity.availability
    );

    return asset;
  }
}
