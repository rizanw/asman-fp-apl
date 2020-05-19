import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { ICategoryRepository } from '../../domain/repositories/ICategoryRepository';

@injectable()
export class GetAllCategoryService {
  constructor(
    @inject(TYPES.CategoryRepository)
    private readonly _categoryRepository: ICategoryRepository
  ) {}

  async execute() {
    const data = await this._categoryRepository.getAll()

    if (!data) {
      return undefined;
    }

    return data;
  }
}
