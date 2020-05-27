// Layout Types
import { DefaultLayout, NoLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import StrukturIndex from "./views/strukturAset/index";
import ServisIndex from "./views/servis/index";
import RentalIndex from "./views/rental/index";

import role from "./data/roleConst";
import AssetForm from "./views/kelolaAset/asset/asset.form.container";
import AssetDetail from "./views/kelolaAset/asset/asset.detail.container";
import Login from "./views/Login.container";
import RootMenu from "./views/RootMenu";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: RootMenu,
    protected: true
  },
  {
    path: "/signin",
    exact: true,
    layout: NoLayout,
    component: Login
  },
  {
    path: "/equipment/asset",
    exact: true,
    layout: DefaultLayout,
    component: AssetForm,
    protected: true,
    allowedRole: [role.COMPANY]
  },
  {
    path: "/rental",
    exact: true,
    layout: DefaultLayout,
    protected: true,
    allowedRole: [role.COMPANY],
    component: RentalIndex
  },
  {
    path: "/struktur",
    exact: true,
    layout: DefaultLayout,
    protected: true,
    allowedRole: [role.COMPANY],
    component: StrukturIndex
  },
  {
    path: "/servis",
    exact: true,
    layout: DefaultLayout,
    component: ServisIndex,
    protected: true,
    allowedRole: [role.COMPANY]
  },
  {
    path: "/:asset/:assetId",
    exact: true,
    layout: DefaultLayout,
    component: AssetDetail,
    protected: true,
    allowedRole: [role.COMPANY]
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  }
];
