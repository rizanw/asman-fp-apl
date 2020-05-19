import Type from "../models/Type";

export interface ITypeRepository {
  add(user: Type): Promise<Type>;
  findById(id: number): Promise<Type>;
  getAll(): Promise<Type[]>;
}
