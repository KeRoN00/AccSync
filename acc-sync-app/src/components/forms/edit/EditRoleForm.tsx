import React, { useState, ChangeEvent, FormEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { ResponseRoleDTO } from '../../../types/Role';
import { useNavigate } from 'react-router-dom';
import { RoleDTO, RolesApi } from '../../../api';

export interface EditRoleFormProps {
  onSubmit: (formData: FormData) => void;
  data: RoleDTO 
}

interface FormData {
  id: number;
  name: string;
  appId: number;
}
const initialFormData = {
  id: 99999999,
  name: '',
  appId: 99999999
}

const EditRoleForm: React.FC<EditRoleFormProps> = ({ onSubmit, data }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const token: string | null = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/');
    }
  if (!data) return;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token: string | null = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/');
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
        navigate('/');
        return;
      }
      await api.apiRolesPut(token, { roleDTO: formattedRole });

    } catch (error) {
      console.error('Wystąpił błąd:', error);
    } finally {
      setIsLoading(false);
      navigate(0);
    }
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-3xl bg-zinc-700 h-screen flex items-center justify-center gap-5 p-3 flex-col' >
        <h1>Edytuj użytkownika</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Nowa nazwa aplikacji"
            name="name"
            placeholder={data.name || "name"}
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isLoading ? <CircularProgress/> : "Zapisz zmiany"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditRoleForm;