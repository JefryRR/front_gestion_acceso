import { useEffect, useState } from "react";
import MDBox from "@/components/MDBox";
import MDButton from "@/components/MDButton";
import MDInput from "@/components/MDInput";
import MDTypography from "@/components/MDTypography";

export default function CentroEditModal({ oncancel, centro, onSave }) {
  const [form, setForm] = useState({codigo_centro: "",
                            nombre: "", estado: true
                          });

    useEffect(() => {
    if (centro) {
      setForm({
        codigo_centro: centro.codigo_centro,
        nombre: centro.nombre,
      });
    }
  }, [centro]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <MDTypography variant="h6" mb={3}>Editar Centro</MDTypography>

      <MDBox mb={2}>
        <MDInput
          label="Código centro"
          name="codigo_centro"
          value={form.codigo_centro || ""}
          onChange={handleChange}
        />
      </MDBox>

      <MDBox mb={2}>
        <MDInput
          label="Nombre centro"
          name="nombre"
          value={form.nombre || ""}
          onChange={handleChange}
        />
      </MDBox>

      <MDBox display="flex" justifyContent="flex-end" gap={1}>
        <MDButton onClick={oncancel} color="secondary" variant="text">
          Cancelar
        </MDButton>
        <MDButton color="info" type="submit" variant="gradient">
          Actualizar
        </MDButton>
      </MDBox>
    </form>
  );
}