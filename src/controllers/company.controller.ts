import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import Company from "../models/company";
import { sendSuccessResponse } from "../helpers/response";
import { Role } from "../models/user";

class CompanyController {
  public async index(req: Request, res: Response, next: NextFunction) {
    try {
      let companies = await Company.findAll<Company>({
        include: [Company.associations.groups],
      });

      sendSuccessResponse(res, "", companies);
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    let {
      name,
      email,
      tel,
      address,
      latitude,
      longitude,
      username,
      password,
    } = req.body;

    try {
      let company = await Company.create<Company>({
        name: name,
        email: email,
        tel: tel,
        address: address,
        latitude: latitude,
        longitude: longitude,
      });

      let hashed = bcrypt.hashSync(password, 10);
      await company.createUser({
        name: name,
        username: username,
        password: hashed,
        role: Role.company,
      });

      sendSuccessResponse(res, "", company);
    } catch (error) {
      next(error);
    }
  }
}

export default new CompanyController();
