import Asset from "../models/Asset";
import RegisterAssetRequest from "../../application/asset/RegisterAssetRequest";
import { RegisterAssetService } from "../../application/asset/RegisterAssetService";
import SetServicePlanAssetRequest from "../../application/asset/SetServicePlanAssetRequest";
import RegisterAssetCSVRequest from "../../application/asset/RegisterAssetCSVRequest";

export interface IAssetRepository {
  registerAsset(request: RegisterAssetRequest): Promise<Asset>;
  registerAssetCSV(request: RegisterAssetCSVRequest): Promise<Asset>;
  findById(company_id: number, id: number): Promise<Asset>;
  getAll(id: number): Promise<Asset[]>;
  deleteAsset(id: number): Promise<Asset>;
  editAsset(id: number, request: RegisterAssetRequest): Promise<Asset>;
  setServicePlan(request: SetServicePlanAssetRequest): Promise<Asset>; 
  update(asset: Asset): Promise<boolean>;
}

