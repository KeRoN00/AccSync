import React, { useState, ChangeEvent, FormEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { AppDTO, AppsApi } from '../../../api';
import { ResponseAppDTO } from '../../../types/App';

export interface EditAppFormProps {
  onSubmit: (formData: FormData) => void;
  data: AppDTO 
}

interface FormData {
  id: number;
  name: string;
}
const initialFormData = {
  id: 99999999,
  name: '',
}

const EditAppForm: React.FC<EditAppFormProps> = ({ onSubmit, data }) => {
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
      const api = new AppsApi();
      if (!data) return;
      const formattedApp: ResponseAppDTO = {
        id: data.id,
        name: formData.name,
          };
      if (!token) {
        navigate('/');
        return;
      }
      await api.apiAppsPut(token, { appDTO: formattedApp });

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
        <h1>Edytuj aplikację</h1>
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

export default EditAppForm;