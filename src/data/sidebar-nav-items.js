import role from "./roleConst";

export const data = [
  {
    title: "Kelola Akun",
    to: "/",
    icon: "edit",
    allowedRole: [role.SUPER_ADMIN]
  },
  {
    title: "Kelola Aset",
    to: "/",
    icon: "edit",
    allowedRole: [role.COMPANY]
  },
  {
    title: "Struktur Aset",
    to: "/struktur",
    icon: "list",
    allowedRole: [role.COMPANY]
  },
  {
    title: "Servis",
    to: "/servis",
    icon: "clipboard-list",
    allowedRole: [role.COMPANY]
  },
  {
    title: "Rental",
    to: "/rental",
    icon: "",
    allowedRole: [role.COMPANY]
  }
  // {
  //   title: "Blog Dashboard",
  //   to: "/blog-overview",
  //   htmlBefore: '<i class="material-icons">edit</i>',
  //   htmlAfter: ""
  // },
  // {
  //   title: "Blog Posts",
  //   htmlBefore: '<i class="material-icons">vertical_split</i>',
  //   to: "/blog-posts"
  // },
  // {
  //   title: "Add New Post",
  //   htmlBefore: '<i class="material-icons">note_add</i>',
  //   to: "/add-new-post"
  // },
  // {
  //   title: "Forms & Components",
  //   htmlBefore: '<i class="material-icons">view_module</i>',
  //   to: "/components-overview"
  // },
  // {
  //   title: "Tables",
  //   htmlBefore: '<i class="material-icons">table_chart</i>',
  //   to: "/tables"
  // },
  // {
  //   title: "User Profile",
  //   htmlBefore: '<i class="material-icons">person</i>',
  //   to: "/user-profile-lite"
  // },
  // {
  //   title: "Errors",
  //   htmlBefore: '<i class="material-icons">error</i>',
  //   to: "/errors"
  // }
];

export default data;