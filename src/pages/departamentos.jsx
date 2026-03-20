import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";

import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import MDButton from "@/components/MDButton";

import DataTable from "@/examples/Tables/DataTable";
import DepartmentCreateModal from "@/components/departamentos/department_create";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";


function departamentos() {
  const [departamentos, setDepartamentos] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [openCreate, setOpenCreate] = useState(false);

  const fetchDepartamentos = async () => {
    const res = await apiFetch(`department/all_departments-pag?page=${page + 1}&page_size=${pageSize}`);
    setDepartamentos(Array.isArray(res) ? res : res.departamentos || []);
    setTotal(res.total_departments || 0);
  };

  // 2. Usarla en el useEffect
  useEffect(() => {
    fetchDepartamentos();
  }, [page]);


  async function handleCreateDepartamento(data) {
    try {
      await apiFetch(`department/crear`, {
        method: "POST",
        body: data,
      });

      setOpenCreate(false);
      fetchDepartamentos();

      alert("Departamento creado con éxito");

    } catch (error) {
      if (error.detail === "Este departamento ya existe") {
        alert("Este departamento ya existe");
      } else {
        alert("Error al crear el departamento");
      }
    }
  }

  const columns = [
    { header: "Código departamento", accessorKey: "codigo" },
    { header: "Nombre", accessorKey: "nombre" },
  ];

  const rows = departamentos.map((departamento) => ({
    codigo: departamento.codigo,
    nombre: departamento.nombre,
    departamento
  }));

  return (
    <MDBox>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox p={3}>
            <MDTypography variant="h3">Departamentos</MDTypography>

            <DataTable
              table={{ columns, rows }}
              canSearch
              headerActions={
                <MDButton variant="gradient" color="success" onClick={() => setOpenCreate(true)}
                >
                  Registrar departamento
                </MDButton>
              }

              pagination={{
                manual: true,
                page, pageSize,
                total, onPageChange: setPage,
              }}
              showTotalEntries
            />

          </MDBox>
        </Card>
        <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
          <MDBox p={3}>
            <DepartmentCreateModal
              onSave={(data) => {
                handleCreateDepartamento(data);
              }}
              onCancel={() => setOpenCreate(false)}
            />
          </MDBox>
        </Dialog>
      </MDBox>
    </MDBox>
  );
}

export default departamentos;