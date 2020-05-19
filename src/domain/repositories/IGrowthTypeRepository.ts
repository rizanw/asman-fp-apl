import GrowthType from "../models/GrowthType";

export interface IGrowthTypeRepository {
  add(user: GrowthType): Promise<GrowthType>;
  findById(id: number): Promise<GrowthType>;
  getAll(): Promise<GrowthType[]>;
}
