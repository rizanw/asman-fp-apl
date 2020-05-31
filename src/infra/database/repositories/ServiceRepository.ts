import { injectable, id } from "inversify";
import { IServiceRepository } from "src/domain/repositories/IServiceRepository";
import { ServiceMapper } from "../mappers/ServiceMapper";
import User from "src/domain/models/User";
import Service from "src/domain/models/Service";
import ServiceEntity from "src/infra/database/entities/service";
import AssetEntity from "src/infra/database/entities/asset";
import GroupEntity from "src/infra/database/entities/group";
import { Op } from "sequelize";
import moment from "moment";
import { ServiceStatus } from "src/domain/models/ServiceStatus";
import Asset from "src/domain/models/Asset";
import { AssetMapper } from "../mappers/AssetMapper";
import SetServicePlanRequest from "src/application/service/SetServicePlanRequest";

@injectable()
export class ServiceRepository implements IServiceRepository {
  private readonly _serviceMapper: ServiceMapper;
  private readonly _assetMapper: AssetMapper;

  constructor(serviceMapper: ServiceMapper, assetMapper: AssetMapper) {
    this._serviceMapper = serviceMapper;
    this._assetMapper = assetMapper;
  }

  async findServicesByIds(ids: number[]): Promise<Service[]> {
    const services = await ServiceEntity.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });

    return services.map((e) => this._serviceMapper.get(e));
  }

  async getUnplannedAssets(companyId: number): Promise<Asset[]> {
    const assets = await AssetEntity.findAll({
      where: {
        service_plan: null,
      },
      include: [
        {
          association: AssetEntity.associations.group,
          where: {
            company_id: companyId,
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
      ],
    });

    return assets.map((e) => this._assetMapper.get(e));
  }

  async getReadyServicesByUser(user: User): Promise<Service[]> {
    const company_id = user.company?.id;

    if (!company_id) {
      throw new Error("Unauthorized: user is not member of a company");
    }

    const now = moment().toDate();
    const services = await ServiceEntity.findAll({
      where: {
        start_date: {
          [Op.lte]: now,
        },
        end_date: {
          [Op.gte]: now,
        },
        status: ServiceStatus.READY,
      },
      include: [
        {
          association: ServiceEntity.associations.asset,
          required: true,
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
          ],
        },
      ],
    });

    return services.map((e) => this._serviceMapper.get(e));
  }

  async getProcessedServicesByUser(user: User): Promise<Service[]> {
    const company_id = user.company?.id;

    if (!company_id) {
      throw new Error("Unauthorized: user is not member of a company");
    }

    const services = await ServiceEntity.findAll({
      where: {
        status: ServiceStatus.PROCESSED,
      },
      include: [
        {
          association: ServiceEntity.associations.asset,
          required: true,
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
          ],
        },
      ],
    });

    return services.map((e) => this._serviceMapper.get(e));
  }

  async getFinishedServicesByUser(user: User): Promise<Service[]> {
    const company_id = user.company?.id;

    if (!company_id) {
      throw new Error("Unauthorized: user is not member of a company");
    }

    const services = await ServiceEntity.findAll({
      where: {
        status: ServiceStatus.FINISHED,
      },
      include: [
        {
          association: ServiceEntity.associations.asset,
          required: true,
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
          ],
        },
      ],
    });

    return services.map((e) => this._serviceMapper.get(e));
  }

  async getBacklogServicesByUser(user: User): Promise<Service[]> {
    const company_id = user.company?.id;

    if (!company_id) {
      throw new Error("Unauthorized: user is not member of a company");
    }

    const now = moment().toDate();
    const services = await ServiceEntity.findAll({
      where: {
        end_date: {
          [Op.lt]: now,
        },
        status: ServiceStatus.READY,
      },
      include: [
        {
          association: ServiceEntity.associations.asset,
          required: true,
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
          ],
        },
      ],
    });

    return services.map((e) => this._serviceMapper.get(e));
  }

  async setServicePlan({
    asset_id,
    start_date,
    long,
    periodic,
  }: SetServicePlanRequest): Promise<Asset | null> {
    const asset = await AssetEntity.findByPk(asset_id, {
      include: [
        {
          association: AssetEntity.associations.services,
        },
      ],
    });

    if (!asset) {
      return null;
    }

    let service_plan = null;
    if (start_date && long && periodic) {
      service_plan = {
        start_date: start_date,
        long: long,
        periodic: periodic,
      };
    }

    const updatedAsset = await asset.update({
      service_plan: service_plan,
    });

    return this._assetMapper.get(updatedAsset);
  }

  async addServices(services: Service[]): Promise<number | null> {
    try {
      for (const service of services) {
        const { asset, start_date, end_date } = service;
        await ServiceEntity.create({
          asset_id: asset?.id,
          start_date: start_date,
          end_date: end_date,
        });
      }

      return services.length;
    } catch {
      return null;
    }
  }

  async updateServices(services: Service[]): Promise<number | null> {
    try {
      for (const service of services) {
        const { start_date, end_date, service_date, status } = service;
        await ServiceEntity.update(
          {
            start_date: start_date,
            end_date: end_date,
            service_date: service_date,
            status: status,
          },
          {
            where: {
              id: service.id,
            },
          }
        );
      }

      return services.length;
    } catch {
      return null;
    }
  }

  async deleteServices(services: Service[]): Promise<number | null> {
    try {
      const serviceIds = services.map((service) => service.id as number);

      await ServiceEntity.destroy({
        where: {
          id: {
            [Op.in]: serviceIds,
          },
        },
      });

      return services.length;
    } catch {
      return null;
    }
  }
}
