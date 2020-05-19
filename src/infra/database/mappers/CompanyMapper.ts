import { IMapper } from "./IMapper";
import Company from "src/domain/models/Company";
import CompanyEntity from "src/infra/database/entities/company";
import { injectable } from "inversify";

@injectable()
export class CompanyMapper implements IMapper<Company, CompanyEntity> {
  get(entity: CompanyEntity): Company {
    return new Company(
      entity.id,
      entity.name,
      entity.email,
      entity.tel,
      entity.address,
      entity.latitude,
      entity.longitude
    );
  }
}
