import React, { FormEvent, useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { AppsApi } from '../../../api';

export interface DeleteAppFormProps {
  onSubmit: () => void;
  id: number | undefined;
}

const DeleteAppForm: React.FC<DeleteAppFormProps> = ({ onSubmit, id }) => {
 const navigate = useNavigate();
 const [isLoading, setIsLoading] = useState<boolean>(false);
 const [error, setError] = useState<string|null>(null);
 const token: string | null = localStorage.getItem('accessToken');
 if (!token) {
   navigate('/');
   return;
 }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    try {
      const api = new AppsApi();
      if(!id || id == 99999999) return;
      await api.apiAppsIdDelete(token, { id: id });
      if (onSubmit) {
        onSubmit();
      }
      navigate(0);
    } catch (error) {
      console.error('Wystąpił błąd:', error);
      setError("Błąd podczas usuwania, sprawdź, czy zaznaczyłeś aplikację na liście");
    } finally {
      setIsLoading(false);
    }
   
  };
  const handleBack = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-3xl bg-zinc-700 h-screen flex items-center justify-center gap-5 p-3 flex-col' >
        <h1>Czy napewno chcesz usunąć aplikację?</h1>
      
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isLoading ? <CircularProgress/> : "Usuń"}
          </Button>
          <Button onClick={(e)=>handleBack(e)} variant="contained" color="error" fullWidth>
            Anuluj
          </Button>
          {error && error}
    </form>
  );
};

export default DeleteAppForm;