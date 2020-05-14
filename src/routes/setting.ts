import SettingController from "../controllers/setting.controller";
import auth from "../middlewares/auth";

export default [
    {
        path: "/settings/password",
        method: "post",
        handler: [auth, SettingController.updatePassword]
    }
]