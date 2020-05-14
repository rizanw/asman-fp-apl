import GroupController from "../controllers/group.controller";
import role from "../middlewares/role";
import { Role } from "../models/user";

export default [
  {
    path: "/induk",
    method: "get",
    handler: [role(Role.company), GroupController.getInduk]
  },
  {
    path: "/induk",
    method: "post",
    handler: [role(Role.company), GroupController.createInduk]
  },
  {
    path: "/induk/:id",
    method: "get",
    handler: [role(Role.company), GroupController.showInduk]
  },
  {
    path: "/induk/:id",
    method: "put",
    handler: [role(Role.company), GroupController.updateInduk]
  },
  {
    path: "/induk/:id",
    method: "delete",
    handler: [role(Role.company), GroupController.delete]
  },
  {
    path: "/subinduk",
    method: "get",
    handler: [role(Role.company), GroupController.getSubInduk]
  },
  {
    path: "/subinduk",
    method: "post",
    handler: [role(Role.company), GroupController.createSubInduk]
  },
  {
    path: "/subinduk/:id",
    method: "get",
    handler: [role(Role.company), GroupController.showSubInduk]
  },
  {
    path: "/subinduk/:id",
    method: "put",
    handler: [role(Role.company), GroupController.updateSubInduk]
  },
  {
    path: "/subinduk/:id",
    method: "delete",
    handler: [role(Role.company), GroupController.delete]
  },
  {
    path: "/equipment",
    method: "get",
    handler: [role(Role.company), GroupController.getEquipment]
  },
  {
    path: "/equipment",
    method: "post",
    handler: [role(Role.company), GroupController.createEquipment]
  },
  {
    path: "/equipment/:id",
    method: "get",
    handler: [GroupController.showEquipment]
  },
  {
    path: "/equipment/:id",
    method: "put",
    handler: [role(Role.company), GroupController.updateEquipment]
  },
  {
    path: "/equipment/:id",
    method: "delete",
    handler: [role(Role.company), GroupController.delete]
  }
];
