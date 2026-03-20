import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";

import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import MDButton from "@/components/MDButton";

import DataTable from "@/examples/Tables/DataTable";
import PermisoEditModal from "@/components/permisos/permiso_edit";
import PermisoCreateModal from "@/components/permisos/permiso_create";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";


function permisos() {
  const [permisos, setPermisos] = useState([]);
  const [selectedPermisos, setSelectedPermisos] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);

  const fetchPermisos = async () => {
    const res = await apiFetch(`permisos/all-permisos`);
    setPermisos(Array.isArray(res) ? res : res.permisos || []);
  };

  // 2. Usarla en el useEffect
  useEffect(() => {
    fetchPermisos();
  }, []);


  //Función para actualizar permiso
  async function handleUpdatePermiso(data) {
    try {
      const response = await apiFetch(
        `permisos/${selectedPermisos.id_modulo}/${selectedPermisos.id_rol}`,
        {
          method: "PUT",
          body: data,
        }
      );

      if (response) {
        alert("Permiso actualizado con éxito");
        setSelectedPermisos(null);
        await fetchPermisos();
      }

    } catch (error) {
      console.error(error);
      alert("Error al actualizar permiso");
    }
  }

  async function handleCreatePermiso(data) {
    try {
      await apiFetch(`permisos/crear`, {
        method: "POST",
        body: data,
      });

      setOpenCreate(false);
      fetchPermisos();

      alert("Permiso creado con éxito");

    } catch (error) {
      if (error.detail === "Este permiso ya existe") {
        alert("Este permiso ya existe");
      } else {
        alert("Error al crear el permiso");
      }
    }
  }

  const getEditButtonStyle = (activo) => ({
    color: activo ? "success.main" : "error.main",
    minWidth: "80px",
    fontWeight: 600,
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: activo ? "success.main" : "error.main",
      color: "#fff",
    }
  });

  const permisoLabel = (value) => (value ? "Autorizado" : "No autorizado");
  const permisoColor = (value) => (value ? "success" : "error");
  const renderPermisoEstado = (value) => (
    <MDTypography
      variant="caption"
      color={permisoColor(value)}
      sx={{ fontSize: "14px", fontWeight: 300, lineHeight: 1.2 }}
    >
      {permisoLabel(value)}
    </MDTypography>
  );

  const columns = [
    { header: "Nombre", accessorKey: "nombre" },
    { header: "Nombre rol", accessorKey: "nombre_rol" },
    {
      header: "Registrar", accessorKey: "registrar", cell: (info) => renderPermisoEstado(info.getValue())
    },
    {
      header: "Actualizar", accessorKey: "actualizar", cell: (info) => renderPermisoEstado(info.getValue())
    },
    {
      header: "Seleccionar", accessorKey: "seleccionar", cell: (info) => renderPermisoEstado(info.getValue())
    },
    {
      header: "Eliminar", accessorKey: "borrar", cell: (info) => renderPermisoEstado(info.getValue())
    },
    {
      id: "acciones",
      header: "Acciones",
      cell: ({ row }) => (
        <MDButton
          variant="text"
          size="small"
          sx={getEditButtonStyle}
          onClick={() => setSelectedPermisos(row.original.permiso)}
        >
          Editar
        </MDButton>
      ),
    }
  ];

  const rows = permisos.map((permiso) => ({
    nombre: permiso.nombre_modulo,
    nombre_rol: permiso.nombre_rol,
    registrar: permiso.insertar,
    actualizar: permiso.actualizar,
    seleccionar: permiso.seleccionar,
    borrar: permiso.borrar,
    permiso
  }));

  return (
    <MDBox>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox p={3}>
            <MDTypography variant="h3">Permisos</MDTypography>

            <DataTable
              table={{ columns, rows }}
              canSearch
              headerActions={
                <MDButton variant="gradient" color="success" onClick={() => setOpenCreate(true)}
                >
                  Registrar permiso
                </MDButton>
              }
            />

          </MDBox>
        </Card>
        <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
          <MDBox p={3}>
            <PermisoCreateModal
              onSave={(data) => {
                handleCreatePermiso(data);
              }}
              onCancel={() => setOpenCreate(false)}
            />
          </MDBox>
        </Dialog>

        <Dialog open={Boolean(selectedPermisos)} onClose={() => setSelectedPermisos(null)}>
          <MDBox p={3}>
            <PermisoEditModal
              onSave={handleUpdatePermiso}
              onCancel={() => { setSelectedPermisos(null) }}
              permiso={selectedPermisos} />
          </MDBox>
        </Dialog>
      </MDBox>
    </MDBox>
  );
}

export default permisos;