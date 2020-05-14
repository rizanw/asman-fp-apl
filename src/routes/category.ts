import CategoryController from "../controllers/category.controller";
import role from "../middlewares/role";
import { Role } from "../models/user";

export default [
  {
    path: "/categories",
    method: "get",
    handler: [role(Role.company), CategoryController.index]
  },
  {
    path: "/categories",
    method: "post",
    handler: [role(Role.company), CategoryController.create]
  },
  {
    path: "/categories/:id",
    method: "get",
    handler: [role(Role.company), CategoryController.show]
  },
  {
    path: "/categories/:id",
    method: "put",
    handler: [role(Role.company), CategoryController.update]
  },
  {
    path: "/categories/:id",
    method: "delete",
    handler: [role(Role.company), CategoryController.delete]
  }
];
