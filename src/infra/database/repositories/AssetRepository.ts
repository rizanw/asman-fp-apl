import { injectable } from "inversify";

import AssetEntity from "../entities/asset";
import ConsumptionTypeEntity from "../entities/consumptionType";
import ClassEntity from "../entities/class";
import TypeEntity from "../entities/type";
import GrowthTypeEntity from "../entities/growthType";
import GroupEntity from "../entities/group";
import { Op, Association } from "sequelize";
import { IAssetRepository } from "../../../domain/repositories/IAssetRepository";
import { AssetMapper } from "../mappers/AssetMapper";
import Asset from "../../../domain/models/Asset";
import RegisterAssetRequest from "../../../application/asset/RegisterAssetRequest";
import SetServicePlanAssetRequest from "../../../application/asset/SetServicePlanAssetRequest";
import { UpdateAvailabilityRequest } from "src/application/asset/UpdateAvailabilityRequest";
import RegisterAssetCSVRequest from "../../../application/asset/RegisterAssetCSVRequest";
import AssetCsv from "../../../domain/models/AssetCsv";
import * as csv_m from "fast-csv";

@injectable()
export class AssetRepository implements IAssetRepository {
  private readonly _dataMapper: AssetMapper;

  constructor(dataMapper: AssetMapper) {
    this._dataMapper = dataMapper;
  }

  async getAll(id: number): Promise<Asset[]> {
    const dataEntity = await AssetEntity.findAll({
      include: [
        {
          association: AssetEntity.associations.group,
          where: {
            company_id: id,
          },
          include: [
            {
              association: GroupEntity.associations.parent,
              include: [
                {
                  association: GroupEntity.associations.parent,
                },
              ],
            },
          ],
        },
        {
          association: AssetEntity.associations.type,
        },
        {
          association: AssetEntity.associations.category,
        },
        {
          association: AssetEntity.associations.class,
        },
        {
          association: AssetEntity.associations.consumption_type,
        },
        {
          association: AssetEntity.associations.growth_type,
        },
      ],
    });

    if (!dataEntity) {
      throw new Error("No Asset.");
    }

    return dataEntity.map((data) => this._dataMapper.get(data));
  }

  async findById(company_id: number, id: number): Promise<Asset> {
    const dataEntity = await AssetEntity.findByPk(id, {
      include: [
        {
          association: AssetEntity.associations.group,
          where: {
            company_id: company_id,
          },
          include: [
            {
              association: GroupEntity.associations.parent,
              include: [
                {
                  association: GroupEntity.associations.parent,
                },
              ],
            },
          ],
        },
        {
          association: AssetEntity.associations.type,
        },
        {
          association: AssetEntity.associations.category,
        },
        {
          association: AssetEntity.associations.class,
        },
        {
          association: AssetEntity.associations.consumption_type,
        },
        {
          association: AssetEntity.associations.growth_type,
        },
      ],
    });

    if (!dataEntity) {
      return;
    }

    return this._dataMapper.get(dataEntity);
  }

  async setServicePlan(params: SetServicePlanAssetRequest): Promise<Asset> {
    const dataEntity = await AssetEntity.findByPk(params.asset_id);

    if (!dataEntity) {
      return;
    }

    await dataEntity.update({
      service_plan: {
        start_date: params.start_date,
        long: params.long,
        periodic: params.periodic,
      },
    });

    return true;
  }

  async editAsset(id: number, params: RegisterAssetRequest): Promise<Asset> {
    const dataEntity = await AssetEntity.findByPk(id);

    if (!dataEntity) {
      return;
    }

    await dataEntity.update(params);

    return true;
  }

  async deleteAsset(id: number): Promise<Asset> {
    const dataEntity = await AssetEntity.findByPk(id);

    if (!dataEntity) {
      return;
    }

    const dataDestroy = await dataEntity.destroy();

    return true;
  }

  async registerAsset(asset: RegisterAssetRequest): Promise<Asset> {
    const dataEntity = await AssetEntity.create<AssetEntity>({
      group_id: asset.group_id,
      name: asset.name,
      type_id: asset.type_id,
      growth_type_id: asset.growth_type_id,
      growth_rate: asset.growth_rate,
      class_id: asset.class_id,
      consumption_type_id: asset.consumption_type_id,
      category_id: asset.category_id,
      manufacturer: asset.manufacturer,
      capacity: asset.capacity,
      capacity_unit: asset.capacity_unit,
      serial_number: asset.serial_number,
      price: asset.price,
      manufacture_date: asset.manufacture_date,
      installation_date: asset.installation_date,
      custom_fields: asset.custom_fields,
      service_plan: {
        start_date: asset.start_date,
        long: asset.long,
        periodic: asset.periodic,
      },
    });

    return this._dataMapper.get(dataEntity);
  }

  async getByAvailability(): Promise<Asset[]> {
    const dataEntity = await AssetEntity.findAll({
      where: {
        availability: 1,
      },
    });

    if (!dataEntity) {
      throw new Error("No Asset.");
    }

    return dataEntity.map((data) => this._dataMapper.get(data));
  }

  async updateAvailability(request: UpdateAvailabilityRequest): Promise<Asset> {
    const dataEntity = await AssetEntity.update<AssetEntity>(
      {
        availability: request.status,
      },
      {
        where: {
          id: request.id,
        },
      }
    );

    return this._dataMapper.get(dataEntity);
  }
}
