import { injectable } from "inversify";
import { IMapper } from "./IMapper";
import Rental from "src/domain/models/Rental";
import RentalEntity from "../entities/rental"; 
import Company from "src/domain/models/Company";
import Asset from "src/domain/models/Asset";

@injectable()
export class RentalMapper implements IMapper<Rental, RentalEntity> {
  get(entity: RentalEntity): Rental {

    let owner = null;
    if (entity.owner) {
      owner = new Company(
         entity.owner.id,
         entity.owner.name,
         entity.owner.email,
         entity.owner.tel,
         entity.owner.address,
         entity.owner.latitude,
         entity.owner.longitude
      )
    } 
    
    let asset = null;
    if (entity.asset) {
      asset = new Asset(
        entity.asset.id,
        entity.asset.name,
        entity.asset.growth_rate,
        entity.asset.manufacturer,
        entity.asset.capacity,
        entity.asset.capacity_unit,
        entity.asset.serial_number,
        entity.asset.price,
        entity.asset.manufacture_date,
        entity.asset.installation_date,
        entity.asset.service_plan,
        entity.asset.group,
        entity.asset.type,
        entity.asset.growth_type,
        entity.asset.class,
        entity.asset.consumption_type,
        entity.asset.category,
        entity.asset.services,
        entity.asset.custom_fields,
      )
    }

    const rental = new Rental(
      entity.id,
      asset,
      owner,
      entity.price,
      entity.availability
    );

    return rental;
  }
}
