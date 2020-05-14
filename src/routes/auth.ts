import AuthController from "../controllers/auth.controller";

export default [
  {
    path: "/login",
    method: "post",
    handler: AuthController.login
  }
];
