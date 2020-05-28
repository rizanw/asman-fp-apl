import { RegisterCompanyRequest } from "src/application/company/RegisterCompanyRequest";
import Group from "../models/Group";
import { RegisterGroupRequest } from "src/application/group/RegisterGroupRequest";

export interface IGroupRepository {
  // registerInduk(request: RegisterCompanyRequest): Promise<Group>;
  // registerSubInduk(request: RegisterCompanyRequest): Promise<Group>;
  // registerEquipment(request: RegisterCompanyRequest): Promise<Group>;
  add(request: RegisterGroupRequest): Promise<Group>;
  findAllIndukByUser(id: number): Promise<Group[]>;
  findAllSubIndukByUser(id: number): Promise<Group[]>;
  findAllEquipmentByUser(id: number): Promise<Group[]>;
}
