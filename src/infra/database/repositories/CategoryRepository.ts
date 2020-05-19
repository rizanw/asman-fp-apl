import { injectable } from "inversify";

import CategoryEntity from "../entities/category";
import { ICategoryRepository } from "../../../domain/repositories/ICategoryRepository";
import { CategoryMapper } from "../mappers/CategoryMapper";
import Category from "../../../domain/models/Category";
import { CategoryRequest } from "../../../application/category/AddCategoryRequest";

@injectable()
export class CategoryRepository implements ICategoryRepository {
  private readonly _dataMapper: CategoryMapper;

  constructor(dataMapper: CategoryMapper) {
    this._dataMapper = dataMapper;
  }

  async getAll(): Promise<Category[]> {
    const dataEntity = await CategoryEntity.findAll();

    if (!dataEntity) {
      throw new Error("User not found.");
    }

    return dataEntity.map((data) => this._dataMapper.get(data));
  }

  async add(user: CategoryRequest): Promise<Category> {
    const dataEntity = await CategoryEntity.create<CategoryEntity>({
      name: user.name,
      company_id: user.company_id,
    });

    return this._dataMapper.get(dataEntity);
  }
}
