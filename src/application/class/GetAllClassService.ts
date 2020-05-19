import { injectable, inject } from "inversify";
import TYPES from "src/types.dependency";
import { IClassRepository } from "../../domain/repositories/IClassRepository";

@injectable()
export class GetAllClassService {
  constructor(
    @inject(TYPES.ClassRepository)
    private readonly _classRepository: IClassRepository
  ) {}

  async execute() {
    const data = await this._classRepository.getAll();

    if (!data) {
      return undefined;
    }

    return data;
  }
}
