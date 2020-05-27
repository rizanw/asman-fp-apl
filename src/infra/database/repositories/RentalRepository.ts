import { injectable } from "inversify";
import { IRentalRepository } from "src/domain/repositories/IRentalRepository";
import Rental from "src/domain/models/Rental";
import RentalEntitiy from "../entities/rental";
import { RentalMapper } from "../mappers/RentalMapper";
import { AddRentalAssetRequest } from "src/application/rental/AddRentalAssetRequest";
import { Op } from "sequelize";
import AssetEntity from "../entities/asset";
import GroupEntity from "../entities/group";

@injectable()
export class RentalRepository implements IRentalRepository {
  private readonly _dataMapper: RentalMapper;

  constructor(dataMapper: RentalMapper) {
    this._dataMapper = dataMapper;
  }

  async getAllExcept(id: number): Promise<Rental[]> {
    const dataEntities = await RentalEntitiy.findAll<RentalEntitiy>({
      where: {
        [Op.and]: [
          {
            owner_id: { [Op.not]: id },
          },
          {
            availability: 1,
          },
        ],
      },
      include: [
        {
          association: RentalEntitiy.associations.owner,
        },
        {
          association: RentalEntitiy.associations.asset,
          include: [
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
            {
              association: AssetEntity.associations.group,
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

    if (!dataEntities) {
      return null;
    }

    return dataEntities.map((data) => this._dataMapper.get(data));
  }

  async getAllByOwner(id: number): Promise<Rental[]> {
    const dataEntities = await RentalEntitiy.findAll<RentalEntitiy>({
      where: {
        owner_id: id,
      },
      include: [
        {
          association: RentalEntitiy.associations.owner,
        },
        {
          association: RentalEntitiy.associations.asset,
          include: [
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
            {
              association: AssetEntity.associations.group,
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

    if (!dataEntities) {
      return null;
    }

    return dataEntities.map((data) => this._dataMapper.get(data));
  }

  async findById(id: number): Promise<Rental> {
    const dataEntity = await RentalEntitiy.findByPk<RentalEntitiy>(id, {
      include: [
        {
          association: RentalEntitiy.associations.owner,
        },
        {
          association: RentalEntitiy.associations.asset,
          include: [
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
            {
              association: AssetEntity.associations.group,
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

    if (!dataEntity) {
      return null;
    }

    return this._dataMapper.get(dataEntity);
  }

  async add(request: AddRentalAssetRequest): Promise<Rental> {
    const dataEntity = await RentalEntitiy.create<RentalEntitiy>({
      asset_id: request.asset_id,
      owner_id: request.owner_id,
      status: request.status,
    });

    return this._dataMapper.get(dataEntity);
  }

  async update(rental: Rental): Promise<boolean> {
    const dataEntity = await RentalEntitiy.update(
      {
        asset_id: rental.asset?.id,
        owner_id: rental.owner?.id,
        price: rental.price,
        availability: rental.availability,
      },
      {
        where: {
          id: rental.id,
        },
      }
    );

    if (!dataEntity) {
      return false;
    }
    return true;
  }

  async delete(rental: Rental): Promise<boolean> {
    const dataEntity = await RentalEntitiy.destroy({
      where: {
        id: rental.id,
      },
    });

    if (!dataEntity) {
      return false;
    }

    return true;
  }
}
