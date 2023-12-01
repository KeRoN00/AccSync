import React, { useState, ChangeEvent, FormEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { AccessDTO, AccessesApi, CreateAccessDTO } from "../../../api";

export interface AddAccessFormProps {
  onSubmit: (formData: AccessDTO) => void;
}
const initialFormData = {
  id: 99999999,
  userId: 99999999,
  userName: "",
  roleId: 99999999,
  roleName: "",
  appId: 99999999,
};
type formDataType = {
  id: number;
  userId: number;
  userName: string;
  roleId: number;
  roleName: string;
  appId: number;
};
const AddAccessForm: React.ElementType<AddAccessFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<formDataType>(initialFormData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const token: string | null = localStorage.getItem("accessToken");
  if (!token) {
    navigate("/");
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      const api = new AccessesApi();
      const formattedAccess: CreateAccessDTO = {
        userId: formData.userId,
        roleId: formData.roleId,
        appId: formData.appId,
      };
      if (!token) {
        navigate("/");
        return;
      }
      console.log("Przed request", formattedAccess);
      await api.apiAccessesPost(token, { createAccessDTO: formattedAccess });

      if (onSubmit) {
        onSubmit(formattedAccess);
      }
    } catch (error) {
      console.error("Wystąpił błąd:", error);
    } finally {
      setIsLoading(false);
      //navigate(0);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl bg-zinc-700 h-screen flex items-center justify-center gap-5 p-3 flex-col"
    >
      <h1>Dodaj Uprawnienie</h1>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Id użytkownika"
            name="userId"
            placeholder=""
            onChange={handleChange}
            fullWidth
            required
            sx={{ input: { color: "white" } }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Id roli"
            name="roleId"
            placeholder=""
            onChange={handleChange}
            fullWidth
            required
            sx={{ input: { color: "white" } }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Id aplikacji"
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
            {isLoading ? <CircularProgress /> : "Dodaj Uprawnienie"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddAccessForm;
