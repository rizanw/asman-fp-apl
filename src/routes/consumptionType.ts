import ConsumptionTypeController from "../controllers/consumptionType.controller";

export default [
  {
    path: "/consumption-types",
    method: "get",
    handler: ConsumptionTypeController.index
  }
];
