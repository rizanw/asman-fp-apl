import TypeController from "../controllers/type.controller";

export default [
  {
    path: "/types",
    method: "get",
    handler: [TypeController.index]
  }
];
