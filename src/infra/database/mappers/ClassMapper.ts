import { IMapper } from "src/infra/database/mappers/IMapper";
import ClassEntity from "../entities/class";
import { injectable } from "inversify";
import Class from "../../../domain/models/Class";

@injectable()
export class ClassMapper implements IMapper<Class, ClassEntity> {
  get(entity: ClassEntity): Class {
    const classDomain = new Class(entity.id, entity.name, entity.color);

    return classDomain;
  }
}
