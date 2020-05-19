import { RegisterCompanyRequest } from "src/application/company/RegisterCompanyRequest";
import Group from "../models/Group";

export interface IGroupRepository {
  registerInduk(request: RegisterCompanyRequest): Promise<Group>;
  registerSubInduk(request: RegisterCompanyRequest): Promise<Group>;
  registerEquipment(request: RegisterCompanyRequest): Promise<Group>;
  findById(id: number): Promise<Company>;
  findAllIndukByUser(id: number): Promise<Group[]>;
  findAllSubIndukByUser(): Promise<Group[]>;
  findAllEquipmentByUser(): Promise<Group[]>;
}
