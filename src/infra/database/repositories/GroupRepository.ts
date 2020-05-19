import { injectable } from "inversify";
import GroupEntity from "../entities/group";
import { IGroupRepository } from "../../../domain/repositories/IGroupRepository";
import { GroupMapper } from "../mappers/GroupMapper";
import Group from "../../../domain/models/Group";
import { RegisterGroupRequest } from "../../../application/group/RegisterGroupRequest";

@injectable()
export class GroupRepository implements IGroupRepository {
  private readonly _dataMapper: GroupMapper;

  constructor(dataMapper: GroupMapper) {
    this._dataMapper = dataMapper;
  }

  async findAllIndukByUser(): Promise<Group[]> {
    const groupEntities = await GroupEntity.findAll<GroupEntity>();

    return groupEntities.map((data) => this._dataMapper.get(data));
  }

  async registerInduk({
    company_id,
    name,
    tel,
    address,
    latitude,
    longitude,
  }: RegisterGroupRequest): Promise<Group> {
    const groupEntity = await GroupEntity.create<GroupEntity>({
      name: name,
      company_id: company_id,
      tel: tel,
      address: address,
      latitude: latitude,
      longitude: longitude,
      level: 1,
    });

    return this._dataMapper.get(groupEntity);
  }
}
