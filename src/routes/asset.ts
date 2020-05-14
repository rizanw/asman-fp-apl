import AssetController from "../controllers/asset.controller";
import role from "../middlewares/role";
import { Role } from "../models/user";
import multer from "multer";

const upload = multer({ dest: "uploads" });

export default [
  {
    path: "/assets",
    method: "get",
    handler: [role(Role.company), AssetController.index]
  },
  {
    path: "/assets",
    method: "post",
    handler: [role(Role.company), AssetController.create]
  },
  {
    path: "/assets/csv",
    method: "get",
    handler: [role(Role.company), AssetController.getCsvTemplate]
  },
  {
    path: "/assets/csv",
    method: "post",
    handler: [role(Role.company), upload.single('csv'), AssetController.addAssetByCsv]
  },
  {
    path: "/assets/:id",
    method: "get",
    handler: [role(Role.company), AssetController.show]
  },
  {
    path: "/assets/:id",
    method: "put",
    handler: [role(Role.company), AssetController.update]
  },
  {
    path: "/assets/:id",
    method: "delete",
    handler: [role(Role.company), AssetController.delete]
  },
  {
    path: "/assets/:id/service-plan",
    method: "post",
    handler: [role(Role.company), AssetController.setServicePlan]
  }
];
