
// Material Dashboard 2 React layouts layouts/dashboard
import Dashboard from "../src/layouts/dashboard";
import Users from "@/pages/users";
import Persons from "@/pages/person";
import Equipement from "@/pages/equip_externos";
import Equipement_sede from "@/pages/equip_sede";
import Sedes from "@/pages/sedes";
import Centros from "@/pages/centros";
import Auth_salida from "@/pages/auth_salida";
import Movements from "@/pages/movements";
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
      { path: "equipement_sede", element: <Equipement_sede /> }, 
      { path: "sedes", element: <Sedes /> }, 
      { path: "centros", element: <Centros /> }, 
      { path: "auth_salida", element: <Auth_salida /> }, 
      { path: "movements", element: <Movements /> }, 
    ],
  },
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
  },
  {
    type: "collapse",
    name: "Equipos sede",
    key: "equipement_sede",
    route: "equipement_sede",
    component: <Equipement_sede />,
  },
  {
    type: "collapse",
    name: "Sedes",
    key: "sedes",
    route: "sedes",
    component: <Sedes />,
  },
  {
    type: "collapse",
    name: "Centros",
    key: "centros",
    route: "centros",
    component: <Centros />,
  },
  {
    type: "collapse",
    name: "Autorizaciones salidas",
    key: "auth_salida",
    route: "auth_salida",
    component: <Auth_salida />,
  },
  {
    type: "collapse",
    name: "Movimientos",
    key: "movements",
    route: "movements",
    component: <Movements />,
  }
];

export default routes;
