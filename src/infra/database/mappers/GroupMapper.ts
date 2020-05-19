import GroupEntity from "../entities/group";
import { injectable } from "inversify";
import Group from '../../../domain/models/Group';

@injectable()
export class GroupMapper implements IMapper<Group, GroupEntity> {
  get(entity: Group): Group {
    return new Group(
      entity.id,
      entity.parent_id,
      entity.company_id,
      entity.name,
      entity.tel,
      entity.address,
      entity.latitude,
      entity.longitude,
      entity.level
    );
  }
}
