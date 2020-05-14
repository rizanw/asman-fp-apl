import companyRoutes from "./company";
import groupRoutes from "./group";
import categoryRoutes from "./category";
import assetRoutes from "./asset";
import typeRoutes from "./type";
import classRoutes from "./class";
import growthTypeRoutes from "./growthType";
import consumptionTypeRoutes from "./consumptionType";
import authRoutes from "./auth";
import serviceRoutes from "./service";
import settingRoutes from "./setting";

export default [
  ...companyRoutes,
  ...groupRoutes,
  ...categoryRoutes,
  ...assetRoutes,
  ...typeRoutes,
  ...classRoutes,
  ...growthTypeRoutes,
  ...consumptionTypeRoutes,
  ...authRoutes,
  ...serviceRoutes,
  ...settingRoutes
];
