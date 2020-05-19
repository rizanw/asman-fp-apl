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
      throw new Error("Category not found.");
    }

    return dataEntity.map((data) => this._dataMapper.get(data));
  }

  async add(category: CategoryRequest): Promise<Category> {
    const dataEntity = await CategoryEntity.create<CategoryEntity>({
      company_id: category.company_id,
      name: category.name,
    });

    return this._dataMapper.get(dataEntity);
  }
}
