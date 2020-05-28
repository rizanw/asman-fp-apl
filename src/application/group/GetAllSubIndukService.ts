import { inject, injectable } from "inversify";
import TYPES from "src/types.dependency";
import { IGroupRepository } from "../../domain/repositories/IGroupRepository";

@injectable()
export class GetAllSubIndukService {
  constructor(
    @inject(TYPES.GroupRepository)
    private readonly _groupReporistory: IGroupRepository
  ) {}

  async execute(id: number) {
    return await this._groupReporistory.findAllSubIndukByUser(id);
  }
}
