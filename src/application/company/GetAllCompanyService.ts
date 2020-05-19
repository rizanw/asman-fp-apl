import { inject, injectable } from "inversify";
import TYPES from "src/types.dependency";
import { ICompanyRepository } from "src/domain/repositories/ICompanyRepository";

@injectable()
export class GetAllCompanyService {
  constructor(
    @inject(TYPES.CompanyRepository)
    private readonly _companyRepository: ICompanyRepository
  ) {}

  async execute() {
    return await this._companyRepository.findAll();
  }
}
