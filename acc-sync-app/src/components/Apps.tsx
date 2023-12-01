import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import CircularProgress from "@mui/material/CircularProgress";
import { AppDTO, AppsApi } from '../api';

import AppTable from './tables/AppTable';
import AddAppButton from '../Atoms/buttons/apps/AddAppButton';
import AddAppForm from './forms/add/AddAppForm';
import DeleteAppForm from './forms/delete/DeleteAppForm';
import DeleteAppButton from '../Atoms/buttons/apps/DeleteAppButton';
import EditAppButton from '../Atoms/buttons/apps/EditAppButton';
import EditAppForm from './forms/edit/EditAppForm';

const Apps = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<Array<AppDTO>>([]);
  const token: string | null = localStorage.getItem('accessToken');
  const [selectedApp, setSelectedApp] = useState<AppDTO>({
    id: 99999999,
    name: "",
  });

  const handleSelectApp = (app: AppDTO) => {
    setSelectedApp(app);
    console.log("Roles", app);
  };
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        navigate('/');
        return;
      }
      setIsLoading(true);
      try {
        const api = new AppsApi();
        const response = await api.apiAppsGet(token);
        setResponseData(response);
        console.log("zwrocone: ", response);
      } catch (error) {
        setError("Sesja wygasła, zaloguj się ponownie");
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    };
    fetchData();
  }, [token, navigate]);

  return <Layout user="admin">
  <h1 className="p-4">Aplikacje</h1>
  {error && error}
  {isLoading ? <CircularProgress /> : responseData ? <AppTable onAppSelect={handleSelectApp} data={responseData} /> : <div>Brak Danych</div>}
  <AddAppButton formComponent={AddAppForm}>Dodaj</AddAppButton>
  <EditAppButton
    formComponent={EditAppForm}
    data={selectedApp}
  >
    Edytuj
  </EditAppButton>
<DeleteAppButton formComponent={DeleteAppForm} data={selectedApp.id}>Usuń</DeleteAppButton>

  <div className="p-4">
  </div>
</Layout>
};

export default Apps;
