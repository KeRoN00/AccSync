import React, { useState, ChangeEvent, FormEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { UserDTO, UsersApi } from '../../api';
import { SignupDTO } from '../../api';

export interface AddUserFormProps {
  onSubmit: (formData: UserDTO) => void;
}
const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
}
type formDataType = {
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  password: string,
  confirmPassword: string,
}
const AddUserForm: React.FC<AddUserFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<formDataType>(initialFormData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState<{ confirmPassword: string; password: string, api: string }>({
    confirmPassword: '',
    password: '',
    api: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token: string | null = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/');
      return;
    }

    const errors: { confirmPassword: string; password: string; api: string } = {
      confirmPassword: '',
      password: '',
      api: '',
    };

    // Prosta polityka hasła: minimum 8 znaków, jedna duża litera, jedna mała litera, jedna cyfra, jeden znak specjalny
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      errors.password = 'Hasło musi zawierać co najmniej 8 znaków, jedną dużą literę i jedną cyfrę.';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Hasła nie są zgodne.';
    }

    // Jeśli są błędy, zaktualizuj stan i przerwij
    if (errors.password || errors.confirmPassword) {
      setFormData({ ...formData, confirmPassword: '' }); // Wyczyszczenie pola confirmPassword
      setErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const api = new UsersApi();
      const formattedUser: SignupDTO = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      await api.apiUsersAddUserPost(token, { signupDTO: formattedUser });

      if (onSubmit) {
        onSubmit(formattedUser);
      }
    } catch (error) {
      console.error('Wystąpił błąd:', error);
      errors.api = 'Login i/lub hasło są niepoprawne lub użytkownik nie istnieje';
    } finally {
      setIsLoading(false);
      setErrors(errors);
    }
  };
    
    
 

  return (
    <form onSubmit={handleSubmit} className='max-w-3xl bg-zinc-700 h-screen flex items-center justify-center gap-5 p-3 flex-col' >
        <h1>Dodaj użytkownika</h1>
      <Grid container spacing={2}>
        <Grid item xs={6} >
          <TextField
            label="Imię"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            required
            sx={{ input: { color: 'white' } }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Nazwisko"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Nazwa użytkownika"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Hasło"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            error={Boolean(errors.password)}
            helperText={errors.password}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Powtórz hasło"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            required
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
          />
        </Grid>
        {errors && errors.password && errors.confirmPassword}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isLoading ? <CircularProgress/> :"Dodaj użytkownika"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};


export default AddUserForm;