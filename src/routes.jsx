
// Material Dashboard 2 React layouts layouts/dashboard
import Dashboard from "../src/layouts/dashboard";
import Users from "@/pages/users";
import Persons from "@/pages/person";
import Equipement from "@/pages/equip_externos";
import DashboardLayout from "./examples/LayoutContainers/DashboardLayout";


const routes = [
  {
    path: "/",
    element: <DashboardLayout />, 
    children: [
      { path: "Dashboard", element: <Dashboard /> },
      { path: "users", element: <Users /> }, 
      { path: "persons", element: <Persons /> }, 
      { path: "equipement", element: <Equipement /> }, 
    ],
  },

  //si quiere iconos
  //   {
  //   type: "collapse",
  //   name: "Dashboard",
  //   key: "dashboard",
  //   icon: <DashboardIcon fontSize="small" />,
  //   route: "/dashboard",
  //   component: <Dashboard />,
  // },
  // {
  //   type: "collapse",
  //   name: "Usuarios",
  //   key: "users",
  //   icon: <PeopleIcon fontSize="small" />,
  //   route: "/users",
  //   component: <Users />,
  // }
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Usuarios",
    key: "users",
    route: "users",
    component: <Users />,
  },
  {
    type: "collapse",
    name: "Personas",
    key: "persons",
    route: "persons",
    component: <Persons />,
  },
  {
    type: "collapse",
    name: "Equipos",
    key: "equipement",
    route: "equipement",
    component: <Equipement />,
  }
];

export default routes;
