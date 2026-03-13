import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";

import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";

import DataTable from "@/examples/Tables/DataTable";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";
import MDInput from "@/components/MDInput";
import MenuItem from "@mui/material/MenuItem";


function movements() {
  const [movements, setMovements] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [openCreate, setOpenCreate] = useState(false);

  const estadosMovement = [
    { value: "Entrada", label: "ENTRADA" },
    { value: "Salida", label: "SALIDA" },
    { value: "Traslado", label: "TRASLADO" }
  ];

  const fetchMovements = async () => {
    const res = await apiFetch(`movements/paginated?page=${page + 1}&page_size=${pageSize}`)
    setMovements(res.movements);
    setTotal(res.total_movements);
  }


  useEffect(() => {
    fetchMovements();
  }, [page, pageSize]);

  async function handleToggleEstado(movement, nuevoEstado) {
    try {
      await apiFetch(`movements/by-id/${movement.id_movimiento_sede}?movement=${nuevoEstado}`, {
        method: "PUT"
      });

      setMovements(prev =>
        prev.map(m =>
          m.id_movimiento_sede === movement.id_movimiento_sede
            ? { ...m, tipo_movimiento: nuevoEstado }
            : m
        )
      );
      //fetchMovements();
    } catch (error) {
      alert("No se pudo actualizar el estado");
    }
  }

  const estadoStyles = {
    Entrada: "success.main",
    Traslado: "warning.main",
    Salida: "error.main"
  };

  const getEstadoStyle = (estado) => ({
    minWidth: "120px",

    "& .MuiInputBase-root": {
      borderRadius: "18px",
      color: estadoStyles[estado],
      fontWeight: 600,
    },

    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },

    "& .MuiSelect-select": {
      color: estadoStyles[estado],
    },

    "&:hover .MuiSelect-select": {
      backgroundColor: estadoStyles[estado],
      color: "#fff",
    }
  });


  const columns = [
    { header: "Autorización N.", accessorKey: "auth_id" },
    { header: "Tipo equipo", accessorKey: "t_equipo" },
    { header: "N. serie", accessorKey: "serie_eq" },
    {
      header: "Movimiento", accessorKey: "tipo_movimiento",
      cell: (info) => {
        const value = info.getValue();
        const movement = info.row.original.movements;

        return (
          <MDInput
            select
            value={value || ""}
            size="small"
            onChange={(e) => handleToggleEstado(movement, e.target.value)}
            sx={getEstadoStyle(movement.tipo_movimiento)}
          >
            {estadosMovement.map((tipo_movimiento) => (
              <MenuItem key={tipo_movimiento.value} value={tipo_movimiento.value}>
                {tipo_movimiento.label}
              </MenuItem>
            ))}
          </MDInput>
        );
      }
    },
    { header: "Registrado por", accessorKey: "user_registra" },
    { header: "Fecha movimiento", accessorKey: "fecha_movimiento" },
  ];

  const formatearFecha = (fechaString) => {
    const fecha = new Date(fechaString);

    return fecha.toLocaleString("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const rows = movements.map((movements) => ({
    auth_id: movements.autorizacion_id,
    serie_eq: movements.serial_equipo,
    t_equipo: movements.categoria,
    tipo_movimiento: movements.tipo_movimiento,
    user_registra: movements.nombre_usuario,
    fecha_movimiento: formatearFecha(movements.fecha_movimiento),
    movements
  }));

  return (
    <MDBox>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox p={3}>
            <MDTypography variant="h3">Movimientos</MDTypography>
            <DataTable
              table={{ columns, rows }}
              canSearch
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
        </Dialog>
      </MDBox>
    </MDBox>
  );
}

export default movements;