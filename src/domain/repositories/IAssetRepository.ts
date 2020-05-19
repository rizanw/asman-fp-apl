import Asset from "../models/Asset";
import RegisterAssetRequest from "../../application/asset/RegisterAssetRequest";

export interface IAssetRepository {
  registerAsset(request: RegisterAssetRequest): Promise<Asset>;
  findById(id: number): Promise<Asset>;
  getAll(id: number): Promise<Asset[]>;
  getByAvailability(): Promise<Asset[]>;
}
