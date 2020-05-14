import ClassController from "../controllers/class.controller";

export default [
  {
    path: "/classes",
    method: "get",
    handler: ClassController.index
  }
];
