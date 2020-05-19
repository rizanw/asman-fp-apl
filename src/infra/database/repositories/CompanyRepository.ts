import bcrypt from "bcrypt";
import { ICompanyRepository } from "src/domain/repositories/ICompanyRepository";
import { injectable } from "inversify";
import { CompanyMapper } from "../mappers/CompanyMapper";
import Company from "src/domain/models/Company";
import CompanyEntity from "src/infra/database/entities/company";
import { RegisterCompanyRequest } from "src/application/company/RegisterCompanyRequest";
import { Role } from "src/domain/models/Role";

@injectable()
export class CompanyRepository implements ICompanyRepository {
  private readonly _companyMapper: CompanyMapper;

  constructor(companyMapper: CompanyMapper) {
    this._companyMapper = companyMapper;
  }

  async findAll(): Promise<Company[]> {
    const companyEntities = await CompanyEntity.findAll<CompanyEntity>();

    return companyEntities.map((e) => this._companyMapper.get(e));
  }

  async findById(id: number): Promise<Company> {
    const companyEntity = await CompanyEntity.findByPk(id);

    if (!companyEntity) {
      throw new Error("Company not found");
    }

    return this._companyMapper.get(companyEntity);
  }

  async registerCompany({
    name,
    email,
    tel,
    address,
    latitude,
    longitude,
    username,
    password,
  }: RegisterCompanyRequest): Promise<Company> {
    let hashedPassword = bcrypt.hashSync(password, 10);

    const companyEntity = await CompanyEntity.create<CompanyEntity>({
      name: name,
      email: email,
      tel: tel,
      address: address,
      latitude: latitude,
      longitude: longitude,
    });

    await companyEntity.createUser({
      name: name,
      username: username,
      password: hashedPassword,
      role: Role.company,
    });

    return this._companyMapper.get(companyEntity);
  }
}
