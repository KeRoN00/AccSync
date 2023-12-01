import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddRoleButton from "../Atoms/buttons/roles/AddRoleButton";
import EditRoleButton from "../Atoms/buttons/roles/EditRoleButton";
import DeleteRoleButton from "../Atoms/buttons/roles/DeleteRoleButton";
import Layout from "./Layout";
import CircularProgress from "@mui/material/CircularProgress";
import { RoleDTO, RolesApi } from "../api";
import AddRoleForm from "./forms/add/AddRoleForm";
import EditRoleForm from "./forms/edit/EditRoleForm";
import RolesTable from "./tables/RoleTable";
import DeleteRoleForm from "./forms/delete/DeleteRoleForm";
const Roles = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<Array<RoleDTO>>([]);
  const token: string | null = localStorage.getItem("accessToken");
  const [selectedRole, setSelectedRole] = useState<RoleDTO>({
    id: 99999999,
    name: "",
    appId: 99999999,
  });

  const handleSelectRole = (role: RoleDTO) => {
    setSelectedRole(role);
    console.log("Roles", role);
  };
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        navigate("/");
        return;
      }
      setIsLoading(true);
      try {
        const api = new RolesApi();
        const response = await api.apiRolesGet(token);
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
      <h1 className="p-4">Role</h1>
      {error && error}
      <div className="p-4 flex gap-3">
        <AddRoleButton formComponent={AddRoleForm}>Dodaj</AddRoleButton>
        <EditRoleButton formComponent={EditRoleForm} data={selectedRole}>
          Edytuj
        </EditRoleButton>
        <DeleteRoleButton formComponent={DeleteRoleForm} data={selectedRole.id}>
          Usuń
        </DeleteRoleButton>
      </div>
      <div className="flex items-center justify-center">
      {isLoading ? (
        <CircularProgress />
      ) : responseData ? (
        <RolesTable onRoleSelect={handleSelectRole} data={responseData} />
      ) : (
        <div>Brak Danych</div>
      )}
      </div>
    </Layout>
  );
};

export default Roles;
