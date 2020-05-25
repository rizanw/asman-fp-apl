import { injectable } from "inversify";
import { IRentalRepository } from "src/domain/repositories/IRentalRepository";
import Rental from "src/domain/models/Rental";
import RentalEntitiy from "../entities/rental";
import { RentalMapper } from "../mappers/RentalMapper";
import { AddRentalAssetRequest } from "src/application/rental/AddRentalAssetRequest";

@injectable()
export class RentalRepository implements IRentalRepository {
  private readonly _dataMapper: RentalMapper;

  constructor(dataMapper: RentalMapper) {
    this._dataMapper = dataMapper;
  }

  async findById(id: number): Promise<Rental> {
    const dataEntity = await RentalEntitiy.findByPk<RentalEntitiy>(id);

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

  async update(rental: Rental): Promise<Rental> {
    const dataEntity = await RentalEntitiy.update(
      {
        asset_id: rental.asset_id,
        owner_id: rental.owner_id,
        status: rental.status,
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
}
