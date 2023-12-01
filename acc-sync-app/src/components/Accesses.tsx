import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import CircularProgress from "@mui/material/CircularProgress";
import { AccessDTO, AccessesApi } from "../api";
import AccessTable from "./tables/AccessTable";
import AddAccessButton from "../Atoms/buttons/accesses/AddAccessButton";
import AddAccessForm from "./forms/add/AddAccessForm";
import DeleteAccessButton from "../Atoms/buttons/accesses/DeleteAccessButton";
import DeleteAccessForm from "./forms/delete/DeleteAccessForm";

const Accesses = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<Array<AccessDTO>>([]);
  const token: string | null = localStorage.getItem("accessToken");
  const [selectedAccess, setSelectedAccess] = useState<AccessDTO>({
    id: 99999999,
    userId: 99999999,
    userName: "",
    roleId: 99999999,
    roleName: "",
    appId: 99999999,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        navigate("/");
        return;
      }
      setIsLoading(true);
      try {
        const api = new AccessesApi();
        const response = await api.apiAccessesGet(token);
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
  const handleSelectAccess = (access: AccessDTO) => {
    setSelectedAccess(access);
    console.log("Accesses", access);
  };
  return (
    <Layout user="admin">
      <h1 className="p-4">Uprawnienia</h1>
        {error && error}
      <div className="p-4 flex gap-3">
        <AddAccessButton formComponent={AddAccessForm}>Dodaj</AddAccessButton>
        <DeleteAccessButton
          formComponent={DeleteAccessForm}
          data={selectedAccess.id}
        >
          Usuń
        </DeleteAccessButton>
      </div>
      <div className="flex items-center justify-center">
        {isLoading ? (
          <CircularProgress />
        ) : responseData ? (
          <AccessTable
            onAccessSelect={handleSelectAccess}
            data={responseData}
          />
        ) : (
          <div>Brak Danych</div>
        )}
      </div>
    </Layout>
  );
};

export default Accesses;
