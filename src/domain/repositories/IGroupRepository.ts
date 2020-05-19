import { RegisterCompanyRequest } from "src/application/company/RegisterCompanyRequest";
import Group from "../models/Group";

export interface IGroupRepository {
  registerInduk(request: RegisterCompanyRequest): Promise<Group>;
  registerSubInduk(request: RegisterCompanyRequest): Promise<Group>;
  registerEquipment(request: RegisterCompanyRequest): Promise<Group>;
  findAllIndukByUser(id: number): Promise<Group[]>;
  findAllSubIndukByUser(id: number): Promise<Group[]>;
  findAllEquipmentByUser(id: number): Promise<Group[]>;
}
