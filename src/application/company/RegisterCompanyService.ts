import { inject, injectable } from "inversify";
import TYPES from "src/types.dependency";
import { ICompanyRepository } from "src/domain/repositories/ICompanyRepository";
import { RegisterCompanyRequest } from "./RegisterCompanyRequest";

@injectable()
export class RegisterCompanyService {
  constructor(
    @inject(TYPES.CompanyRepository)
    private readonly _companyRepository: ICompanyRepository
  ) {}

  async execute(request: RegisterCompanyRequest) {
    return await this._companyRepository.registerCompany(request);
  }
}
