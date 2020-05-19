import { IMapper } from "src/infra/database/mappers/IMapper";
import ConsumptionType from '../../../domain/models/ConsumptionType';
import ConsumptionTypeEntity from "../entities/consumptionType";
import { injectable } from "inversify";

@injectable()
export class ConsumptionTypeMapper implements IMapper<ConsumptionType, ConsumptionTypeEntity> {
  get(entity: ConsumptionTypeEntity): ConsumptionType {
    const consumptionType = new ConsumptionType(
      entity.id,
      entity.name,
      entity.color
    );

    return consumptionType;
  }
}
