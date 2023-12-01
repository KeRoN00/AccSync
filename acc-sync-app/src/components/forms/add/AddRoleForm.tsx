import React, { useState, ChangeEvent, FormEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { RoleDTO, RolesApi } from "../../../api";

export interface AddRoleFormProps {
  onSubmit: (formData: RoleDTO) => void;
}
const initialFormData = {
  name: "",
  appId: 99999999,
};
type formDataType = {
  name: string;
  appId: number;
};
const AddRoleForm: React.ElementType<AddRoleFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<formDataType>(initialFormData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string|null>(null);
  const navigate = useNavigate();
  const token: string | null = localStorage.getItem("accessToken");
  if (!token) {
    navigate("/");
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleBack = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
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
      const formattedRole: RoleDTO = {
        name: formData.name,
        appId: formData.appId,
      };
      if (!token) {
        navigate("/");
        return;
      }
      await api.apiRolesPost(token, { roleDTO: formattedRole });
      if (onSubmit) {
        onSubmit(formData);
      }
      navigate(0);
    } catch (error) {
      setError("Aplikacja nie istnieje");
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
      <h1>Dodaj rolę</h1>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Nazwa nowej roli"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            sx={{ input: { color: "white" } }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Id Aplikacji"
            name="appId"
            placeholder=""
            onChange={handleChange}
            fullWidth
            required
            sx={{ input: { color: "white" } }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isLoading ? <CircularProgress /> : "Dodaj Rolę"}
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

export default AddRoleForm;
