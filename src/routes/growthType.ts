import GrowthTypeController from "../controllers/growthType.controller";

export default [
  {
    path: "/growth-types",
    method: "get",
    handler: GrowthTypeController.index
  }
];
