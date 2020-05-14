import ServiceController from "../controllers/service.controller";
import role from "../middlewares/role";
import { Role } from "../models/user";
import multer from "multer";

const upload = multer({ dest: "uploads" });

export default [
  {
    path: "/services/unplanned",
    method: "get",
    handler: [role(Role.company), ServiceController.getUnplanned],
  },
  {
    path: "/services/unplanned/csv",
    method: "get",
    handler: [role(Role.company), ServiceController.getUnplannedCsv],
  },
  {
    path: "/services/revision/csv",
    method: "get",
    handler: [role(Role.company), ServiceController.getUpdatePlanCsv],
  },
  {
    path: "/services/unplanned/csv",
    method: "post",
    handler: [
      role(Role.company),
      upload.single("csv"),
      ServiceController.uploadCsv,
    ],
  },
  {
    path: "/services/ready",
    method: "get",
    handler: [role(Role.company), ServiceController.getReady],
  },
  {
    path: "/services/released",
    method: "get",
    handler: [role(Role.company), ServiceController.getReleased],
  },
  {
    path: "/services/process",
    method: "get",
    handler: [role(Role.company), ServiceController.getProcess],
  },
  {
    path: "/services/complete",
    method: "get",
    handler: [role(Role.company), ServiceController.getComplete],
  },
  {
    path: "/services/finish",
    method: "get",
    handler: [role(Role.company), ServiceController.getFinish],
  },
  {
    path: "/services/backlog",
    method: "get",
    handler: [role(Role.company), ServiceController.getBacklog],
  },
  {
    path: "/services/order",
    method: "post",
    handler: [role(Role.company), ServiceController.order],
  },
  {
    path: "/services/tipeac",
    method: "get",
    handler: [role(Role.company), ServiceController.getTipeAc],
  },
  {
    path: "/services/kategoripekerjaan",
    method: "get",
    handler: [role(Role.company), ServiceController.getKategotiPekerjaan],
  },
  {
    path: "/services/process",
    method: "post",
    handler: [ServiceController.process],
  },
  {
    path: "/services/complete",
    method: "post",
    handler: [ServiceController.complete],
  },
  {
    path: "/services/finish",
    method: "post",
    handler: [role(Role.company), ServiceController.finish],
  },
];
