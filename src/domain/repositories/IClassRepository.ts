import Class from "../models/Class";

export interface IClassRepository {
  add(user: Class): Promise<Class>;
  findById(id: number): Promise<Class>;
  getAll(): Promise<Class[]>;
}
