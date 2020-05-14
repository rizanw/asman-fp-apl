import CompanyController from "../controllers/company.controller";
import role from "../middlewares/role";
import { Role } from "../models/user";

export default [
  {
    path: "/companies",
    method: "get",
    handler: [role(Role.super_admin), CompanyController.index]
  },
  {
    path: "/companies",
    method: "post",
    handler: [role(Role.super_admin), CompanyController.create]
  }
];
