import UserTable from "./tables/UserTable";
import Layout from "./Layout";
import AddUserButton from "../Atoms/buttons/users/AddUserButton";
import DeleteUserButton from "../Atoms/buttons/users/DeleteUserButton";
import AddUserForm from "./forms/add/AddUserForm";
import { useState, useEffect } from "react";
import { UserDTO } from "../api/models/UserDTO";
import { UsersApi } from "../api";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteUserForm from "./forms/delete/DeleteUserForm";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<Array<UserDTO>>([]);
  const token: string | null = localStorage.getItem("accessToken");
  const [selectedUser, setSelectedUser] = useState<UserDTO>({
    id: 99999999,
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleSelectUser = (user: UserDTO) => {
    setSelectedUser(user);
    console.log("Users", user);
  };
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        navigate("/");
        return;
      }

      setIsLoading(true);
      try {
        const api = new UsersApi();
        const response = await api.apiUsersGet(token);
        setResponseData(response);
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
      <h1 className="p-4">Użytkownicy</h1>
      {error && error}
      <div className="p-4 flex gap-3">
        <AddUserButton formComponent={AddUserForm}>Dodaj</AddUserButton>
        <DeleteUserButton formComponent={DeleteUserForm} data={selectedUser.id}>
          Usuń
        </DeleteUserButton>
      </div>
      <div className="flex items-center justify-center">

      {isLoading ? (
        <CircularProgress />
        ) : responseData ? (
          <UserTable onUserSelect={handleSelectUser} data={responseData} />
          ) : (
            <div>Brak Danych</div>
            )}
            </div>
    </Layout>
  );
};

export default Users;
