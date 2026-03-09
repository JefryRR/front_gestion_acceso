import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";

import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";
import MDButton from "@/components/MDButton";

import DataTable from "@/examples/Tables/DataTable";
import UserEditModal from "@/components/users/user_edit";
import UserCreateModal from "@/components/users/user_create";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";


function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [openCreate, setOpenCreate] = useState(false);

  
 const fetchUsers = async () => {
  const res = await apiFetch(`users/all_users-pag?page=${page + 1}&page_size=${pageSize}`);
    setUsers(res.users);
    setTotal(res.total_users);
  };

  // 2. Usarla en el useEffect
  useEffect(() => {
    fetchUsers();
  }, [page, pageSize]);

  async function handleToggleEstado(user) {
    const nuevoEstado = !user.estado;
    try {
      await apiFetch(`users/cambiar-estado/${user.id_usuario}?nuevo_estado=${nuevoEstado}`, {
        method: "PUT"
      });

      setUsers(users =>
        users.map(u =>
          u.id_usuario === user.id_usuario
            ? { ...u, estado: nuevoEstado }
            : u
        )
      );
    } catch (error) {
      alert("No se pudo actualizar el estado");
    }
  }

  //Función para actualizar usuario
  async function handleUpdateUser(data) {
  try {
    const response = await apiFetch(
      `users/by_id_user/${selectedUser.id_usuario}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
    setUsers(users =>
      users.map(u =>
        u.id_usuario === selectedUser.id_usuario
          ? { ...u, ...data }
          : u
      )
    );

    if (response) {
      alert("Usuario actualizado con exito")
      setSelectedUser(null);
      await fetchUsers();
    }

  } catch (error) {
    console.error(error)
    alert("Error al actualizar usuario");
  }
  }

  async function handleCreateUser(data) {
    try {
      const response = await apiFetch(`users/crear`, {
            method: "POST",
            body: JSON.stringify(data),
          });

        setOpenCreate(false);
        fetchUsers();

        alert("Usuario creado con éxito");

        setOpenCreate(false);

    } catch (error) {
          if (error.status === 400) {
              alert("Este correo ya está registrado con otro usuario");
          } else {
              alert("Error al crear el usuario");
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

  const columns = [
    { header: "Nombre", accessorKey: "nombre" },
    { header: "Documento", accessorKey: "documento" },
    { header: "Email", accessorKey: "email" },
    { header: "Telefono", accessorKey: "telefono" },
    { header: "Estado", accessorKey: "estado",
      cell: (info) => {
    const value = info.getValue();
    const user = info.row.original.user;

    return (
      <MDButton
        variant="text"
        size="small"
        onClick={() => handleToggleEstado(user)}
        sx={getEditButtonStyle(value)}
      >
        {value ? "Activo" : "Inactivo"}
      </MDButton>
      );}
    },
    { header: "Sede", accessorKey: "nombre_sede" },
    {
      id: "acciones",
      header: "Acciones",
      cell: ({ row }) => (
        <MDButton
          variant="text"
          size="small"
          sx={getEditButtonStyle}
          onClick={() => setSelectedUser(row.original.user)}
        >
          Editar
        </MDButton>
      ),
    }
  ];

  const rows = users.map((user) => ({
    nombre: user.nombre_usuario,
    documento: user.documento,
    email: user.email,
    telefono: user.telefono,
    estado: user.estado,
    nombre_sede: user.nombre,
    user
  }));

  return (
    <MDBox>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
          <Card>
            <MDBox p={3}>
              <MDTypography variant="h3">Usuarios</MDTypography>
              
              <DataTable
                table={{ columns, rows }}
                canSearch
                headerActions={
                  <MDButton variant="gradient" color="success" onClick={() => setOpenCreate(true)} 
                  >
                    Registrar usuario
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
              <UserCreateModal
                onSave={(data) => {
                  handleCreateUser(data);
                }}
                oncancel={() => setOpenCreate(false)}
              />
            </MDBox>
          </Dialog>
          <Dialog open={Boolean(selectedUser)} onClose={() => setSelectedUser(null)}>
            
            <MDBox p={3}>
              <UserEditModal
                onSave={handleUpdateUser}
                oncancel={()=>{setSelectedUser(null)}}
                user={selectedUser} />
            </MDBox>
          </Dialog>
        </MDBox>
      </MDBox>
  );
}

export default Users;