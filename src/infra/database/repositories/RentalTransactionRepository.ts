import { injectable } from "inversify";
import { RentalTransactionMapper } from "../mappers/RentalTransactionMapper";
import { IRentalTransactionRepository } from "src/domain/repositories/IRentalTransactionRepository";
import RentalTransaction from "src/domain/models/RentalTransaction";
import RentalTransactionEntity from "../entities/rentalTransaction";
import { CreateRentalTransactionRequest } from "src/application/rental/CreateRentalTransactionRequest";
import RentalEntitiy from "../entities/rental";
import AssetEntity from "../entities/asset";
import GroupEntity from "../entities/group";

@injectable()
export class RentalTransactionRepository
  implements IRentalTransactionRepository {
  private readonly _dataMapper: RentalTransactionMapper;

  constructor(dataMapper: RentalTransactionMapper) {
    this._dataMapper = dataMapper;
  }

  async add(
    request: CreateRentalTransactionRequest
  ): Promise<RentalTransaction> {
    const dataEntity = await RentalTransactionEntity.create<
      RentalTransactionEntity
    >({
      rental_id: request.rental_id,
      renter_id: request.renter_id,
      duration: request.duration,
      issue_date: request.issue_date,
      return_date: null,
      status: 0
    });

    return this._dataMapper.get(dataEntity);
  }

  async update(transaction: RentalTransaction): Promise<boolean> {
    const dataEntity = await RentalTransactionEntity.update<
      RentalTransactionEntity
    >(
      {
        rental_id: transaction.rental?.id,
        renter_id: transaction.renter?.id,
        duration: transaction.duration,
        issue_date: transaction.issue_date,
        return_date: transaction.return_date,
        status: transaction.status
      },
      {
        where: {
          id: transaction.id,
        },
      }
    );

    if (!dataEntity) {
      return false;
    }

    return true;
  }

  async getByOwner(id: number): Promise<RentalTransaction[]> {
    return false;
  }

  async getByRenter(id: number): Promise<RentalTransaction[]> {
    const dataEntity = await RentalTransactionEntity.findAll<
      RentalTransactionEntity
    >({
      where: {
        renter_id: id,
      },
      include: [
        {
          association: RentalTransactionEntity.associations.rental,
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
        },
        {
          association: RentalTransactionEntity.associations.renter,
        },
      ],
    });

    if (!dataEntity) {
      return null;
    }

    return dataEntity.map((data) => this._dataMapper.get(data));
  }

  async findById(id: number): Promise<RentalTransaction> {
    const dataEntity = await RentalTransactionEntity.findByPk<RentalTransactionEntity>(id, {
      include: [
        {
          association: RentalTransactionEntity.associations.rental,
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
        },
        {
          association: RentalTransactionEntity.associations.renter,
        },
      ],
    });

    if (!dataEntity) {
      return null;
    }

    return this._dataMapper.get(dataEntity);
  }
}
