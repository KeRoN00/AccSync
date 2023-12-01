import React, { useState, ChangeEvent, FormEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { ResponseRoleDTO } from "../../../types/Role";
import { useNavigate } from "react-router-dom";
import { RoleDTO, RolesApi } from "../../../api";

export interface EditRoleFormProps {
  onSubmit: () => void;
  data: RoleDTO;
}

interface FormData {
  id: number;
  name: string;
  appId: number;
}
const initialFormData = {
  id: 99999999,
  name: "",
  appId: 99999999,
};

const EditRoleForm: React.FC<EditRoleFormProps> = ({ onSubmit, data }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string|null>(null);
  const navigate = useNavigate();

  const token: string | null = localStorage.getItem("accessToken");
  if (!token) {
    navigate("/");
  }
  if (!data) return;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
  };
  const handleBack = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token: string | null = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/");
      return;
    }
    setFormData(formData);
    setIsLoading(true);
    try {
      const api = new RolesApi();
      if (!data) return;
      const formattedRole: ResponseRoleDTO = {
        id: data.id,
        name: formData.name,
        appId: data.appId,
      };
      if (!token) {
        navigate("/");
        return;
      }
      await api.apiRolesPut(token, { roleDTO: formattedRole });
      if (onSubmit) {
        onSubmit();
      }
      navigate(0);
    } catch (error) {
      setError("Błąd podczas edycji, sprawdź, czy zaznaczyłeś rolę na liście")
      console.error("Wystąpił błąd:", error);
    } finally {
      setIsLoading(false);
    }
    
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl bg-zinc-700 h-screen flex items-center justify-center gap-5 p-3 flex-col"
    >
      <h1>Edytuj użytkownika</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Nowa nazwa roli"
            name="name"
            placeholder={data.name || "name"}
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isLoading ? <CircularProgress /> : "Zapisz zmiany"}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={(e) => handleBack(e)}
            variant="contained"
            color="error"
            fullWidth
          >
            Anuluj
          </Button>
        </Grid>
      </Grid>
      {error && error}
    </form>
  );
};

export default EditRoleForm;
