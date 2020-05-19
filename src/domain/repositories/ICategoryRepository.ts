import Category from "../models/Category";
import { CategoryRequest } from "../../application/category/AddCategoryRequest";

export interface ICategoryRepository {
  add(category: CategoryRequest): Promise<Category>;
  getAll(id: number): Promise<Category[]>;
}
