/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useState } from "react";

// react-router-dom components
// import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
// import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";


// Material Dashboard 2 React components
import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import MDInput from "@/components/MDInput";
import MDButton from "@/components/MDButton";

// Authentication layout components
import BasicLayout from "../components/BasicLayout";

// Images
import bgImage from "@/assets/images/bg-sign-in-basic.jpeg";

function Basic({email,
              password,
              onEmailChange,
              onPasswordChange,
              onSubmit}) {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout image={bgImage}>
      <Card pb={5} sx={{
        background: "linear-gradient(195deg, #eba35195, #d072b19f)",
        color: "green",
        marginBottom: 2
      }}>
        <MDBox mt={3} mb={1} textAlign="center">
          <MDTypography variant="h4" color="light" fontWeight="bold">
            Sistema de control <br />
            de acceso 
          </MDTypography>
        </MDBox>
      </Card>
      <Card>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={onSubmit}>
            <MDBox mb={2}>
              <MDInput type="email" label="Correo" fullWidth value={email} onChange={(e)=>onEmailChange(e.target.value)}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Contraseña" fullWidth value={password} onChange={(e)=>onPasswordChange(e.target.value)}/>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Recordar
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" type="submit" color="info" fullWidth>
                Ingresar
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
