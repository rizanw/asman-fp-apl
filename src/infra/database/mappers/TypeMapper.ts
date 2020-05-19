import { IMapper } from "src/infra/database/mappers/IMapper";
import TypeEntity from "../entities/type";
import { injectable } from "inversify";
import Type from "../../../domain/models/Type";

@injectable()
export class TypeMapper implements IMapper<Type, TypeEntity> {
  get(entity: TypeEntity): Type {
    const type = new Type(entity.id, entity.name, entity.color);

    return type;
  }
}
