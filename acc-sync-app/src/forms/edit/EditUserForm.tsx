import React, { useState, ChangeEvent, FormEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { UserDTO } from '../../types/User';

export interface EditUserFormProps {
  onSubmit: (formData: FormData) => void;
  data: UserDTO 
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ onSubmit, data }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
  });

  

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //api call
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-3xl bg-zinc-700 h-screen flex items-center justify-center gap-5 p-3 flex-col' >
        <h1>Edytuj użytkownika</h1>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label={data.firstName}
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            sx={{ input: { color: 'white' } }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={data.lastName}
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={data.email}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Zapisz zmiany
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditUserForm;