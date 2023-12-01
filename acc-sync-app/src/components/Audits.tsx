import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import CircularProgress from "@mui/material/CircularProgress";
import { AuditApi, AuditDTO } from "../api";
import AuditTable from "./tables/AuditTable";

const Audits: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedAudit, setSelectedAudit] = useState<object>({});
  const [responseData, setResponseData] = useState<Array<AuditDTO>>([]);
  const token: string | null = localStorage.getItem("accessToken");
  const handleSelectAudit = (audit: AuditDTO) => {
    setSelectedAudit(audit);
    console.log("Roles", audit);
  };
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        navigate("/");
        return;
      }
      setIsLoading(true);
      try {
        const api = new AuditApi();
        const response = await api.apiAuditGet(token);
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
  return (
    <Layout user="admin">
      <h1 className="mb-5">Logi audytowe</h1>
        {error && error}
      <div className="flex items-center justify-center">
        {/**
         * TODO: ShowAuditModal
         */}
        {isLoading ? (
          <CircularProgress />
        ) : responseData ? (
          <AuditTable onAuditSelect={handleSelectAudit} data={responseData} />
        ) : (
          <div>Brak Danych</div>
        )}
      </div>
    </Layout>
  );
};

export default Audits;
