import Company from "src/domain/models/Company";
import { RegisterCompanyRequest } from "src/application/company/RegisterCompanyRequest";

export interface ICompanyRepository {
  registerCompany(request: RegisterCompanyRequest): Promise<Company>;
  findById(company_id: number, id: number): Promise<Company>;
  findAll(): Promise<Company[]>;
}
