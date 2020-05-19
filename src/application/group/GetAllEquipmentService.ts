import { inject, injectable } from "inversify";
import TYPES from "src/types.dependency";
import { IGroupRepository } from "../../domain/repositories/IGroupRepository";

@injectable()
export class GetAllEquipmentService {
  constructor(
    @inject(TYPES.GroupRepository)
    private readonly _groupReporistory: IGroupRepository
  ) {}

  async execute(id) {
    return await this._groupReporistory.findAllEquipmentByUser(id);
  }
}
