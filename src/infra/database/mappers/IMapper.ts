export interface IMapper<Domain, Entity> {
  get(entity: Entity): Domain;
}
