import { injectable } from "inversify";
import GroupEntity from "../entities/group";
import { IGroupRepository } from "../../../domain/repositories/IGroupRepository";
import { GroupMapper } from "../mappers/GroupMapper";
import Group from "../../../domain/models/Group";
import { RegisterGroupRequest } from "../../../application/group/RegisterGroupRequest";
import { Op, Association } from "sequelize";
import GroupEntity from "src/infra/database/entities/group";

@injectable()
export class GroupRepository implements IGroupRepository {
  private readonly _dataMapper: GroupMapper;

  constructor(dataMapper: GroupMapper) {
    this._dataMapper = dataMapper;
  }

  async findAllIndukByUser(id: number): Promise<Group[]> {
    const groupEntities = await GroupEntity.findAll<GroupEntity>({
      where: {
        company_id: {
          [Op.eq]: id,
        },
        level: {
          [Op.eq]: 1,
        },
      },
    });

    return groupEntities.map((data) => this._dataMapper.get(data));
  }

  async findAllSubIndukByUser(id: number): Promise<Group[]> {
    const groupEntities = await GroupEntity.findAll<GroupEntity>({
      where: {
        company_id: {
          [Op.eq]: id,
        },
        level: {
          [Op.eq]: 2,
        },
      },
      include: [
        {
          association: GroupEntity.associations.parent,
        },
      ],
    });

    return groupEntities.map((data) => this._dataMapper.get(data));
  }

  async findAllEquipmentByUser(id: number): Promise<Group[]> {
    const groupEntities = await GroupEntity.findAll<GroupEntity>({
      where: {
        company_id: {
          [Op.eq]: id,
        },
        level: {
          [Op.eq]: 3,
        },
      },
      include: [
        {
          association: GroupEntity.associations.parent,
        },
      ],
    });

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

  async registerSubInduk({
    company_id,
    parent_id,
    name,
    tel,
    address,
    latitude,
    longitude,
  }: RegisterGroupRequest): Promise<Group> {
    const groupEntity = await GroupEntity.create<GroupEntity>({
      name: name,
      company_id: company_id,
      parent_id: parent_id,
      tel: tel,
      address: address,
      latitude: latitude,
      longitude: longitude,
      level: 2,
    });

    return this._dataMapper.get(groupEntity);
  }

  async registerEquipment({
    company_id,
    parent_id,
    name,
    tel,
    address,
    latitude,
    longitude,
  }: RegisterGroupRequest): Promise<Group> {
    const groupEntity = await GroupEntity.create<GroupEntity>({
      name: name,
      company_id: company_id,
      parent_id: parent_id,
      tel: tel,
      address: address,
      latitude: latitude,
      longitude: longitude,
      level: 3,
    });

    return this._dataMapper.get(groupEntity);
  }
}
