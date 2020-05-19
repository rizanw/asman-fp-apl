import Category from '../models/Category';

export interface ICategoryRepository {
  add(category: Category): Promise<Category>;
  getAll(): Promise<Category>;
}
