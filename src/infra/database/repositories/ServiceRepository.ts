import { injectable } from "inversify";
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

@injectable()
export class ServiceRepository implements IServiceRepository {
  private readonly _serviceMapper: ServiceMapper;

  constructor(serviceMapper: ServiceMapper) {
    this._serviceMapper = serviceMapper;
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
}
