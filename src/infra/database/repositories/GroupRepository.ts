import { injectable } from "inversify";
import { IConsumptionTypeRepository } from "../../../domain/repositories/IConsumptionTypeRepository";
import { ConsumptionTypeMapper } from '../mappers/ConsumptionTypesMapper';
import ConsumptionType from '../../../domain/models/ConsumptionType';
import GroupEntity from '../entities/group';
import { IGroupRepository } from '../../../domain/repositories/IGroupRepository';
import { GroupMapper } from '../mappers/GroupMapper';
import Group from "../entities/group";
import { RegisterCompanyRequest } from '../../../application/company/RegisterCompanyRequest';
import Group from '../../../domain/models/Group';

@injectable()
export class GroupRepository implements IGroupRepository {
  private readonly _dataMapper: GroupMapper;

  constructor(dataMapper: GroupMapper) {
    this._dataMapper = dataMapper;
  }

  async registerInduk({
    name,
    tel,
    address,
    latitude,
    longitude,
  }: RegisterCompanyRequest): Promise<Group> {
    const groupEntity = await GroupEntity.create<GroupEntity>({
      name: name,
      company_id: "123123",
      tel: tel,
      address: address,
      latitude: latitude,
      longitude: longitude,
      level: 1
    });

    return this._dataMapper.get(groupEntity);
  }

}
