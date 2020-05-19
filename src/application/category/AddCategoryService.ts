import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { ICategoryRepository } from '../../domain/repositories/ICategoryRepository';
import { CategoryRequest } from './CategoryRequest';

@injectable()
export class AddCategoryService {
  constructor(
    @inject(TYPES.CategoryRepository)
    private readonly _categoryRepository: ICategoryRepository
  ) {}

  async execute(category: CategoryRequest) {
    const data = await this._categoryRepository.add(category)

    return data;
  }
}
