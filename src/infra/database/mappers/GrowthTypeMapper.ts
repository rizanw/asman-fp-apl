import { IMapper } from "src/infra/database/mappers/IMapper";
import GrowthType from "../../../domain/models/GrowthType";
import GrowthTypeEntity from "../entities/growthType";
import { injectable } from "inversify";

@injectable()
export class GrowthTypeMapper implements IMapper<GrowthType, GrowthTypeEntity> {
  get(entity: GrowthTypeEntity): GrowthType {
    const growthType = new GrowthType(entity.id, entity.name, entity.color);

    return growthType;
  }
}
