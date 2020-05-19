import Asset from "../models/Asset";
import RegisterAssetRequest from "../../application/asset/RegisterAssetRequest";
import { RegisterAssetService } from "../../application/asset/RegisterAssetService";
import SetServicePlanAssetRequest from "../../application/asset/SetServicePlanAssetRequest";

export interface IAssetRepository {
  registerAsset(request: RegisterAssetRequest): Promise<Asset>;
  findById(company_id: number, id: number): Promise<Asset>;
  getAll(id: number): Promise<Asset[]>;
  deleteAsset(id: number): Promise<Asset>;
  editAsset(id: number, request: RegisterAssetRequest): Promise<Asset>;
  setServicePlan(request: SetServicePlanAssetRequest): Promise<Asset>;
  getByAvailability(): Promise<Asset[]>;
}
