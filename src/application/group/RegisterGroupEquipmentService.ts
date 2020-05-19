import { inject, injectable } from "inversify";
import TYPES from "src/types.dependency";
import { IGroupRepository } from "../../domain/repositories/IGroupRepository";
import { RegisterGroupRequest } from "./RegisterGroupRequest";

@injectable()
export class RegisterGroupEquipmentService {
  constructor(
    @inject(TYPES.GroupRepository)
    private readonly _groupRepository: IGroupRepository
  ) {}

  async execute(request: RegisterGroupRequest) {
    return await this._groupRepository.registerEquipment(request);
  }
}
