import { Routes, Route, Navigate } from "react-router-dom";

import MaterialLayout from "./layouts/MaterialLayout";
import AuthLayout from "@/layouts/authLayout";

// import Login from "@/layouts/authentication/sign-in";
import Users from "@/pages/users";
import Login from "@/pages/login";
import Dashboard from "@/layouts/dashboard";
import Persons from "@/pages/person";
import Equipements from "@/pages/equip_externos";

function App() {
  return (
   <Routes>

      {/* Redirección inicial */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* AUTH (sin sidebar) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* DASHBOARD (con plantilla) */}
      <Route path="/dashboard" element={<MaterialLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="persons" element={<Persons />} />
        <Route path="equipement" element={<Equipements />} />
      </Route>

      {/* Fallback 
      <Route path="*" element={<Navigate to="/login" replace />} />*/}

    </Routes>
  );
}

export default App;