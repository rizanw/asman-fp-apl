import Category from '../models/Category';
import { CategoryRequest } from '../../application/category/CategoryRequest';

export interface ICategoryRepository {
  add(category: CategoryRequest): Promise<Category>;
  getAll(): Promise<Category[]>;
}
