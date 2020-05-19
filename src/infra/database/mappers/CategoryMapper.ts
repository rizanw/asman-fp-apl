import { IMapper } from "src/infra/database/mappers/IMapper";
import CategoryEntity from "../entities/category";
import { injectable } from "inversify";
import Category from '../../../domain/models/Category';

@injectable()
export class CategoryMapper implements IMapper<Category, CategoryEntity> {
  get(entity: CategoryEntity): Category {
    const consumptionType = new Category(
      entity.id,
      entity.company_id,
      entity.name,
    );

    return consumptionType;
  }
}
